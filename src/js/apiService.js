const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21278728-75c92b248ac1d6dd7323efa86';
//const currentPage = 1;
//const searchQuery = '';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages () {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=9&key=${API_KEY}`)
        .then(data => data.json())
        .then(data => {
            this.incrementPage();
            return data.hits;
        })
    }

    incrementPage () {
        this.page += 1;
    }

    resetPage () {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}