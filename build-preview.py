# Gera um único HTML com tudo embutido (para prévia e para mandar pelo WhatsApp).
import base64, glob, json, os, re, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
uri = lambda f: f"data:{'image/webp' if f.endswith('.webp') else 'image/jpeg'};base64," + base64.b64encode(open(f, 'rb').read()).decode()

perfil = open('assets/js/perfil.js').read()
perfil = re.sub(r'"(assets/img/[^"]+)"', lambda m: json.dumps(uri(m.group(1))), perfil)
assets = 'window.LC_ASSETS=' + json.dumps({
    "couro": uri('assets/img/couro.jpg'),
    "frames": [uri(f) for f in sorted(glob.glob('assets/frames/*.webp'))],
    "fps": 15, "cabelo": {"x": 0.74, "y": 0.09, "quadro": 74}}) + ';'
css = open('assets/css/style.css').read()
couro = uri('assets/img/couro.jpg')

corpo = f'''<title>Letícia Caroline · Divino Couro</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&family=Prata&display=swap">
<style>{css}
:root{{--couro:url({couro})}}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>{assets}</script>
<script>{perfil}</script>
<script>{open('assets/js/intro.js').read()}</script>
<script>{open('assets/js/card.js').read()}</script>
'''
open('cartao-preview.html', 'w').write(corpo)
completo = ('<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + corpo.replace('<script src=', '</head>\n<body>\n<script src=', 1) + '</body>\n</html>\n')
open('cartao-leticia-caroline.html', 'w').write(completo)
if len(sys.argv) > 1:
    open(sys.argv[1], 'w').write(completo.replace('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'node_modules/gsap/dist/gsap.min.js').replace('https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js','node_modules/qrcode-generator/qrcode.js'))
print(len(completo) // 1024, 'KB')
