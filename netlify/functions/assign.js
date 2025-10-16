// netlify/functions/assign.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    const SUPABASE_URL = 'https://ejynjytdplielykzcntv.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeW5qeXRkcGxpZWx5a3pjbnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTU5NjMsImV4cCI6MjA3Mzg5MTk2M30.JcJSTSO4Cv53O7gpSLpOd3WsDuvANiLoVdBx1-dEuMY';
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return { statusCode: 500, body: 'Server not configured' };
    }

    const body = JSON.parse(event.body || '{}');
    const { instagram, car_model, car_color, requested_number, sponsor } = body;
    if (!instagram || !car_model || !sponsor) return { statusCode: 400, body: 'Missing required fields' };

    // Reserved numbers
    const reserved = [1, 63];

    // 1) If requested_number provided, check availability
    const candidateRequested = requested_number ? Number(requested_number) : null;

    // Use RPC-like atomic check: we'll check existing assigned numbers and then create.
    // 2) Fetch current assigned numbers
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/applications?select=assigned_number`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    });
    const assignedRows = await resp.json();
    const assignedNums = assignedRows.map(r => r.assigned_number).filter(Boolean);

    const isAvailable = (n) => !reserved.includes(n) && !assignedNums.includes(n);

    let assigned = null;
    if (candidateRequested) {
      if (!isAvailable(candidateRequested)) {
        return {
          statusCode: 409,
          body: JSON.stringify({ error: 'Number not available' })
        };
      } else {
        assigned = candidateRequested;
      }
    } else {
      // Auto-assign smallest positive not reserved and not taken
      let n = 2;
      while (n < 10000) {
        if (isAvailable(n)) { assigned = n; break; }
        n++;
      }
      if (!assigned) return { statusCode: 500, body: JSON.stringify({ error: 'No numbers available' }) };
    }

    // Create confirmation code
    const confirmation = `CPM-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;

    // Insert application
    const insertResp = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        instagram,
        car_model,
        car_color,
        requested_number: candidateRequested,
        assigned_number: assigned,
        sponsor,
        confirmation_code: confirmation,
        confirmed: true
      })
    });

    if (!insertResp.ok) {
      const txt = await insertResp.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save', detail: txt }) };
    }
    const inserted = await insertResp.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ assigned_number: assigned, confirmation_code: confirmation, inserted: inserted[0] })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
