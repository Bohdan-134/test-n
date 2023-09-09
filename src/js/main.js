const monButton = document.querySelector(".btn-mon-open");
const yearButton = document.querySelector(".btn-year-open");
const tabsBtn = document.querySelector(".tabs-btn");

const cardPriceStarted = document.querySelector(".card-price__started");
const cardPriceProfessional = document.querySelector(".card-price__professional");
const cardPriceCompany = document.querySelector(".card-price__сompany");

function toggleTabsBtnClass(activeClass, inactiveClass) {
  tabsBtn.classList.remove(inactiveClass);
  tabsBtn.classList.add(activeClass);
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();
  
  function updateValue(currentTime) {
    const elapsedTime = currentTime - startTime;
    if (elapsedTime < duration) {
      const newValue = Math.round(start + (elapsedTime / duration) * range); // Округляем до целых
      element.innerHTML = `$${newValue}`;
      requestAnimationFrame(updateValue);
    } else {
      element.innerHTML = `$${end}`;
    }
  }

  requestAnimationFrame(updateValue);
}

monButton.addEventListener("click", function () {
  toggleTabsBtnClass("tabs-btn__mon-active", "tabs-btn__year-active");
  updateCardPrices("mon");
});

yearButton.addEventListener("click", function () {
  toggleTabsBtnClass("tabs-btn__year-active", "tabs-btn__mon-active");
  updateCardPrices("year");
});

const price = {
  mon: {
    started: 19,
    professional: 54,
    company: 89,
  },
  year: {
    started: 12,
    professional: 36,
    company: 56,
  },
};

function updateCardPrices(option) {
  const selectedPrices = price[option];
  animateValue(cardPriceStarted, parseInt(cardPriceStarted.innerHTML.slice(1)), selectedPrices.started, 1000);
  animateValue(cardPriceProfessional, parseInt(cardPriceProfessional.innerHTML.slice(1)), selectedPrices.professional, 1000);
  animateValue(cardPriceCompany, parseInt(cardPriceCompany.innerHTML.slice(1)), selectedPrices.company, 1000);
}


const openPopupButtons = document.querySelectorAll(".btn-open-popup");
let clickTimeout;

function handlePopupButtonClick() {
  document.body.classList.add("popup-wrapper__active");
  
  clickTimeout = setTimeout(() => {
    document.body.addEventListener("click", handleBodyClick);
  }, 500);

  this.removeEventListener("click", handlePopupButtonClick);
}

function handleBodyClick(event) {
  if (!event.target.closest(".popup")) {
    document.body.classList.remove("popup-wrapper__active");
    document.body.removeEventListener("click", handleBodyClick);

    openPopupButtons.forEach((button) => {
      button.addEventListener("click", handlePopupButtonClick);
    });
  }
}

openPopupButtons.forEach((button) => {
  button.addEventListener("click", handlePopupButtonClick);
});
