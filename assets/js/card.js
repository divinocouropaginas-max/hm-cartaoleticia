// Monta o cartão da Letícia a partir de assets/js/perfil.js (padrão dos cartões HM).
(function () {
  const p = window.HM_PROFILE;
  const intents = window.HM_INTENTS || [];
  const fotos = window.HM_PORTFOLIO || [];
  const company = window.HM_COMPANY;
  const first = p.name.split(" ")[0];

  const icons = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z"/><path d="M8.5 9.5c.3 2.4 2.3 4.6 5 5.2l1.2-1.2 2 .9"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    bag: '<path d="M5 8h14l-1.2 12H6.2L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7M8 11h7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    chat: '<path d="M4 5h16v11H8l-4 4V5z"/>',
    box: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/>',
    star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6-4.5-4.1 6-.7L12 3z"/>'
  };
  const icon = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[n] || icons.arrow}</svg>`;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const wa = msg => `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(msg)}`;
  const ig = h => `https://instagram.com/${h}`;

  function link(href, ic, title, sub, primary) {
    if (!href) return `<button type="button" class="link rv esq" data-breve="${esc(title)}">
      <span class="ic">${icon(ic)}</span><span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span><span class="badge">Em breve</span></button>`;
    return `<a class="link rv esq${primary ? " primary" : ""}" href="${esc(href)}" target="_blank" rel="noopener">
      <span class="ic">${icon(ic)}</span><span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span>${icon("arrow", "i arrow")}</a>`;
  }

  const quick = [
    `<a href="tel:${p.phone.replace(/[^\d+]/g, "")}">${icon("phone")}Ligar</a>`,
    `<a href="${wa(p.whatsappMsg)}" target="_blank" rel="noopener">${icon("whatsapp")}WhatsApp</a>`,
    `<a href="${ig(p.instagram)}" target="_blank" rel="noopener">${icon("instagram")}Instagram</a>`,
    `<button type="button" data-share>${icon("share")}Compartilhar</button>`
  ].join("");

  const html = `
    <header class="top rv">
      <span class="brand"><span class="logo"><img src="${esc(p.logo)}" alt=""></span><span>${esc(p.name)}<small>${esc(p.company)}</small></span></span>
      <button class="icon-btn" type="button" data-share aria-label="Compartilhar cartão">${icon("share")}</button>
    </header>

    <div style="display:grid;gap:14px">
      <article class="card rv zoom" id="card">
        <button class="foto rv" type="button" data-foto aria-label="Ver a foto inteira"><img src="${esc(p.photo)}" alt="Foto de ${esc(p.name)}" fetchpriority="high"></button>
        <span class="chip status"><span class="dot"></span>${esc(p.status)}</span>
        <div class="corpo">
          <h1 class="rv" style="--d:.15s">${esc(p.name)}</h1>
          <p class="role rv" style="--d:.25s">${esc(p.role)}</p>
          <div class="places">${[...p.places, "Envio para todo o Brasil"].map((c, k) => `<span class="chip rv" style="--d:${.32 + k * .08}s">${esc(c)}</span>`).join("")}</div>
          <p class="signature rv">${esc(p.signature)}</p>
          <button class="save rv" type="button" data-vcard>${icon("download")}Salvar na agenda</button>
        </div>
      </article>
      <nav class="quick rv" aria-label="Ações rápidas">${quick}</nav>
      <div class="links">
        ${link(wa(p.whatsappMsg), "whatsapp", "Fale comigo no WhatsApp", "Atendo pessoalmente", true)}
        ${link(ig(p.instagram), "instagram", "Meu Instagram", "@" + p.instagram)}
        ${link(ig(p.instagramLoja), "bag", "Instagram da Divino Couro", "@" + p.instagramLoja)}
        ${link(p.catalogo, "book", "Catálogo de bolsas", "Modelos, cores e valores")}
        ${link(p.site, "globe", "Site da Divino Couro", "Compre online")}
      </div>
    </div>

    ${fotos.length ? `
    <section aria-labelledby="s-port">
      <div class="sec-head"><span class="eyebrow rv">Portfólio</span><h2 class="rv" style="--d:.1s" id="s-port">Bolsas da Divino Couro, <span>em couro de verdade.</span></h2></div>
      <div class="car rv" style="--d:.18s">
        <div class="car-track" id="car" tabindex="0" aria-label="Bolsas, deslize para o lado">
          ${fotos.map((f, j) => `<button class="car-item" type="button" data-open="${j}" aria-label="Ampliar foto ${j + 1} de ${fotos.length}"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy"></button>`).join("")}
        </div>
        <div class="car-foot">
          <div class="car-dots" aria-hidden="true">${fotos.map((_, j) => `<i class="${j ? "" : "on"}"></i>`).join("")}</div>
          <div class="car-navs">
            <button class="car-nav" type="button" data-dir="-1" aria-label="Foto anterior">${icon("left")}</button>
            <button class="car-nav" type="button" data-dir="1" aria-label="Próxima foto">${icon("right")}</button>
          </div>
        </div>
      </div>
    </section>` : ""}

    <section aria-labelledby="s-help">
      <div class="sec-head"><span class="eyebrow rv">Como posso te ajudar</span><h2 class="rv" style="--d:.1s" id="s-help">Escolha e me chame, <span>eu te respondo.</span></h2></div>
      <div class="links">${intents.map(i => link(wa(i.msg), i.title.includes("Envio") ? "box" : i.title.includes("Pronta") ? "star" : "chat", i.title, i.sub)).join("")}</div>
    </section>

    <section aria-labelledby="s-sobre">
      <div class="sec-head"><span class="eyebrow rv">Sobre mim</span><h2 class="rv" style="--d:.1s" id="s-sobre">Prazer, <span>${esc(first)}.</span></h2></div>
      <div class="sobre-tx">${p.bio.map((t, k) => `<p class="rv" style="--d:${k * .12}s">${esc(t)}</p>`).join("")}</div>
      <div class="services">
        <div class="svc rv"><h3>Bolsas de couro</h3><p>Modelos escolhidos a dedo, com acabamento caprichado.</p><span class="tag">Divino</span></div>
        <div class="svc rv"><h3>Atendimento pessoal</h3><p>Em Macapá/AP e Goiânia/GO, direto comigo.</p><span class="tag">AP · GO</span></div>
        <div class="svc rv"><h3>Envio para todo o Brasil</h3><p>E facilidade no pagamento.</p><span class="tag">Brasil</span></div>
      </div>
    </section>

    <div class="qr rv">
      <div class="qr-box" id="qr" role="img" aria-label="QR code deste cartão"></div>
      <div><h3>Aponte a câmera</h3><p>Este QR code abre o cartão da ${esc(first)}. Mostre na tela e a pessoa já sai com o contato.</p></div>
    </div>

    <section class="cta rv zoom" aria-labelledby="s-cta">
      <span class="eyebrow">Vamos conversar</span>
      <h2 id="s-cta">Sua próxima <em>bolsa favorita</em> está a uma mensagem.</h2>
      <div class="links">${link(wa(p.whatsappMsg), "whatsapp", `Chamar a ${first}`, "WhatsApp " + p.phone.replace("+55 ", ""), true)}</div>
    </section>

    <footer class="rv">
      <span class="foot-logo"><img src="${esc(p.logo)}" alt="Divino Couro"></span>
      <span class="tagline">${esc(p.signature)}</span>
      <div class="foot-row"><span>© ${new Date().getFullYear()} ${esc(p.name)}</span><button type="button" data-replay>Rever abertura</button></div>
      <a class="credit" href="${esc(company.site)}" target="_blank" rel="noopener">Cartão feito por HM Digital</a>
    </footer>`;

  document.documentElement.classList.add("rv-on");
  const main = document.createElement("main");
  main.className = "wrap";
  main.innerHTML = html;
  document.body.appendChild(main);
  document.body.insertAdjacentHTML("beforeend", '<div class="toast" id="toast" role="status" aria-live="polite"></div>');

  const toastEl = document.getElementById("toast");
  let tt;
  const toast = m => { toastEl.textContent = m; toastEl.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove("on"), 2400) };
  document.querySelectorAll("[data-breve]").forEach(b => b.addEventListener("click", () => toast(`${b.dataset.breve}: em breve!`)));

  document.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", async () => {
    const data = { title: `${p.name} · ${p.role}`, url: location.href };
    if (navigator.share) { try { await navigator.share(data); return } catch (e) { if (e.name === "AbortError") return } }
    try { await navigator.clipboard.writeText(location.href); toast("Link copiado") } catch { toast(location.href) }
  }));

  document.querySelectorAll("[data-vcard]").forEach(b => b.addEventListener("click", () => {
    const [given, ...rest] = p.name.split(" ");
    const vcf = ["BEGIN:VCARD", "VERSION:3.0", `N:${rest.join(" ")};${given};;;`, `FN:${p.name}`, `ORG:${p.company}`, "TITLE:CEO",
      `TEL;TYPE=CELL:${p.phone.replace(/[^\d+]/g, "")}`, `URL:${location.href}`, `X-SOCIALPROFILE;TYPE=instagram:${ig(p.instagram)}`, "END:VCARD"].join("\r\n");
    const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "leticia-caroline.vcf" });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Contato baixado. Abra o arquivo para salvar.");
  }));

  // carrossel
  const car = document.getElementById("car");
  if (car) {
    const dots = document.querySelectorAll(".car-dots i"), navs = document.querySelectorAll(".car-nav");
    const passo = () => car.children[0].getBoundingClientRect().width + 12;
    const atual = () => Math.round(car.scrollLeft / passo());
    const sync = () => {
      dots.forEach((d, k) => d.classList.toggle("on", k === Math.min(fotos.length - 1, atual())));
      navs[0].disabled = car.scrollLeft < 4;
      navs[1].disabled = car.scrollLeft + car.clientWidth >= car.scrollWidth - 4;
    };
    car.addEventListener("scroll", sync, { passive: true });
    navs.forEach(b => b.addEventListener("click", () => car.scrollTo({ left: (atual() + Number(b.dataset.dir)) * passo(), behavior: "smooth" })));
    sync();
  }

  // tela cheia (portfólio e foto principal)
  const box = document.createElement("div");
  box.className = "lightbox"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Fotos em tela cheia");
  document.body.appendChild(box);
  function abrir(lista, j) {
    box.innerHTML = `<div class="lb-top"><span class="lb-count">${j + 1}/${lista.length}</span><button type="button" class="lb-close" aria-label="Fechar">✕</button></div>
      <div class="lb-track">${lista.map(f => `<figure><img src="${esc(f.src)}" alt="${esc(f.alt)}"></figure>`).join("")}</div>`;
    box.hidden = false;
    document.documentElement.classList.add("intro-lock");
    const tr = box.querySelector(".lb-track"), cnt = box.querySelector(".lb-count");
    requestAnimationFrame(() => { tr.scrollLeft = j * tr.clientWidth });
    tr.addEventListener("scroll", () => { cnt.textContent = `${Math.round(tr.scrollLeft / tr.clientWidth) + 1}/${lista.length}` }, { passive: true });
    box.querySelector(".lb-close").addEventListener("click", fechar);
    box.onkeydown = e => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") tr.scrollBy({ left: tr.clientWidth, behavior: "smooth" });
      if (e.key === "ArrowLeft") tr.scrollBy({ left: -tr.clientWidth, behavior: "smooth" });
    };
    box.tabIndex = -1; box.focus();
  }
  function fechar() { box.hidden = true; box.innerHTML = ""; document.documentElement.classList.remove("intro-lock") }
  document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => abrir(fotos, Number(b.dataset.open))));
  document.querySelector("[data-foto]").addEventListener("click", () => abrir([{ src: p.photo, alt: `Foto de ${p.name}` }], 0));

  // QR code
  const qr = document.getElementById("qr");
  if (qr && window.qrcode) {
    const code = qrcode(0, "M"); code.addData(location.href.startsWith("http") ? location.href : "https://links.hmdigitalgo.com"); code.make();
    qr.innerHTML = code.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  } else if (qr) qr.hidden = true;

  // brilho que segue o dedo no cartão
  const card = document.getElementById("card");
  if (card && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  }

  document.querySelectorAll("[data-replay]").forEach(b => b.addEventListener("click", () => { scrollTo({ top: 0 }); window.HMIntro && HMIntro.play() }));

  // botões em cascata e revelação conforme rola
  document.querySelectorAll(".links").forEach(g => g.querySelectorAll(".link").forEach((l, k) => l.style.setProperty("--d", `${k * .08}s`)));
  const els = [...document.querySelectorAll(".rv")];
  function observar() {
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }),
      { rootMargin: "0px 0px -8% 0px", threshold: .1 });
    els.forEach(el => io.observe(el));
  }
  Promise.resolve(window.HMIntro ? HMIntro.auto() : null).then(observar);
})();
