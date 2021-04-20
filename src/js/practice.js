import cards from '../data/gallery-items';
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('img.lightbox__image');
const galleryListEl = document.querySelector('.js-gallery');
const lightboxButtonEl = document.querySelector('button[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

let activeIndex = 0;

const createGalleryMarkup = images => {
    const markup = images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    });
    return markup;
};
const galleryMarkup = createGalleryMarkup(cards);
const galleryList = document.querySelector('.js-gallery');

galleryList.insertAdjacentHTML('beforeend', galleryMarkup.join(''));



const onOpenModal = evt => {
    if (evt.target.localName !== 'img') {
        return
    }
    for (let i = 0, i < galleryMarkup.length, i++) {
        if (galleryMarkup[i].includes(evt.target.src)) {
            activeIndex = i;
        }
    }
    evt.preventDefault();
    lightboxEl.classList.add('is-open');
    lightboxImageEl.src = evt.target.dataset.source;
    lightboxImageEl.alt = evt.target.alt;
}

const onModalClose = () => {
    lightboxEl.classList.remove('is-open');
    lightboxImageEl.removeAttribute('src');
    lightboxImageEl.removeAttribute('alt');
}

const onLeftArrowClick = (evt) => {
    if (evt.key === 'ArrowLeft') {
        if (activeIndex > 0) {
            activeIndex -= 1;
            lightboxImageEl.src = cards[activeIndex - 1].original;
        }        
    }
}

const onRightArrowClick = (evt) => {
    if (evt.key === 'ArrowLeft') {
        if (activeIndex < cards.length - 1) {
            activeIndex += 1;
            lightboxImageEl.src = cards[activeIndex + 1].original;
        }        
    }
}

window.addEventListener('keydown', onLeftArrowClick)
window.addEventListener('keydown', onRightArrowClick)

window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        onModalClose();
    }
});

lightboxButtonEl.onclick = onModalClose;
lightboxOverlayEl.onclick = onModalClose;
galleryListEl.addEventListener('click', onOpenModal);


