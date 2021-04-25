import Card from '../templates/card.hbs';
import ApiService from '../js/apiService.js';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core/dist/PNotify.js';

import * as basicLightbox from 'basiclightbox';
const instance = basicLightbox.create(`<img src="" width="800" height="600">`);


const apiService = new ApiService();
const serchFormEl = document.querySelector('.search-form');
const searchBtnEl = document.querySelector('button.search-btn');
const picturesListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('button.load-btn');

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  };


const onSearch = (e) => {
    e.preventDefault();
    clearPicturesCardsMarkup();

    apiService.query = e.currentTarget.elements.query.value.trim();
    apiService.resetPage();
    apiService.fetchImages()
    .then((data) => {
        if (data.length === 0) {
            error({
                title: 'Not found',
                text: 'Please enter a more specific query',
                addClass: 'error',
                delay: 3000,
              });
        } else if(apiService.query.trim() === '') {
            error({
                title: 'Not found',
                text: 'Please enter a more specific query',
                addClass: 'error',
                delay: 3000,
              });
        } else {
            appendPicturesCardsMarkup(data);
            loadMoreBtnEl.classList.remove('hide');
        }
    });

}

async function onLoadMore(e) {
    const result = await apiService.fetchImages();
    appendPicturesCardsMarkup(result);
  
    window.scrollTo({
      top: picturesListEl.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
};

const onLightBoxCreate = (e) => { 
    e.preventDefault();           
    if(!e.target.classList.contains('picture')) {
        return;
    } else {
    instance.show();
    const lightBoxEl = instance.element();
    lightBoxEl.querySelector('img').src = `${e.target.dataset.source}`;
    }
}

const appendPicturesCardsMarkup = (hits) => {
    picturesListEl.insertAdjacentHTML('beforeend', Card(hits));
}

const clearPicturesCardsMarkup = () => {
    picturesListEl.innerHTML = '';
    loadMoreBtnEl.classList.add('hide');

}

serchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);
picturesListEl.addEventListener('click', onLightBoxCreate);





