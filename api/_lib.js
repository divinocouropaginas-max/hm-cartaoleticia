// Base comum das funções do painel: limites, validação, senha e armazenamento (Vercel Blob).
import crypto from "node:crypto";
import { list, put, del } from "@vercel/blob";

// Limites de caracteres de cada campo (o painel mostra o contador com esses números)
export const LIMITES = {
  status: 24,
  cargo: 40,
  frase: 70,
  bio: 260,            // cada parágrafo (até 2)
  faixaRotulo: 14,
  faixaTexto: 24,
  whatsappMsg: 160,
  instagram: 30,
  link: 200,
  fotoTitulo: 16,
  fotoLegenda: 40,
  ajudaTitulo: 32,
  ajudaLegenda: 40,
  ajudaMsg: 160,
  maxFotos: 8,
  maxAjuda: 4,
  fotoBytes: 3 * 1024 * 1024
};

const corta = (v, n) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, n);
const fotoOk = u => typeof u === "string" && (/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/fotos\//i.test(u) || /^assets\/img\/[\w.-]+$/.test(u));
const linkOk = u => !u || /^https:\/\/[^\s"<>]+$/i.test(u);

// Limpa e valida o conteúdo enviado pelo painel. Devolve { ok, conteudo } ou { ok:false, erro }.
export function validar(c) {
  if (!c || typeof c !== "object") return { ok: false, erro: "Conteúdo inválido." };
  const L = LIMITES, out = {};
  if (c.fotoCapa) { if (!fotoOk(c.fotoCapa)) return { ok: false, erro: "Foto do banner inválida." }; out.fotoCapa = c.fotoCapa }
  if (c.fotoSobre) { if (!fotoOk(c.fotoSobre)) return { ok: false, erro: "Foto do Sobre mim inválida." }; out.fotoSobre = c.fotoSobre }
  out.status = corta(c.status, L.status);
  out.cargo = corta(c.cargo, L.cargo);
  out.frase = corta(c.frase, L.frase);
  out.bio = (Array.isArray(c.bio) ? c.bio : []).slice(0, 2).map(t => corta(t, L.bio)).filter(Boolean);
  out.faixa = (Array.isArray(c.faixa) ? c.faixa : []).slice(0, 3).map(f => ({ rotulo: corta(f?.rotulo, L.faixaRotulo), texto: corta(f?.texto, L.faixaTexto) }));
  const zap = String(c.whatsapp ?? "").replace(/\D/g, "");
  if (zap && (zap.length < 12 || zap.length > 13)) return { ok: false, erro: "WhatsApp: use DDI + DDD + número, ex.: 5596991850131." };
  out.whatsapp = zap;
  out.whatsappMsg = corta(c.whatsappMsg, L.whatsappMsg);
  out.instagram = corta(c.instagram, L.instagram).replace(/^@/, "").replace(/[^\w.]/g, "");
  out.instagramLoja = corta(c.instagramLoja, L.instagram).replace(/^@/, "").replace(/[^\w.]/g, "");
  out.catalogo = corta(c.catalogo, L.link); out.site = corta(c.site, L.link);
  if (!linkOk(out.catalogo) || !linkOk(out.site)) return { ok: false, erro: "Links do catálogo e do site precisam começar com https://" };
  const fotos = (Array.isArray(c.portfolio) ? c.portfolio : []).slice(0, L.maxFotos);
  if (fotos.some(f => !fotoOk(f?.src))) return { ok: false, erro: "Alguma foto do portfólio é inválida." };
  out.portfolio = fotos.map(f => ({ src: f.src, title: corta(f.title, L.fotoTitulo), sub: corta(f.sub, L.fotoLegenda), alt: corta(f.title || "Bolsa Divino Couro", 60) }));
  out.ajuda = (Array.isArray(c.ajuda) ? c.ajuda : []).slice(0, L.maxAjuda)
    .map(a => ({ title: corta(a?.title, L.ajudaTitulo), sub: corta(a?.sub, L.ajudaLegenda), msg: corta(a?.msg, L.ajudaMsg) }))
    .filter(a => a.title);
  return { ok: true, conteudo: out };
}

// ---------- senha e sessão ----------
const segredo = () => process.env.ADMIN_SEGREDO || process.env.ADMIN_SENHA || "";
export function senhaConfere(senha) {
  const certa = process.env.ADMIN_SENHA || "";
  if (!certa) return false;
  const a = Buffer.from(String(senha ?? "")), b = Buffer.from(certa);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function criaToken(horas = 12) {
  const exp = Date.now() + horas * 3600e3;
  const sig = crypto.createHmac("sha256", segredo()).update(String(exp)).digest("base64url");
  return `${exp}.${sig}`;
}
export function tokenValido(req) {
  const t = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now() || !segredo()) return false;
  const certo = crypto.createHmac("sha256", segredo()).update(exp).digest("base64url");
  return sig.length === certo.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(certo));
}

// ---------- conteúdo salvo ----------
// Cada salvamento vira um arquivo novo (evita cache antigo); o mais recente vale.
export async function lerConteudo() {
  const { blobs } = await list({ prefix: "conteudo/" });
  if (!blobs.length) return null;
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  const r = await fetch(blobs[0].url, { cache: "no-store" });
  return r.ok ? r.json() : null;
}
export async function salvarConteudo(conteudo) {
  const corpo = JSON.stringify({ ...conteudo, salvoEm: new Date().toISOString() });
  const b = await put(`conteudo/leticia-${Date.now()}.json`, corpo, { access: "public", contentType: "application/json", addRandomSuffix: true });
  // guarda só as 10 versões mais recentes
  const { blobs } = await list({ prefix: "conteudo/" });
  blobs.sort((a, c) => new Date(c.uploadedAt) - new Date(a.uploadedAt));
  const velhos = blobs.slice(10).map(x => x.url);
  if (velhos.length) await del(velhos).catch(() => {});
  return b.url;
}
export async function salvarFoto(buffer, tipo) {
  const ext = tipo === "image/webp" ? "webp" : tipo === "image/png" ? "png" : "jpg";
  const b = await put(`fotos/foto.${ext}`, buffer, { access: "public", contentType: tipo, addRandomSuffix: true });
  return b.url;
}

// Explica em português o motivo de uma falha no armazenamento (sem expor segredos)
export function motivo(e) {
  const m = String(e && e.message || e || "");
  if (!process.env.BLOB_READ_WRITE_TOKEN || /No token found|BLOB_READ_WRITE_TOKEN/i.test(m))
    return "O armazenamento (Blob) não está ligado ao projeto no Vercel. Ligue o Blob em Storage e faça um Redeploy.";
  if (/private/i.test(m) && /access/i.test(m))
    return "O Blob foi criado como privado. Crie um Blob público (Public) e ligue ao projeto.";
  if (/suspended|quota|limit/i.test(m)) return "O armazenamento do Vercel atingiu o limite do plano.";
  return m.replace(/vercel_blob_rw_[\w]+/g, "***").slice(0, 200);
}
export const configuracao = () => ({ armazenamento: !!process.env.BLOB_READ_WRITE_TOKEN, senha: !!process.env.ADMIN_SENHA });

export async function lerCorpo(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const partes = [];
  for await (const p of req) partes.push(p);
  try { return JSON.parse(Buffer.concat(partes).toString("utf8") || "{}") } catch { return {} }
}
export const json = (res, status, dados, cache = "no-store") => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(JSON.stringify(dados));
};
