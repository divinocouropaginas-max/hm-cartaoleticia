// Abertura do cartão da Letícia Caroline.
// Um laser varre a tela e desenha a Letícia em traço dourado (quadros do vídeo dela
// convertidos em linhas). Ela anda com a bolsa,
// vira para a câmera e joga o cabelo. Do cabelo sai um brilho dourado que desce e grava
// "Letícia" a laser, como na abertura da marca; depois "CAROLINE", a estrelinha ✦ e
// "CEO · DIVINO COURO".
//
// Uso: HMIntro.play()  -> toca a abertura (retorna uma Promise)
//      HMIntro.auto()  -> toca só na primeira visita da sessão
// Precisa de window.LC_ASSETS = { couro: url, frames: [url...], fps, cabelo: {x,y,quadro} }
(function () {
  const A = window.LC_ASSETS;
  const C = { ouro: "#d8b47a", ouroClaro: "#f6e3bd" };

  const markup = () => `
  <div class="lc-couro"></div><div class="lc-spot"></div>
  <button class="intro-skip" type="button">Pular abertura</button>
  <div class="lc-palco">
    <div class="lc-pessoa"><canvas class="lc-quadros"></canvas><div class="lc-scan"></div><canvas class="lc-poeira"></canvas></div>
    <svg class="lc-nome-svg" viewBox="0 0 400 190" aria-hidden="true">
      <defs>
        <linearGradient id="lc-ouro" x1="0" x2="1" y1="0" y2=".3">
          <stop offset="0" stop-color="#a5773d"/><stop offset=".3" stop-color="#e9c98f"/><stop offset=".48" stop-color="#fff6e0"/>
          <stop offset=".62" stop-color="#e2bd7c"/><stop offset="1" stop-color="#9c6e36"/>
        </linearGradient>
        <radialGradient id="lc-brasa"><stop offset="0" stop-color="#fffdf0"/><stop offset=".2" stop-color="#ffe08a"/>
          <stop offset=".45" stop-color="#ff8c28" stop-opacity=".7"/><stop offset="1" stop-color="#ff5a14" stop-opacity="0"/></radialGradient>
        <clipPath id="lc-laser"><rect id="lc-laser-r" x="0" y="0" width="0" height="110"/></clipPath>
      </defs>
      <text x="200" y="78" text-anchor="middle" class="lc-nome" fill="#1a0e06" opacity=".55" transform="translate(0 2)" clip-path="url(#lc-laser)">Letícia</text>
      <text id="lc-nome" x="200" y="78" text-anchor="middle" class="lc-nome" fill="url(#lc-ouro)" clip-path="url(#lc-laser)">Letícia</text>
      <circle id="lc-ponta" r="13" fill="url(#lc-brasa)" opacity="0"/>
      <g id="lc-fumaca"></g>
      <path id="lc-estrela" d="M0-10C.6-3.6 3.6-.6 10 0 3.6.6.6 3.6 0 10-.6 3.6-3.6.6-10 0-3.6-.6-.6-3.6 0-10Z" fill="${C.ouroClaro}" opacity="0"/>
      <text id="lc-sob" x="200" y="118" text-anchor="middle" class="lc-sob" fill="${C.ouro}" opacity="0">CAROLINE</text>
      <text id="lc-ass" x="200" y="160" text-anchor="middle" class="lc-ass" fill="${C.ouro}" opacity="0">CEO · DIVINO COURO</text>
    </svg>
  </div>`;

  const css = `
  .intro{position:fixed;inset:0;z-index:100;background:#1e120b;overflow:hidden;transition:opacity .7s ease}
  .intro.intro-out{opacity:0;pointer-events:none}
  .lc-couro{position:absolute;inset:-6% -30% -6% -6%;background:url("${A.couro}") 0 50%/auto 120% repeat-x;opacity:0}
  .lc-spot{position:absolute;inset:0;pointer-events:none;background:
    radial-gradient(ellipse 60% 45% at 50% 40%,rgba(255,215,160,.13) 0%,rgba(255,215,160,.03) 45%,rgba(0,0,0,0) 70%),
    radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 40%,rgba(12,6,3,.8) 100%)}
  .lc-palco{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:calc(56px + env(safe-area-inset-top,0px)) 16px calc(24px + env(safe-area-inset-bottom,0px))}
  .lc-pessoa{position:relative;height:min(60vh,620px);aspect-ratio:var(--ar)}
  .lc-quadros,.lc-poeira{position:absolute;inset:0;width:100%;height:100%}
  .lc-quadros{clip-path:inset(0 0 100% 0)}
  .lc-scan{position:absolute;left:-12%;right:-12%;top:0;height:3px;opacity:0;mix-blend-mode:screen;
    background:linear-gradient(90deg,rgba(255,150,50,0),rgba(255,190,90,.95) 15%,#fff1c8 50%,rgba(255,190,90,.95) 85%,rgba(255,150,50,0));
    box-shadow:0 0 12px 3px rgba(255,140,40,.55)}
  .lc-nome-svg{width:min(92vw,420px);height:auto;margin-top:2.5vh;overflow:visible}
  .intro-skip{position:absolute;z-index:2;top:calc(16px + env(safe-area-inset-top,0px));right:max(16px,env(safe-area-inset-right,0px));
    background:rgba(20,12,6,.35);border:1px solid rgba(216,180,122,.35);color:${C.ouro};border-radius:999px;
    font:400 11px/1 "Prata",Georgia,serif;letter-spacing:.14em;text-transform:uppercase;padding:9px 14px;cursor:pointer}
  .intro-skip:focus-visible{outline:2px solid ${C.ouro};outline-offset:2px}
  .lc-nome{font:400 72px "Prata",Georgia,serif;letter-spacing:-1px}
  .lc-sob{font:400 16px "Prata",Georgia,serif;letter-spacing:9px}
  .lc-ass{font:400 10.5px "Prata",Georgia,serif;letter-spacing:5px}
  html.intro-lock,html.intro-lock body{overflow:hidden}`;

  // carrega todos os quadros antes de começar
  let cache;
  function carregar() {
    if (cache) return cache;
    cache = Promise.all(A.frames.map(src => new Promise(ok => {
      const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src;
    })));
    return cache;
  }

  async function play() {
    if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.getElementById("lc-intro-css")) document.head.insertAdjacentHTML("beforeend", `<style id="lc-intro-css">${css}</style>`);
    const [frames] = await Promise.all([carregar(), Promise.race([document.fonts.load('72px "Prata"'), new Promise(r => setTimeout(r, 1500))]).catch(() => {})]);
    const f0 = frames.find(Boolean);
    if (!f0) return;

    const root = document.createElement("div");
    root.className = "intro";
    root.innerHTML = markup();
    root.style.setProperty("--ar", `${f0.width} / ${f0.height}`);
    document.body.appendChild(root);
    const $ = s => root.querySelector(s);
    const NS = "http://www.w3.org/2000/svg";

    // quadros
    const cv = $(".lc-quadros"), ctx = cv.getContext("2d");
    cv.width = f0.width; cv.height = f0.height;
    const quadro = { i: 0 };
    let ultimo = -1;
    function desenha() {
      const i = Math.min(frames.length - 1, Math.max(0, Math.round(quadro.i)));
      if (i === ultimo || !frames[i]) return;
      ultimo = i;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(frames[i], 0, 0);
    }

    // poeira dourada do cabelo (canvas por cima dela)
    const pc = $(".lc-poeira"), px = pc.getContext("2d");
    pc.width = f0.width; pc.height = f0.height;
    const graos = [];
    function soltaPoeira() {
      const { x, y } = A.cabelo;
      for (let k = 0; k < 70; k++) {
        const ang = -Math.PI * (.05 + Math.random() * .9), v = 2 + Math.random() * 6;
        graos.push({ x: x * pc.width, y: y * pc.height, vx: Math.cos(ang) * v + 1.5, vy: Math.sin(ang) * v, r: .8 + Math.random() * 2.2, vida: 1 });
      }
    }
    function animaPoeira() {
      px.clearRect(0, 0, pc.width, pc.height);
      for (const g of graos) {
        if (g.vida <= 0) continue;
        g.x += g.vx; g.y += g.vy; g.vy += .12; g.vx *= .985; g.vida -= .012;
        px.globalAlpha = Math.max(0, g.vida);
        px.fillStyle = Math.random() > .3 ? "#f6e3bd" : "#fff6e0";
        px.beginPath(); px.arc(g.x, g.y, g.r, 0, Math.PI * 2); px.fill();
      }
      px.globalAlpha = 1;
    }

    // laser no nome
    const nome = $("#lc-nome"), nb = nome.getBBox();
    const x0 = nb.x - 4, x1 = nb.x + nb.width + 4;
    const rect = $("#lc-laser-r"), ponta = $("#lc-ponta"), fumaca = $("#lc-fumaca");
    const est = $("#lc-estrela");
    gsap.set(est, { x: nb.x + nb.width + 6, y: nb.y + 8, scale: 0, rotation: -90, transformOrigin: "50% 50%" });
    const laser = { x: x0 };
    let ultimaFumaca = 0;
    function renderLaser() {
      rect.setAttribute("width", Math.max(0, laser.x));
      ponta.setAttribute("cx", laser.x);
      ponta.setAttribute("cy", 52 + Math.sin(laser.x * .35) * 20);
      const agora = performance.now();
      if (laser.x > x0 + 2 && laser.x < x1 - 2 && agora - ultimaFumaca > 90) {
        ultimaFumaca = agora;
        const f = document.createElementNS(NS, "circle");
        f.setAttribute("cx", laser.x); f.setAttribute("cy", 48); f.setAttribute("r", 6); f.setAttribute("fill", "rgba(225,218,208,.28)");
        fumaca.appendChild(f);
        gsap.to(f, { attr: { cy: -20, r: 18 }, x: (Math.random() - .5) * 30, opacity: 0, duration: 1.4, ease: "power1.out", onComplete: () => f.remove() });
      }
    }

    const dur = frames.length / A.fps;               // duração do vídeo
    const tCabelo = A.cabelo.quadro / A.fps;          // quando ela joga o cabelo
    const tl = gsap.timeline({ paused: true, onUpdate: () => { desenha(); animaPoeira() } });

    // couro acende e ela aparece
    tl.to(".lc-couro", { opacity: 1, duration: .8, ease: "power1.out" }, 0)
      // laser desenha ela de cima para baixo
      .to($(".lc-scan"), { opacity: 1, duration: .1 }, .2)
      .fromTo($(".lc-scan"), { top: "0%" }, { top: "100%", duration: 1.1, ease: "power1.inOut" }, .2)
      .fromTo($(".lc-quadros"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power1.inOut" }, .2)
      .to($(".lc-scan"), { opacity: 0, duration: .25 }, 1.25)
      // vídeo dela andando, virando e jogando o cabelo
      .to(quadro, { i: frames.length - 1, duration: dur, ease: "none" }, .25)
      // enquanto anda (de perfil), o couro desliza no sentido contrário
      .to(root.querySelector(".lc-couro"), { x: "-12%", duration: tCabelo * .62, ease: "sine.inOut" }, .25)
      // brilho do cabelo
      .call(soltaPoeira, null, .25 + tCabelo);

    // o nome vai sendo escrito a laser enquanto ela anda;
    // na virada do cabelo aparecem CAROLINE, a estrelinha e a assinatura
    const nomeSvg = $(".lc-nome-svg");
    gsap.set(nomeSvg, { opacity: 0 });
    const tLaser = 1.45;
    const tVirada = .25 + tCabelo;
    tl.to(nomeSvg, { opacity: 1, duration: .2 }, tLaser)
      .to(ponta, { opacity: 1, duration: .15 }, tLaser)
      .fromTo(laser, { x: x0 }, { x: x1, duration: tVirada - tLaser - .15, ease: "none", onUpdate: renderLaser }, tLaser)
      .to(ponta, { opacity: 0, duration: .3 }, tVirada - .15)
      .fromTo("#lc-sob", { opacity: 0, letterSpacing: "18px" }, { opacity: 1, letterSpacing: "9px", duration: .9, ease: "power2.out" }, tVirada + .05)
      .to(est, { opacity: 1, scale: 1, rotation: 0, duration: .55, ease: "back.out(2.4)" }, tVirada + .3)
      .to(est, { scale: .55, rotation: 45, duration: .45, yoyo: true, repeat: 1, ease: "sine.inOut" })
      .fromTo("#lc-ass", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .8, ease: "power2.out" }, tVirada + .55)
      .to({}, { duration: 1.6 });

    return new Promise(resolve => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        root.classList.add("intro-out");
        document.documentElement.classList.remove("intro-lock");
        setTimeout(() => { tl.kill(); root.remove(); resolve() }, 700);
      };
      tl.call(finish);
      $(".intro-skip").addEventListener("click", finish);
      document.documentElement.classList.add("intro-lock");
      desenha();
      tl.play();
    });
  }

  function auto() {
    let seen = false;
    try { seen = sessionStorage.getItem("lc-intro") === "1"; sessionStorage.setItem("lc-intro", "1") } catch {}
    return seen ? Promise.resolve() : play();
  }

  window.HMIntro = { play, auto, carregar };
})();
