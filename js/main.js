const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ua", "en"];
const currentPathName = window.location.pathname;
let currentLang =
  localStorage.getItem("language") || checkBrowserLang() || "ua";
let currentTexts = {};

const homeTexts = {
  "header-name": {
    en: "Eugene Hurtovenko",
    ua: "Євген Гуртовенко",
  },
  "about-title-one": {
    en: "I am",
    ua: "Я",
  },
  "about-title-two": {
    en: "from ukraine",
    ua: "з України",
  },
  "text": {
    ua: "Привіт, я веб-розробник з України. З 2016 року займаюся улюбленою справою. Добре знаю html / css / js / wordpress / php. Давайте робити великі справи разом. Я буду радий допомогти вам у цьому",
    en: "Hello, I'm a web developer from Ukraine. I have been doing what I love since 2016. I have good knowledge of html / css / js / wordpress / php.Let's do great things together. I'd be happy to help you with this",
  },
};

function checkPagePathName() {
  switch (currentPathName) {
    case "/index.html":
      currentTexts = homeTexts;
      break;

    default:
      currentTexts = homeTexts;
      break;
  }
}
checkPagePathName();


function changeLang() {
  for (const key in currentTexts) {
    let elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentTexts[key][currentLang];
    }
  }
}
changeLang();


langButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.classList.contains("header__btn_active")) {
      currentLang = event.target.dataset.btn;
      localStorage.setItem("language", event.target.dataset.btn);
      resetActiveClass(langButtons, "header__btn_active");
      btn.classList.add("header__btn_active");
      changeLang();
    }
  });
});


function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}


function checkActiveLangButton() {
  switch (currentLang) {
    case "ru":
      document
        .querySelector('[data-btn="ua"]')
        .classList.add("header__btn_active");
      break;
    case "en":
      document
        .querySelector('[data-btn="en"]')
        .classList.add("header__btn_active");
      break;
    default:
      document
        .querySelector('[data-btn="ua"]')
        .classList.add("header__btn_active");
      break;
  }
}
checkActiveLangButton();


function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLangs.some((elem) => {
    return elem === navLang;
  });
  if (result) {
    return navLang;
  }
}

console.log("navigator.language", checkBrowserLang());
