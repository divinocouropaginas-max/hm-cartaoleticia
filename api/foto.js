// POST /api/foto { tipo, dados (base64) }: guarda uma foto já reduzida pelo painel e devolve o endereço.
import { tokenValido, salvarFoto, lerCorpo, json, LIMITES, motivo } from "./_lib.js";

export const config = { api: { bodyParser: { sizeLimit: "4.5mb" } } };

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { erro: "Use POST." });
  if (!tokenValido(req)) return json(res, 401, { erro: "Sessão expirada. Entre de novo." });
  const { tipo, dados } = await lerCorpo(req);
  if (!["image/jpeg", "image/webp", "image/png"].includes(tipo)) return json(res, 400, { erro: "Formato de foto não aceito." });
  const buffer = Buffer.from(String(dados || ""), "base64");
  if (!buffer.length) return json(res, 400, { erro: "Foto vazia." });
  if (buffer.length > LIMITES.fotoBytes) return json(res, 413, { erro: "Foto muito grande." });
  try {
    return json(res, 200, { url: await salvarFoto(buffer, tipo) });
  } catch (e) {
    return json(res, 500, { erro: "Não consegui enviar a foto agora.", detalhe: motivo(e) });
  }
}
