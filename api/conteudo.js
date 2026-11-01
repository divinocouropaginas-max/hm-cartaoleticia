// GET /api/conteudo: o conteúdo editado no painel (público, lido pelo cartão ao abrir).
import { lerConteudo, json, LIMITES, motivo, configuracao } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { erro: "Use GET." });
  try {
    const conteudo = await lerConteudo();
    return json(res, 200, { conteudo, limites: LIMITES, config: configuracao() }, "public, s-maxage=15, stale-while-revalidate=60");
  } catch (e) {
    return json(res, 200, { conteudo: null, limites: LIMITES, config: configuracao(), aviso: motivo(e) }, "no-store");
  }
}
