// Monta o cartão da Letícia a partir de assets/js/perfil.js.
// Layout editorial (modelo "Luana Souza") com os botões no padrão HM logo abaixo da foto.
(window.HM_PRONTO || Promise.resolve()).then(function () {
  const p = window.HM_PROFILE;
  const intents = window.HM_INTENTS || [];
  const fotos = window.HM_PORTFOLIO || [];
  const company = window.HM_COMPANY;
  const [first, ...resto] = p.name.split(" ");

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
    right: '<path d="M9 6l6 6-6 6"/>'
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

  // nome letra a letra
  const letras = (t, d0) => [...t].map((c, k) => `<span class="l" style="--d:${(d0 + k * .06).toFixed(2)}s">${esc(c)}</span>`).join("");
  // divisor dourado com a estrelinha da Divino Couro
  const divisor = () => `<div class="divisor rv" aria-hidden="true"><i></i><svg viewBox="-12 -12 24 24"><path d="M0-11C.6-3.9 3.9-.6 11 0 3.9.6.6 3.9 0 11-.6 3.9-3.9.6-11 0-3.9-.6-.6-3.9 0-11Z"/></svg><i></i></div>`;

  // aba do envelope com o fecho de cordão
  const aba = `<svg viewBox="0 0 400 74" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0 L200 64 L400 0" fill="none" stroke="rgba(59,51,44,.22)" stroke-width="1"/>
    </svg>`;
  const fecho = `<svg viewBox="0 0 40 90" style="position:absolute;left:50%;top:22px;width:28px;height:64px;transform:translateX(-50%)" aria-hidden="true">
      <circle cx="20" cy="18" r="9" fill="none" stroke="#8a7d70" stroke-width="1.4"/><circle cx="20" cy="18" r="2" fill="#8a7d70"/>
      <circle cx="20" cy="66" r="9" fill="none" stroke="#8a7d70" stroke-width="1.4"/><circle cx="20" cy="66" r="2" fill="#8a7d70"/>
      <path d="M20 20 C 8 34, 32 46, 20 64" fill="none" stroke="#8a7d70" stroke-width="1"/>
    </svg>`;

  const html = `
    <section class="capa rv zoom" aria-label="${esc(p.name)}">
      <img class="px" data-px=".22" src="${esc(p.photo)}" alt="Foto de ${esc(p.name)}" fetchpriority="high">
      <div class="topo gutter">
        <span class="marca"><img class="mono" src="${esc(p.logoMono)}" alt="Divino Couro"></span>
        <button class="icon-btn" type="button" data-share aria-label="Compartilhar cartão">${icon("share")}</button>
      </div>
      <span class="status rotulo"><span class="dot"></span>${esc(p.status)}</span>
      <div class="nome gutter">
        <h1 class="letras" aria-label="${esc(p.name)}">${letras(first, .25)} <em>${letras(resto.join(" "), .25 + first.length * .06)}</em><svg class="brilho" viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0-11C.6-3.9 3.9-.6 11 0 3.9.6.6 3.9 0 11-.6 3.9-3.9.6-11 0-3.9-.6-.6-3.9 0-11Z"/></svg></h1>
        <span class="fio-ouro rv" style="--d:.9s"></span>
        <p class="cargo rotulo rv" style="--d:.35s">${esc(p.role)}</p>
      </div>
    </section>

    <div class="faixa">
      ${(p.faixa || []).map((f, k) => `<div class="rv" style="--d:${(.05 + k * .1).toFixed(2)}s"><span class="rotulo">${esc(f.rotulo)}</span><small>${esc(f.texto)}</small></div>`).join("")}
    </div>

    <nav class="contatos gutter" aria-label="Contatos">
      <div class="quick rv">${quick}</div>
      <div class="links">
        ${link(wa(p.whatsappMsg), "whatsapp", "Fale comigo no WhatsApp", "Atendo pessoalmente", true)}
        ${link(ig(p.instagram), "instagram", "Meu Instagram", "@" + p.instagram)}
        ${link(ig(p.instagramLoja), "bag", "Instagram da Divino Couro", "@" + p.instagramLoja)}
        ${link(p.catalogo, "book", "Catálogo de bolsas", "Modelos, cores e valores")}
        ${link(p.site, "globe", "Site da Divino Couro", "Compre online")}
      </div>
      <button class="save rv" type="button" data-vcard>${icon("download")}Salvar na agenda</button>
    </nav>

    ${divisor()}
    ${fotos.length ? `
    <section class="colecao gutter" aria-labelledby="s-col">
      <span class="olho rotulo rv">Portfólio</span>
      <h2 class="titulo rv" style="--d:.1s" id="s-col">Bolsas &amp;<span class="cursiva"> Coleção</span></h2>
      <div class="car rv" style="--d:.2s">
        <div class="car-track" id="car" tabindex="0" aria-label="Bolsas, deslize para o lado">
          ${fotos.map((f, j) => `<button class="car-item" type="button" data-open="${j}" aria-label="Ampliar: ${esc(f.alt)}">
            <img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy">
            <span class="leg"><span class="cursiva">${esc(f.title || "Divino Couro")}</span><small>${esc(f.sub || "")}</small></span></button>`).join("")}
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

    <section class="ajuda gutter" aria-labelledby="s-ajuda">
      <div class="envelope rv zoom" id="envelope">
        <div class="aba-fechada" aria-hidden="true"></div>
        <div class="aba">${aba}</div>${fecho}
        <h2 id="s-ajuda">Como posso ajudar você?</h2>
        <ul>${intents.map((i, k) => `<li class="rv" style="--d:${.15 + k * .1}s"><a href="${esc(wa(i.msg))}" target="_blank" rel="noopener"><span>${esc(i.title)}<small>${esc(i.sub)}</small></span>${icon("arrow")}</a></li>`).join("")}</ul>
      </div>
    </section>

    <section class="sobre" aria-labelledby="s-sobre">
      <img src="${esc(p.photoSobre)}" alt="" loading="lazy">
      <div class="tx gutter">
        <span class="olho2 rotulo rv">Sobre mim</span>
        <h2 class="rv" style="--d:.1s" id="s-sobre">${esc(first)}<br><em>${esc(resto.join(" "))}</em></h2>
        <span class="cargo2 rv" style="--d:.18s">${esc(p.role)} · ${esc(p.places.join(" e "))}</span>
        ${p.bio.map((t, k) => `<p class="rv" style="--d:${.25 + k * .1}s">${esc(t)}</p>`).join("")}
        <span class="assinatura rv" style="--d:.4s" aria-hidden="true"><span>${esc(first)}</span></span>
        <a class="fale rv" style="--d:.55s" href="${esc(wa(p.whatsappMsg))}" target="_blank" rel="noopener">Fale comigo agora ${icon("arrow")}</a>
      </div>
    </section>

    ${divisor()}
    <footer class="gutter rv">
      <img class="foot-logo" src="${esc(p.logo)}" alt="Divino Couro" loading="lazy">
      <span class="assin">${esc(p.signature)}</span>
      <span class="rotulo">${esc(p.name)} · ${esc(p.company)}</span>
      <div class="foot-row"><span>© ${new Date().getFullYear()} ${esc(p.company)}</span><button type="button" data-replay>Rever abertura</button></div>
      <a class="credit" href="${esc(company.site)}" target="_blank" rel="noopener">Cartão feito por ${company.logo ? `<img src="${esc(company.logo)}" alt="" onerror="this.remove()">` : ""}<span>HM Digital</span></a>
    </footer>`;

  document.documentElement.classList.add("rv-on");
  const main = document.createElement("main");
  main.className = "pagina";
  main.innerHTML = html;
  document.body.appendChild(main);
  document.body.insertAdjacentHTML("beforeend", '<div class="toast" id="toast" role="status" aria-live="polite"></div>'
    + `<div class="barra" id="barra" aria-hidden="true"></div>`
    + `<a class="fab" id="fab" href="${esc(wa(p.whatsappMsg))}" target="_blank" rel="noopener" aria-label="Falar com a ${esc(first)} no WhatsApp">${icon("whatsapp")}</a>`);

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
    const vcf = ["BEGIN:VCARD", "VERSION:3.0", `N:${resto.join(" ")};${first};;;`, `FN:${p.name}`, `ORG:${p.company}`, "TITLE:CEO",
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

  // tela cheia
  const box = document.createElement("div");
  box.className = "lightbox"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Fotos em tela cheia");
  document.body.appendChild(box);
  function abrir(j) {
    box.innerHTML = `<div class="lb-top"><span class="lb-count">${j + 1}/${fotos.length}</span><button type="button" class="lb-close" aria-label="Fechar">✕</button></div>
      <div class="lb-track">${fotos.map(f => `<figure><img src="${esc(f.src)}" alt="${esc(f.alt)}"></figure>`).join("")}</div>`;
    box.hidden = false;
    document.documentElement.classList.add("intro-lock");
    const tr = box.querySelector(".lb-track"), cnt = box.querySelector(".lb-count");
    requestAnimationFrame(() => { tr.scrollLeft = j * tr.clientWidth });
    tr.addEventListener("scroll", () => { cnt.textContent = `${Math.round(tr.scrollLeft / tr.clientWidth) + 1}/${fotos.length}` }, { passive: true });
    box.querySelector(".lb-close").addEventListener("click", fechar);
    box.onkeydown = e => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") tr.scrollBy({ left: tr.clientWidth, behavior: "smooth" });
      if (e.key === "ArrowLeft") tr.scrollBy({ left: -tr.clientWidth, behavior: "smooth" });
    };
    box.tabIndex = -1; box.focus();
  }
  function fechar() { box.hidden = true; box.innerHTML = ""; document.documentElement.classList.remove("intro-lock") }
  document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => abrir(Number(b.dataset.open))));

  document.querySelectorAll("[data-replay]").forEach(b => b.addEventListener("click", () => { scrollTo({ top: 0 }); window.HMIntro && HMIntro.play() }));

  // capa: o nome aparece assim que a abertura termina
  const h1 = document.querySelector(".capa h1");

  // profundidade nas fotos, barra de leitura e botão flutuante
  const pxs = [...document.querySelectorAll(".px")], barra = document.getElementById("barra"), fab = document.getElementById("fab");
  const contatos = document.querySelector(".contatos"), sobreFale = document.querySelector(".sobre .fale");
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tick = false;
  function aoRolar() {
    tick = false;
    const vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    barra.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (!calmo) pxs.forEach(im => {
      const r = im.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      im.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * -Number(im.dataset.px)).toFixed(1)}px`;
    });
    const passou = contatos.getBoundingClientRect().bottom < 0;
    const fim = sobreFale && sobreFale.getBoundingClientRect().top < vh && sobreFale.getBoundingClientRect().bottom > 0;
    fab.classList.toggle("on", passou && !fim);
  }
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(aoRolar) } }, { passive: true });
  addEventListener("resize", aoRolar);
  aoRolar();

  // coleção: destaque na bolsa da vez e troca automática suave
  if (car) {
    const itens = [...car.children];
    const marca = () => {
      const c = car.getBoundingClientRect().left + 22;
      let melhor = 0, dist = 1e9;
      itens.forEach((it, k) => { const d = Math.abs(it.getBoundingClientRect().left - c); if (d < dist) { dist = d; melhor = k } });
      itens.forEach((it, k) => it.classList.toggle("ativo", k === melhor));
      return melhor;
    };
    car.addEventListener("scroll", () => requestAnimationFrame(marca), { passive: true });
    marca();
    let auto, parado = false;
    const passo2 = () => itens[0].getBoundingClientRect().width + 12;
    const rodar = () => { clearInterval(auto); if (calmo) return; auto = setInterval(() => {
      if (parado || document.hidden) return;
      const r = car.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      const k = marca(), prox = k >= itens.length - 1 ? 0 : k + 1;
      car.scrollTo({ left: prox * passo2(), behavior: "smooth" });
    }, 3800) };
    ["pointerdown", "touchstart", "wheel"].forEach(ev => car.addEventListener(ev, () => { parado = true; clearTimeout(car._t); car._t = setTimeout(() => parado = false, 7000) }, { passive: true }));
    rodar();
  }

  // botões em cascata e revelação conforme rola
  document.querySelectorAll(".links").forEach(g => g.querySelectorAll(".link").forEach((l, k) => l.style.setProperty("--d", `${k * .08}s`)));
  const els = [...document.querySelectorAll(".rv")];
  function observar() {
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); h1 && h1.classList.add("in"); document.getElementById("envelope")?.classList.add("aberto"); return }
    h1 && h1.classList.add("in");
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); if (e.target.id === "envelope") setTimeout(() => e.target.classList.add("aberto"), 450); io.unobserve(e.target) } }),
      { rootMargin: "0px 0px -8% 0px", threshold: .1 });
    els.forEach(el => io.observe(el));
  }
  Promise.resolve(window.HMIntro ? HMIntro.auto() : null).then(observar);
});
