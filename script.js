const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const tabs = document.querySelectorAll("[data-tab]");
const panelTitle = document.querySelector("[data-panel-title]");
const panelList = document.querySelector("[data-panel-list]");
const intro = document.querySelector("[data-intro]");

const prepContent = {
  nieruchomosci: {
    title: "Nieruchomości",
    items: [
      "dowody osobiste lub paszporty stron czynności,",
      "numer księgi wieczystej i podstawa nabycia nieruchomości,",
      "zaświadczenia wymagane dla konkretnej czynności, ustalane po kontakcie z kancelarią."
    ]
  },
  spadki: {
    title: "Spadki",
    items: [
      "odpis aktu zgonu spadkodawcy,",
      "odpisy aktów stanu cywilnego osób powołanych do spadku,",
      "testament, jeżeli został sporządzony, oraz dane spadkobierców."
    ]
  },
  poswiadczenia: {
    title: "Poświadczenia",
    items: [
      "oryginał dokumentu, którego kopia ma zostać poświadczona,",
      "dokument tożsamości osoby składającej podpis,",
      "informacja, do jakiej instytucji dokument będzie składany."
    ]
  },
  spolki: {
    title: "Spółki",
    items: [
      "aktualne dane wspólników, członków organów lub pełnomocników,",
      "projekt uchwały, umowy lub protokołu, jeżeli został przygotowany,",
      "numery KRS, NIP lub REGON oraz dokumenty potwierdzające umocowanie."
    ]
  }
};

function finishIntro() {
  document.body.classList.remove("intro-active");
  intro?.setAttribute("hidden", "");
}

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeNav() {
  document.body.classList.remove("nav-open");
  header?.classList.remove("nav-active");
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

function renderPrepPanel(key) {
  const content = prepContent[key];

  if (!content || !panelTitle || !panelList) {
    return;
  }

  panelTitle.textContent = content.title;
  panelList.replaceChildren(
    ...content.items.map((item) => {
      const element = document.createElement("li");
      element.textContent = item;
      return element;
    })
  );
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  finishIntro();
} else {
  intro?.addEventListener("animationend", (event) => {
    if (event.animationName === "reveal-hide" || event.animationName === "reveal-hide-mobile") {
      finishIntro();
    }
  });

  window.setTimeout(finishIntro, 2800);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");

  document.body.classList.toggle("nav-open", Boolean(isOpen));
  header?.classList.toggle("nav-active", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNav();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    renderPrepPanel(tab.dataset.tab);
  });
});
