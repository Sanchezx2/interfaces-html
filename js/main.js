// --- NAVEGACIÓN ENTRE VISTAS ---
const dockButtons = document.querySelectorAll(".dock-btn");
const views = document.querySelectorAll(".view");
const routePill = document.getElementById("routePill");

const routeLabels = {
  "view-inicio": "Cáceres ↔ Valencia",
  "view-viaje": "02 · Viaje",
  "view-regalo": "03 · Regalo"
};

dockButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;

    dockButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach((v) => v.classList.remove("active"));
    const targetView = document.getElementById(targetId);
    if (targetView) {
      targetView.classList.add("active");
    }

    if (routePill && routeLabels[targetId]) {
      routePill.textContent = routeLabels[targetId];
    }
  });
});

// --- ODÓMETRO DESDE EL 27 DE JULIO DE 2021 ---
function updateOdometer() {
  const digitsContainer = document.getElementById("odometerDigits");
  if (!digitsContainer) return;

  const startDate = new Date(2021, 6, 27); // Mes 6 = Julio (0-indexed)
  const now = new Date();
  const diffMs = Math.max(0, now - startDate);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const paddedDays = String(days).padStart(4, "0");

  digitsContainer.innerHTML = paddedDays
    .split("")
    .map((digit) => `<span class="odo-digit">${digit}</span>`)
    .join("");
}

updateOdometer();

// --- CARRUSEL EDITORIAL (VISTA 02: VIAJE) ---
const showcaseData = {
  juegos: [
    {
      label: "Apex · Lifeline",
      watermark: "APEX",
      subtitle: "APEX LEGENDS · APOYO",
      title: "APOYO TÁCTICO",
      desc: "Echandome unas risas con mi support favorito.",
      giantName: "LIFELINE",
      quote: "“La curita del equipo.”",
      tag: "NUESTRAS PARTIDAS",
      img: "assets/images/lifeline-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "-60px",
      zoom: 1.55
    },
    {
      label: "Valorant · Clove",
      watermark: "VALORANT",
      subtitle: "VALORANT · CONTROLADOR",
      title: "SIN MIEDO AL CLUTCH",
      desc: "El corazón a mil viendote jugar.",
      giantName: "CLOVE",
      quote: "“Aún no he terminado.”",
      tag: "DUO EN RANKED",
      img: "assets/images/clove-cutout.png",
      posX: "50%",
      posY: "12%",
      offsetY: "0px",
      zoom: 1.45
    },
    {
      label: "Overwatch · Mercy",
      watermark: "OVERWATCH",
      subtitle: "OVERWATCH · APOYO",
      title: "SIEMPRE EN EL AIRE",
      desc: "Volando de punta a punta del mapa para que nadie caiga en mitad del combate.",
      giantName: "MERCY",
      quote: "“Los héroes nunca mueren.”",
      tag: "EQUIPO IMPARABLE",
      img: "assets/images/mercy-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "0px",
      zoom: 1.8
    }
  ],
  musica: [
    {
      label: "The Weeknd",
      watermark: "XO",
      subtitle: "CONCIERTO · RECUERDO",
      title: "AFTER HOURS",
      desc: "Una de esas noches que se quedan grabadas para siempre, cantando cada tema juntos.",
      giantName: "THE WEEKND",
      quote: "“Una noche inolvidable.”",
      tag: "BANDA SONORA",
      img: "assets/images/theweeknd-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "-320px",
      zoom: 1.6,
      gallery: [
        "assets/images/concierto-1.jpg",
        "assets/images/concierto-2.jpg",
        "assets/images/concierto-3.jpg"
      ]
    },
    {
      label: "NF",
      watermark: "NF",
      subtitle: "Canciones · RECUERDO",
      title: "When I Grow Up",
      desc: "Una de esas noches que se quedan grabadas para siempre, cantando cada tema juntos.",
      giantName: "NF",
      quote: "“Noches escuchandola.”",
      tag: "BANDA SONORA",
      img: "assets/images/nf-cutout.png",
      posX: "50%",
      posY: "10%",
      offsetY: "0px",
      zoom: 1.45
    },
    {
      label: "LISA",
      watermark: "LISA",
      subtitle: "Canciones · RECUERDO",
      title: "SaWaDiKa",
      desc: "Enseñandome cada canción, tan ilusionada como siempre",
      giantName: "LISA",
      quote: "“Cuantos detallitos de di no?”",
      tag: "BANDA SONORA",
      img: "assets/images/lisa-cutout.png",
      posX: "50%",
      posY: "10%",
      offsetY: "-100px",
      zoom: 1.45
    },
    {
      label: "K/DA",
      watermark: "K/DA",
      subtitle: "POP/STARS · BANDA SONORA",
      title: "MORE & POP/STARS",
      desc: "Un lolete?",
      giantName: "K/DA",
      quote: "“You know who it is.”",
      tag: "BANDA SONORA",
      img: "assets/images/kda-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "50px",
      zoom: 0.75
    },
    {
      label: "IlloJuan & Orslok",
      watermark: "LOS DIOZES",
      subtitle: "TEMAZO · LOS DIOZES",
      title: "Mardoza",
      desc: "¿Qué pasa, guarrindonga? Que tienes más peligro que un mono con escopeta Pero vaya pedazo de te-Mambo",
      giantName: "LOS DIOZES",
      quote: "Steisy, está to' crazy",
      tag: "A mi parienta le ha comido el pussy amazing",
      img: "assets/images/illojuan-orslok-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "-80px",
      zoom: 1.5
    },
    {
      label: "Dua Lipa",
      watermark: "DUA LIPA",
      subtitle: "INCONFUNDIBLE · TEMAZOS",
      title: "FUTURE NOSTALGIA",
      desc: "Importante para ti. Me alegra que te haga feliz.",
      giantName: "DUA LIPA",
      quote: "“Levitating en bucle.”",
      tag: "BANDA SONORA",
      img: "assets/images/dualipa-cutout.png",
      posX: "50%",
      posY: "0%",
      offsetY: "-25px",
      zoom: 1
    }
  ]
};

