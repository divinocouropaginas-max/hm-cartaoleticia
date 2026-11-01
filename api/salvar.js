// POST /api/salvar { conteudo }: valida os limites e salva o conteúdo do cartão.
import { tokenValido, validar, salvarConteudo, lerCorpo, json } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { erro: "Use POST." });
  if (!tokenValido(req)) return json(res, 401, { erro: "Sessão expirada. Entre de novo." });
  const { conteudo } = await lerCorpo(req);
  const v = validar(conteudo);
  if (!v.ok) return json(res, 400, { erro: v.erro });
  try {
    await salvarConteudo(v.conteudo);
    return json(res, 200, { ok: true, conteudo: v.conteudo });
  } catch (e) {
    return json(res, 500, { erro: "Não consegui salvar agora. Tente de novo em instantes." });
  }
}
