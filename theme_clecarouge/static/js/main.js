const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

const callbackObserver = (entries, observer) => {
  entries.forEach((entry) => {
    observeVideoBanner(entry);
    observePrestationsBars(entry);
  });
}

/* DISPLAY NAV */
const observeVideoBanner = (entry) => {
  if (entry.target.id !== 'video_banner') {
    return;
  }

  const item = document.getElementById('clecarouge_nav');
  if (entry.isIntersecting) {
    item.classList.add('hidden');
  } else {
    item.classList.remove('hidden');
  }
}

const videoBanner = document.getElementById('video_banner');
if (!videoBanner) {
  document.getElementById('clecarouge_nav').classList.remove('hidden');
}

/* DISPLAY PRESTATIONS BARS */
const observePrestationsBars = (entry) => {
  if (entry.target.id !== 'prestations') {
    return;
  }

  const items = document.querySelectorAll('.prestations a');
  if (entry.isIntersecting) {
    items.forEach((item) => item.classList.remove('hidden'));
  } else {
    items.forEach((item) => item.classList.add('hidden'));
  }
}

/* OBSERVERS */
const prestations = document.getElementById('prestations');
const observer = new IntersectionObserver(callbackObserver, options);
if (videoBanner) {
  observer.observe(document.getElementById('video_banner'));
}
if (prestations) {
  observer.observe(document.getElementById('prestations'));
}


/* OPEN MENU : FILTER AND SORT */
const openMenu = (container) => {
  const element = document.getElementById(container);
  const button = element.getElementsByTagName('button')[0];
  const list = element.getElementsByTagName('ul')[0];

  if (!list.classList.contains('visible')) {
    setTimeout(() => {
      list.classList.add('visible');
      button.classList.add('down');
    }, 50);
  }
}

const closeMenus = () => {
  const filterUL = document.getElementById('options-filter');
  if (filterUL && filterUL.getElementsByTagName('ul')[0]) {
    filterUL.getElementsByTagName('ul')[0].classList.remove('visible');
    filterUL.getElementsByTagName('button')[0].classList.remove('down');
  }

  const sortUL = document.getElementById('options-sort');
  if (sortUL && sortUL.getElementsByTagName('ul')[0]) {
    sortUL.getElementsByTagName('ul')[0].classList.remove('visible');
    sortUL.getElementsByTagName('button')[0].classList.remove('down');
  }
}

/* SEARCH */
const openSearch = () => { 
  const search = document.getElementsByClassName('cc_search')[0];

  if (search) {
    search.classList.remove('hidden');
  }
}

const closeSearch = () => {
  const search = document.getElementsByClassName('cc_search')[0];

  if (search) {
    search.classList.add('hidden');
  }
}

/* CAROUSEL */
const carousel = document.getElementById('shop-carousel');
// if (carousel) {
//   // const url = '/website/suggestions';
//   const url = '/website/render_product_carousel';

//   fetch(url, {
//     // headers: {
//     //   "Content-Type": "application/json",
//     // }
//   })
//   .then(res => res.json())
//   .then(out =>
//     console.log('Checkout this JSON! ', out))
//   .catch(err => { throw err });
// }