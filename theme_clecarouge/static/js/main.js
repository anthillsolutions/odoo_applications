let maxSlides = 0;

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
if (carousel) {
  const url = '/website/suggestions';
  const container = document.getElementById('shop-carousel-container');

  fetch(url)
  .then(res => res.json())
  .then(products => {
    maxSlides = products.length;
    products.forEach((product, index) => container ? container.appendChild(createSlide(product, index)) : undefined); 
  })
  .catch(err => { throw err });
}

/* SLIDE CREATTION */
const createSlide = (product, index) => {
  const slide = document.createElement('a');
  slide.setAttribute('id', `carousel-product${index}`);
  slide.setAttribute('href', `/shop/${product.id}`);
  const picture = document.createElement('img');
  picture.setAttribute('src', `/web/image/product.template/${product.id}/image_1920`);
  const description = document.createElement('div');
  description.setAttribute('class', 'shop-item-description');
  const name = document.createElement('p');
  name.textContent = product.name;
  const price = document.createElement('p');
  price.textContent = `CHF ${product.price}`;
  description.appendChild(name);
  slide.appendChild(picture);
  // slide.appendChild(description);
  return slide;
}

/* button prev */
const carouselPrev = () => {
  const close = getClosest(-1);

  if (close !== undefined && close >= 0) {
    window.location = `/#carousel-product${close}`;
  }
}

const carouselNext = () => {
  const close = getClosest(1);

  if (close !== undefined && close < maxSlides) {
    window.location = `/#carousel-product${close}`;
  }
}

const getClosest = (isNext) => {
  const visible = [...new Array(maxSlides)]
    .map((_, index) => `carousel-product${index}`)
    .map((id) => isElementVisible(id, false));
  const id = visible.findIndex((item) => !!item);
  return isElementVisible(`carousel-product${id}`, true) ? id + isNext : id;
}

/* Is element visible */
const isElementVisible = (id, exact) => {
  console.log(id, exact);
  const el = document.getElementById(id);
  const rect = el.getBoundingClientRect();
  const elemLeft = rect.left;
  const elemRight = rect.right;
  
  const mid = window.innerWidth / 2;
  return exact ? 
    elemLeft >= 0 && elemRight <= window.innerWidth :
    elemLeft > -mid && elemLeft < mid && elemRight > mid && elemRight < 3 * mid;
}

/* Toggle menu mobile */
const toggleMenuMobile = () => {
  const nav = document.getElementById('cc_nav');
  if (nav) {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    } else {
      nav.classList.add('show');
    }
  }
}

/* mapgl */
if (document.getElementById('contact-map')) {
  const url = '/website/mapgl';

  fetch(url)
  .then(res => res.json())
  .then(res => {
    mapboxgl.accessToken = res.token;
    const map = new mapboxgl.Map({
      container: 'contact-map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [6.130343, 46.1863962],
      zoom: 15,
      projection: 'globe'
    });
    map.on('style.load', () => {
      map.setFog({});
    });
    const marker = new mapboxgl.Marker({
      color: '#DC001C'
    }).setLngLat([6.130343, 46.1863962])
      .addTo(map);
  })
  .catch(err => { throw err });
}

/* MENU MOBILEE SHOP */
const toggleMenuMobileShop = () => { 
  const element = document.getElementById('menu_mobile_shop');
  const button = element.getElementsByTagName('button')[0];
  const list = element.getElementsByClassName('shop-options-mobile-panel')[0];

  if (!list.classList.contains('visible')) {
    setTimeout(() => {
      list.classList.add('visible');
      button.classList.add('down');
    }, 50);
  } else {
    setTimeout(() => {
      list.classList.remove('visible');
      button.classList.remove('down');
    }, 50);
  }
};