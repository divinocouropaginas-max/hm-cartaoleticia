// Lê o que a Letícia editou no painel (/admin) e aplica por cima de perfil.js.
// Se o painel ainda não tiver nada salvo, ou a internet falhar, o cartão usa os dados de perfil.js.
window.HM_PRONTO = (function () {
  if (!/^https?:$/.test(location.protocol)) return Promise.resolve();
  const espera = new Promise(r => setTimeout(r, 2500));
  const busca = fetch("/api/conteudo", { cache: "no-store" })
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      const c = d && d.conteudo;
      if (!c) return;
      const p = window.HM_PROFILE;
      if (c.fotoCapa) p.photo = c.fotoCapa;
      if (c.fotoSobre) p.photoSobre = c.fotoSobre;
      ["status", "whatsapp", "whatsappMsg", "instagram", "instagramLoja"].forEach(k => { if (c[k]) p[k] = c[k] });
      if (c.cargo) p.role = c.cargo;
      if (c.frase) p.signature = c.frase;
      if ("catalogo" in c) p.catalogo = c.catalogo;
      if ("site" in c) p.site = c.site;
      if (c.bio && c.bio.length) p.bio = c.bio;
      if (c.faixa && c.faixa.length) p.faixa = c.faixa;
      if (c.whatsapp) p.phone = "+" + c.whatsapp.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, "$1 $2 $3-$4");
      if (c.portfolio && c.portfolio.length) window.HM_PORTFOLIO = c.portfolio;
      if (c.ajuda && c.ajuda.length) window.HM_INTENTS = c.ajuda;
    })
    .catch(() => {});
  return Promise.race([busca, espera]);
})();
