// Dados do cartão da Letícia. Para editar o cartão, mude só este arquivo.
window.HM_PROFILE = {
  slug: "leticia",
  name: "Letícia Caroline",
  role: "CEO da Divino Couro",
  photo: "assets/img/principal.webp",
  photoSobre: "assets/img/sobre.webp",
  logo: "assets/img/logo-dc.webp",
  logoMono: "assets/img/logo-mono.webp",
  status: "Atendendo agora",
  places: ["Macapá/AP", "Goiânia/GO"],
  bio: [
    "Sou a Letícia Caroline, CEO da Divino Couro. Escolho cada bolsa pensando na mulher que quer elegância no dia a dia: peças em couro, com acabamento caprichado, que acompanham você do trabalho ao jantar.",
    "Atendo pessoalmente em Macapá e Goiânia, envio para todo o Brasil e facilito o pagamento para você."
  ],
  signature: "Bolsas de couro escolhidas a dedo, pra você.",
  whatsapp: "5596991850131",
  whatsappMsg: "Oi, Letícia! Vim pelo seu cartão e quero conhecer as bolsas da Divino Couro.",
  phone: "+55 96 99185-0131",
  instagram: "let_carolinee",          // pessoal
  instagramLoja: "divinocouro_",       // Divino Couro
  catalogo: "",                        // link do catálogo (vazio = "Em breve")
  site: "",                            // link do site (vazio = "Em breve")
  company: "Divino Couro"
};

// Como posso te ajudar: cada linha abre o WhatsApp com a mensagem pronta
window.HM_INTENTS = [
  { title: "Quero ver os modelos", sub: "Fotos, cores e valores", msg: "Oi, Letícia! Quero ver os modelos de bolsa disponíveis." },
  { title: "Pronta entrega", sub: "O que tem pra levar hoje", msg: "Oi, Letícia! Quais bolsas você tem a pronta entrega?" },
  { title: "Envio para minha cidade", sub: "Frete para todo o Brasil", msg: "Oi, Letícia! Quero saber o frete das bolsas para a minha cidade." }
];

// Portfólio em carrossel: só as bolsas (fotos 4:5 em assets/img/)
window.HM_PORTFOLIO = [
  { src: "assets/img/b1.webp", alt: "Bolsa tote preta de couro", title: "Tote", sub: "Couro preto · alça de ombro" },
  { src: "assets/img/b2.webp", alt: "Bolsa marrom de couro com alça de mão", title: "Café", sub: "Couro marrom · alça de mão" },
  { src: "assets/img/b3.webp", alt: "Bolsa de ombro preta", title: "Clássica", sub: "Bolsa de ombro preta" },
  { src: "assets/img/b4.webp", alt: "Bolsa transversal preta matelassê", title: "Matelassê", sub: "Transversal preta" },
  { src: "assets/img/b5.webp", alt: "Bolsa de mão preta com alça", title: "Elegance", sub: "Bolsa de mão preta" }
];

// Crédito de quem fez o cartão
window.HM_COMPANY = { name: "HM Digital", site: "https://links.hmdigitalgo.com", logo: "assets/img/logo-hm.webp" };
