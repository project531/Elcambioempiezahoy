'use strict';
// Pega aquí la URL pública del juego cuando esté disponible.
const GAME_URL = '';
const header = document.querySelector('#header');
const progress = document.querySelector('#progress');
const nav = document.querySelector('#nav');
const menuToggle = document.querySelector('#menuToggle');
function updateScroll(){header.classList.toggle('scrolled',window.scrollY>30);const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%';}
window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menuToggle.textContent=open?'✕':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menú');menuToggle.textContent='☰';}));
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const dialog=document.querySelector('#muralDialog');const openMural=()=>{if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');};document.querySelector('#openMural').addEventListener('click',openMural);document.querySelector('.mural-image').addEventListener('click',openMural);document.querySelector('#closeMural').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.querySelector('#playGame').addEventListener('click',()=>{if(GAME_URL.trim()){window.open(GAME_URL,'_blank','noopener,noreferrer');}else{const hint=document.querySelector('#gameHint');hint.textContent='¡Próximamente! El enlace del juego se publicará aquí.';hint.setAttribute('role','status');}});
const commitment=document.querySelector('#commitment');document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-choice]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});button.classList.add('selected');button.setAttribute('aria-pressed','true');commitment.textContent='Mi compromiso: '+button.dataset.choice+' ¡El cambio empieza conmigo!';}));

// Microinteracciones de profundidad: solo dispositivos con puntero fino.
if(window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches){
  document.querySelectorAll('.issue-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;card.style.setProperty('--pointer-x',`${(x+.5)*100}%`);card.style.setProperty('--pointer-y',`${(y+.5)*100}%`);});
  });
  const art=document.querySelector('.hero-art');
  if(art){art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect();art.style.setProperty('--mx',`${((e.clientX-r.left)/r.width-.5)*14}px`);art.style.setProperty('--my',`${((e.clientY-r.top)/r.height-.5)*14}px`);});art.addEventListener('pointerleave',()=>{art.style.setProperty('--mx','0px');art.style.setProperty('--my','0px');});}
}
