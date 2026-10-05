(() => {
  const data = window.PORTFOLIO;
  const aboutText = document.querySelector('#about-text');
  if (!data?.education || !Array.isArray(data.experience) || !aboutText || document.querySelector('#about-details')) return;

  const details = document.createElement('div');
  details.id = 'about-details';
  details.className = 'about__details';
  details.innerHTML =     `<section class="about__education"><p class="about__label">Education</p><h3 class="about__school">${data.education.school}</h3><p class="about__period">${data.education.period}</p><p class="about__department">${data.education.department}</p></section><section class="about__experience"><p class="about__label">Experience</p><div class="about__timeline">${data.experience.map((job) => `<article class="about__job"><h3 class="about__job-title"><span>${job.company}</span><span class="about__job-period">${job.period}</span></h3><ul class="about__job-list">${job.highlights.map((item) => `<li>${item}</li>`).join('')}</ul></article>`).join('')}</div></section>`;
  aboutText.insertAdjacentElement('afterend', details);

  const style = document.createElement('style');
  style.textContent =     `.about__core{width:min(1060px,100%);gap:clamp(28px,4vw,54px)}.about__details{width:min(860px,100%);display:grid;grid-template-columns:minmax(210px,.72fr) minmax(0,1.4fr);gap:clamp(28px,6vw,96px);text-align:left}.about__label{margin:0 0 13px;color:var(--muted);text-transform:uppercase;letter-spacing:.15em;font-size:.72rem;font-weight:600}.about__school{margin:0;font-size:clamp(1.2rem,2vw,1.75rem);font-weight:600;line-height:1.1}.about__period,.about__department{margin:8px 0 0;color:var(--mist);font-size:.95rem;line-height:1.5}.about__department{color:var(--muted)}.about__timeline{display:grid;gap:22px}.about__job{padding-top:19px;border-top:1px solid rgba(215,226,234,.3)}.about__job:first-child{padding-top:0;border-top:0}.about__job-title{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 18px;margin:0;font-size:clamp(1rem,1.55vw,1.28rem);font-weight:600;line-height:1.3}.about__job-period{color:var(--muted);font-size:.8rem;font-weight:500;letter-spacing:.08em;white-space:nowrap}.about__job-list{display:grid;gap:5px;margin:11px 0 0;padding:0;list-style:none;color:var(--mist);font-size:.94rem;font-weight:300;line-height:1.52}.about__job-list li{display:grid;grid-template-columns:16px 1fr;gap:4px}.about__job-list li::before{content:'—';color:var(--muted)}@media(max-width:680px){.about__details{grid-template-columns:1fr;gap:36px}}`;
  document.head.append(style);
})();
