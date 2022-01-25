// burger menu

const navDropdown = document.querySelector(".navbar__dropdown");
const navBtn = document.querySelector(".navbar__button");
const navIcon = document.querySelector(".navbar__icon");

navBtn.addEventListener("click", () => {
  navDropdown.classList.toggle("navbar__dropdown--shown");
  navBtn.classList.toggle("navbar__button--clicked");
  navIcon.classList.toggle("navbar__icon--clicked");
});

//Typing effect

const Typing = function (textElement, words, wait) {
  this.textElement = textElement;
  this.words = words;
  this.text = "";
  this.wordIndex = 0;
  this.wait = wait;
  this.type();
  this.isDeleting = false;
};

Typing.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullText = this.words[current];

  if (this.isDeleting) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }

  this.textElement.textContent = this.text;

  let typeSpeed = 110;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.text === fullText) {
    typeSpeed = 1500;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  const textElement = document.querySelector(".main__heading--change");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  new Typing(textElement, words, wait);
}

// Opacity changing text

const textElement = document.querySelector(".footer__text--change");

let i = 0;

const initOpacity = function () {
  const textElement = document.querySelector(".footer__text--change");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  if (i === words.length) i = 0;
  textElement.textContent = words[i];
  textElement.animate(
    [
      {
        opacity: "0",
      },
      { opacity: "1" },
    ],
    { duration: 3000, iteration: Infinity }
  );
  i++;
  setTimeout(() => initOpacity(), wait);
};

document.addEventListener("DOMContentLoaded", initOpacity);
