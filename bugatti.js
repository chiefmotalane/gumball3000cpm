const horizontal = document.querySelector('.project-inner');
const section = document.querySelector('.pj');
const sticky = document.querySelector('.projects-container');

function horizontalScrol() {

    let sectionTop = section.offsetTop;
    let sectionHeiht = section.offsetHeight;
    

}             <div class="btn-pe-d">
                <button class="btn-pe">EXPLORE</button>
                  <div class="pe-d">
                    <div class="pe-d">ㄷㄷㄷ</div>
                    <div class="pe-dt">
                      <p class="btn-pe-d-t">• Motorsport</p>
                      <p class="btn-pe-d-type"> Formula1</p>
                    </div>
                  </div>
              </div>

                  .project-inner{

    display:flex;

    align-items:flex-start;

    height:100%;

    width:max-content;

    will-change:transform;

}
/*column 1*/
.horizontal-grid-col {
    flex-flow: column;
    flex: none;
    justify-content: flex-start;
    align-items: flex-start;
    width: auto;
    height: 100%;
    display: flex;
}

.horizontal-item-w {
    position: relative;
}
.horizontal-item-layout {
    grid-column-gap: 1.25rem;
    grid-row-gap: 1.25rem;
    flex-flow: column;
    display: flex;
}

.off-t-horiz-title-w {
    grid-column-gap: 1.25rem;
    grid-row-gap: 1.25rem;
    flex-flow: column;
    display: flex;
}

.eyebrow-w {
    grid-column-gap: calc(1.25rem * .5);
    grid-row-gap: calc(1.25rem * .5);
    display: flex;
    flex-direction: column;
    overflow: clip;
}

.horizontal-item-img-w.is-offt1 {
  width: calc(1vh * 50);
  height: calc(1vh * 1000);
  margin-top: calc(1vh * 8.42);
  overflow:hidden;
  
}
.horizontal-item-img-w.is-offt1 p {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #b4b8a5;
}
.horizontal-item-img-w img{

    width:90%;

    border-radius: 10px;
    display:block;

}
/*column 1*/
.horizontal-grid-col {
    flex-flow: column;
    flex: none;
    justify-content: flex-start;
    align-items: flex-start;
    width: auto;
    height: 100%;
    display: flex;
}
.horizontal-item-img-w2.is-offt2 {
  width: calc(1vh * 60);
  height: calc(1vh * 38);
  margin-top: calc(1vh * 8.42);
  overflow:hidden;
}
.horizontal-item-img-w2 img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}

.text-title-lg-mona.split-flex {
    justify-content: flex-start;
    align-items: flex-start;
}

.horizontal-grid-spacer {
    width: 31.51vh;
    pointer-events: auto;
    flex: none;
}

.prev-ev{
  font-family: Gustavo ,sans-serif;
  color: #fbfbfb;
  font-weight: 600;
  font-size: var(--font-compct);
}
.btn-pe {
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: var(--lh-micro);
  font-weight: 400;
  height: 20pt;
  width: 75pt;
  text-transform: uppercase;
  letter-spacing: var(--track-mono-tight);
  color: var(--color-white);
  background: #535450;
  backdrop-filter: blur(50px);
  border: none;
  border-radius: 36pt;    /* full pill */
  padding-top: 5px;
  transition: all var(--transition-quiet);
}
.btn-pe-d{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  gap: 5px;
  color: var(--color-white);
}

.btn-pe-d-t{
  font-size: 9px !important;
  font-family: 'Helvetica Neue' ,sans-serif !important;
  color: var(--color-white) !important;
  font-weight: 50;
}
.btn-pe-d-type{
  font-size: 9px !important;
  font-family: var(--font-display) !important;
  color: var(--color-white) !important;
}

.pe-d{
  display: flex;
  flex-direction: column !important;
  gap: 4px;
  height: 20pt;
}
.pe-dt{
  display: flex;
  margin-bottom: 0%;
  gap: 4px;
}
.pe-dl{
  font-size: 8px;
}