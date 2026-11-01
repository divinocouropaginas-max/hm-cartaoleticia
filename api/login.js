// POST /api/login { senha }: confere a senha do painel e devolve uma sessão de 12 horas.
import { senhaConfere, criaToken, lerCorpo, json } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { erro: "Use POST." });
  if (!process.env.ADMIN_SENHA) return json(res, 500, { erro: "Senha do painel ainda não configurada no Vercel (ADMIN_SENHA)." });
  const { senha } = await lerCorpo(req);
  if (!senhaConfere(senha)) {
    await new Promise(r => setTimeout(r, 800));   // freia tentativas repetidas
    return json(res, 401, { erro: "Senha incorreta." });
  }
  return json(res, 200, { token: criaToken() });
}
