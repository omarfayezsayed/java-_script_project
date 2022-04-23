'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll
const scroll_btn = document.querySelector('.btn--scroll-to');
const section_1 = document.querySelector('#section--1');
scroll_btn.addEventListener('click', () => {
  section_1.scrollIntoView({ behavior: 'smooth' });
});
// implement the nav linkers

const nav_links = document.querySelectorAll('.nav__link');
for (let i = 0; i < nav_links.length; i++) {
  nav_links[i].addEventListener('click', e => {
    e.preventDefault();
    const section = nav_links[i].getAttribute('href');
    const curpostion = document.querySelector(section);
    curpostion.scrollIntoView({ behavior: 'smooth' });
  });
}
//tobble
const operations = document.querySelectorAll('.operations__tab');
const operations_content = document.querySelectorAll('.operations__content');
for (const val of operations) {
  val.addEventListener('click', function () {
    for (const val of operations) {
      val.classList.remove('operations__tab--active');
    }
    val.classList.add('operations__tab--active');
    // val.getAttribute('data-tab'));
    // show the content of that buttun

    for (const val of operations_content) {
      val.classList.remove('operations__content--active');
    }
    document
      .querySelector(`.operations__content--${val.getAttribute('data-tab')}`)
      .classList.add('operations__content--active');
  });
}
// sticy positon

// const positoins = section_1.getBoundingClientRect();
// console.log(positoins.top);
// window.addEventListener('scroll', () => {
//   if (window.scrollY > positoins.top) {
//     document.querySelector('.nav').classList.add('sticky');
//   } else {
//     document.querySelector('.nav').classList.remove('sticky');
//   }
// });
const header = document.querySelector('.header');
const callback = function (entries, obseerver) {
  if (!entries[0].isIntersecting) {
    document.querySelector('.nav').classList.add('sticky');
  } else {
    document.querySelector('.nav').classList.remove('sticky');
  }
};
const optios = {
  root: null,
  // threshold: 0,
  rootMargin: '-90px',
};
const observer = new IntersectionObserver(callback, optios);
observer.observe(header);
//------------------------------------------------

// reveal the sections

const sections_all = document.querySelectorAll('.section');

const state = {
  root: null,
  threshold: 0.2,
};

const reveal = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  // console.log(entry);
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const observ_section = new IntersectionObserver(reveal, state);
sections_all.forEach(section => {
  section.classList.add('section--hidden');
  observ_section.observe(section);
});

// lazy load images----------------------------------------------------------
const image_collection = document.querySelectorAll('img[data-src]');

const state_image = {
  root: null,
  threshold: 0.4,
};

const reveal_image = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.getAttribute('data-src');
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
  }
  observer.unobserve(entry.target);
};

const observ_images = new IntersectionObserver(reveal_image, state_image);

// console.log(image_collection);
image_collection.forEach(image => {
  observ_images.observe(image);
});

// build the slide here

let curslide = 0;
const slides = document.querySelectorAll('.slide');

const dot_div = document.querySelector('.dots');
console.log(slides.length);

for (let i = 0; i < slides.length; i++) {
  const div__ = document.createElement('div');
  div__.classList.add('dots__dot');
  div__.setAttribute('data-position', i);
  dot_div.append(div__.cloneNode(true));
}
const all_dots = document.querySelectorAll('.dots__dot');
const go_to_slide = function (curslide) {
  for (const val_2 of all_dots) {
    val_2.classList.remove('dots__dot--active');
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - curslide) * 100}%)`;
  });
  all_dots[curslide].classList.add('dots__dot--active');
};
go_to_slide(0);

const move_left = function () {
  if (curslide === 0) {
    curslide = slides.length - 1;
  } else {
    curslide--;
  }
  go_to_slide(curslide);
};

const move_right = function () {
  if (curslide === slides.length - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  go_to_slide(curslide);
};
const right_btn = document.querySelector('.slider__btn--right');
right_btn.addEventListener('click', move_right);

const left_btn = document.querySelector('.slider__btn--left');
left_btn.addEventListener('click', move_left);

// create dots here

console.log(all_dots);
let i = 0;
for (const val of all_dots) {
  val.addEventListener('click', () => {
    const position = Number(val.getAttribute('data-position'));
    go_to_slide(position);
  });
}
