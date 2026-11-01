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