let currentCategory = "juegos";
let currentSlideIndex = 0;
let showcaseTimer = null;

const reelContainer = document.getElementById("showcaseReel");
const stageEl = document.getElementById("showcaseStage");
const catButtons = document.querySelectorAll(".cat-tab");

function renderShowcase(animate = true) {
  const items = showcaseData[currentCategory];
  const item = items[currentSlideIndex];
  if (!item || !reelContainer || !stageEl) return;

  reelContainer.innerHTML = items
    .map(
      (entry, idx) => `
      <button class="reel-item ${idx === currentSlideIndex ? "active" : ""}" data-index="${idx}" type="button">
        0${idx + 1} · ${entry.label}
        <span class="reel-progress"></span>
      </button>`
    )
    .join("");

  reelContainer.querySelectorAll(".reel-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentSlideIndex = parseInt(btn.dataset.index, 10);
      renderShowcase(true);
      restartShowcaseTimer();
    });
  });

  const updateContent = () => {
    const watermarkEl = document.getElementById("showcaseWatermark");
    const subtitleEl = document.getElementById("showcaseSubtitle");
    const titleEl = document.getElementById("showcaseTitle");
    const descEl = document.getElementById("showcaseDesc");
    const giantNameEl = document.getElementById("showcaseGiantName");
    const quoteEl = document.getElementById("showcaseQuote");
    const tagEl = document.getElementById("showcaseTag");
    const imgEl = document.getElementById("showcaseImg");
    const galleryEl = document.getElementById("concertGallery");

    if (watermarkEl) watermarkEl.textContent = item.watermark;
    if (subtitleEl) subtitleEl.textContent = item.subtitle;
    if (titleEl) titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.desc;
    if (giantNameEl) giantNameEl.textContent = item.giantName;
    if (quoteEl) quoteEl.textContent = item.quote;
    if (tagEl) tagEl.textContent = item.tag;

    if (imgEl) {
      imgEl.src = item.img;
      imgEl.alt = item.giantName;
      imgEl.style.objectPosition = `${item.posX || "50%"} ${item.posY || "0%"}`;
      imgEl.style.height = `${(item.zoom || 1.5) * 100}%`;
      imgEl.style.marginTop = item.offsetY || "0px";
    }

    if (galleryEl) {
      if (item.gallery && item.gallery.length > 0) {
        galleryEl.hidden = false;
        galleryEl.innerHTML = item.gallery
          .map(
            (photoSrc) => `
            <div class="concert-photo-card">
              <img src="${photoSrc}" alt="Recuerdo concierto">
            </div>`
          )
          .join("");
      } else {
        galleryEl.hidden = true;
        galleryEl.innerHTML = "";
      }
    }
  };

  if (animate) {
    stageEl.classList.add("is-switching");
    setTimeout(() => {
      updateContent();
      stageEl.classList.remove("is-switching");
    }, 220);
  } else {
    updateContent();
  }
}

function restartShowcaseTimer() {
  clearInterval(showcaseTimer);
  const items = showcaseData[currentCategory];
  if (items.length <= 1) return;

  showcaseTimer = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % items.length;
    renderShowcase(true);
  }, 12000);
}

catButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    catButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    currentSlideIndex = 0;
    renderShowcase(true);
    restartShowcaseTimer();
  });
});

if (reelContainer) {
  renderShowcase(false);
  restartShowcaseTimer();
}