# Cartão digital · Letícia Caroline (Divino Couro)

Cartão no padrão HM Digital, com abertura animada: a Letícia desenhada em traço dourado anda com a bolsa, joga o cabelo e o nome é gravado a laser no couro.

- `index.html`: página publicada
- `assets/js/perfil.js`: **dados do cartão** (nome, WhatsApp, Instagram, links do catálogo e do site, fotos do portfólio). Para editar o cartão, mude só este arquivo.
- `assets/js/intro.js`: abertura (GSAP)
- `assets/js/card.js`: monta o cartão
- `assets/css/style.css`: visual (café, caramelo, creme e dourado; Prata + Manrope)
- `assets/abertura.mp4`: vídeo da abertura em traço dourado (fundo preto, fundido sobre o couro com `mix-blend-mode: screen`)
- `assets/img/`: foto principal, bolsas do portfólio, logo e textura de couro
- `build-preview.py`: gera um HTML único com tudo embutido, para mandar pelo WhatsApp

Catálogo e site aparecem como "Em breve" até `catalogo` e `site` serem preenchidos em `perfil.js`.

## Painel de edição (`/admin`)

A Letícia entra em `/admin` com a senha e altera fotos (banner, Sobre mim, portfólio), textos com limite de caracteres, a faixa abaixo da foto, contatos e links, e as opções do "Como posso ajudar você?". Ao salvar, o cartão atualiza em alguns segundos, sem precisar mexer no GitHub.

- `admin/index.html`: o painel (as fotos são reduzidas no próprio celular antes de enviar)
- `api/`: funções do Vercel (`login`, `conteudo`, `salvar`, `foto`); limites de caracteres em `api/_lib.js`
- `assets/js/conteudo.js`: o cartão lê o conteúdo salvo e aplica por cima de `perfil.js`

Configuração no Vercel (projeto `hm-cartaoleticia`):
1. Um **Blob store** ligado ao projeto (cria a variável `BLOB_READ_WRITE_TOKEN`)
2. Variáveis `ADMIN_SENHA` (senha do painel) e `ADMIN_SEGREDO` (texto aleatório longo, assina a sessão)
3. Fazer um novo deploy depois de criar as variáveis
