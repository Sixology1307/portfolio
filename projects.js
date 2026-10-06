(() => {
  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length || document.querySelector('#project-card-motion')) return;

  const style = document.createElement('style');
  style.id = 'project-card-motion';
  style.textContent = `
    .project-shell{height:88svh}
    .project-card{--scroll-scale:1;--hover-scale:1;--tilt-x:0deg;--tilt-y:0deg;--tilt-z:0deg;--lift:0px;position:sticky;top:6vh;display:grid;grid-template-columns:minmax(190px,.68fr) minmax(0,1.32fr);gap:clamp(26px,5vw,86px);min-height:min(78svh,860px);padding:clamp(22px,3.2vw,48px);border:1px solid rgba(215,226,234,.72);border-radius:clamp(28px,4.4vw,58px);background:radial-gradient(circle at 10% 0%,rgba(255,255,255,.09),transparent 26%),var(--ink);box-shadow:0 22px 0 rgba(0,0,0,.18);transform:perspective(1500px) translate3d(0,var(--lift),0) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotateZ(var(--tilt-z)) scale(var(--scroll-scale)) scale(var(--hover-scale))!important;transform-origin:center center;transform-style:preserve-3d;transition:transform .54s cubic-bezier(.2,.9,.2,1),border-color .34s ease,box-shadow .34s ease;will-change:transform}
    .project-card.is-hovered,.project-card:focus-within{--hover-scale:1.025;--lift:-12px;border-color:rgba(255,255,255,.98);box-shadow:0 36px 58px rgba(0,0,0,.38),0 0 0 1px rgba(255,255,255,.08)}
    .project-card__top{display:flex;min-width:0;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:20px;padding:clamp(4px,1.1vw,14px) 0}.project-card__num{font-size:clamp(4.1rem,9vw,9.6rem);line-height:.68;letter-spacing:-.1em}.project-card__kind{margin:auto 0 7px;letter-spacing:.15em;font-size:.7rem;font-weight:600}.project-card__title{max-width:320px;font-size:clamp(1.45rem,2.7vw,3.15rem);line-height:.88;letter-spacing:-.035em}.project-card__year{order:3;font-size:.78rem;letter-spacing:.14em}
    .project-card__images{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:repeat(12,minmax(0,1fr));min-height:clamp(380px,56svh,650px);isolation:isolate}.project-card__left{display:contents}.project-card__image{--image-x:0px;--image-y:0px;--image-scale:1;border-radius:clamp(22px,3.4vw,48px);box-shadow:0 18px 34px rgba(0,0,0,.26);transform:translate3d(var(--image-x),var(--image-y),0) scale(var(--image-scale));transition:transform .55s cubic-bezier(.2,.9,.2,1),filter .4s ease,box-shadow .4s ease;will-change:transform}.project-card__left>.project-card__image:first-child{z-index:2;grid-column:1 / span 5;grid-row:2 / span 5}.project-card__left>.project-card__image:nth-child(2){z-index:3;grid-column:2 / span 5;grid-row:8 / span 4}.project-card__images>.project-card__image{z-index:1;grid-column:6 / -1;grid-row:1 / span 11}.project-card.is-hovered .project-card__image,.project-card:focus-within .project-card__image{--image-scale:1.025;filter:saturate(1.08) contrast(1.02);box-shadow:0 26px 46px rgba(0,0,0,.34)}
    @media(max-width:680px){.project-shell{height:92svh}.project-card{top:4vh;grid-template-columns:1fr;gap:20px;min-height:82svh}.project-card__top{display:grid;grid-template-columns:auto 1fr;align-items:end;gap:8px 18px;padding:0}.project-card__num{grid-row:1 / span 2}.project-card__kind{margin:0}.project-card__title{font-size:clamp(1.35rem,6.8vw,2.1rem)}.project-card__year{display:none}.outline-button{grid-column:1 / -1;margin-top:4px;justify-self:start}.project-card__images{min-height:390px}}@media(max-width:440px){.project-card__images{min-height:310px}.project-card__left>.project-card__image:first-child{grid-column:1 / span 5}.project-card__left>.project-card__image:nth-child(2){grid-column:2 / span 5}.project-card__images>.project-card__image{grid-column:6 / -1}}
  `;
  document.head.append(style);

  const canTilt = window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches;
  const resetCard = (card, images) => {
    card.classList.remove('is-hovered');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--tilt-z', '0deg');
    images.forEach((image) => {
      image.style.setProperty('--image-x', '0px');
      image.style.setProperty('--image-y', '0px');
    });
  };

  if (canTilt) {
    cards.forEach((card) => {
      const images = [...card.querySelectorAll('.project-card__image')];
      card.addEventListener('pointerenter', () => card.classList.add('is-hovered'));
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        card.style.setProperty('--tilt-x', `${-y * 3.4}deg`);
        card.style.setProperty('--tilt-y', `${x * 4.6}deg`);
        card.style.setProperty('--tilt-z', `${x * .65}deg`);
        images.forEach((image, index) => {
          const depth = (index + 1) * 3.5;
          image.style.setProperty('--image-x', `${x * depth}px`);
          image.style.setProperty('--image-y', `${y * depth}px`);
        });
      });
      card.addEventListener('pointerleave', () => resetCard(card, images));
    });
  }

  let ticking = false;
  const updateScale = () => {
    cards.forEach((card, index) => {
      const rect = card.parentElement.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      card.style.setProperty('--scroll-scale', `${1 - (cards.length - 1 - index) * .027 * progress}`);
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScale);
      ticking = true;
    }
  }, { passive: true });
  updateScale();
})();
