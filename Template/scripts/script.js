'use strict';
import { loadTwentyMovies, loadOmdbMovies } from "./fetch.js";
// import {  } from "./search.js";
window.addEventListener('load', () => {
    console.log('load');
    //Förslagsvis anropar ni era funktioner som skall sätta lyssnare, rendera objekt osv. härifrån
    setupCarousel();
    renderTwentyMovies();
    loadOmdbMovies();
    fiveTrailers();
});



//Denna funktion skapar funktionalitet för karusellen
function setupCarousel() {
    console.log('carousel');
    const buttons = document.querySelectorAll('[data-carousel-btn]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
            const slides = btn.closest('[data-carousel]').querySelector('[data-slides]');
            const activeSlide = slides.querySelector('[data-active]');
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }

            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        });
    });
}



// Slumpa ut 5 olia trailers
const fiveTrailers = async () => {

    const twentyMovies = await loadTwentyMovies();
    const ulRef = document.querySelector(`[data-slides]`);
    let activeIndex = Math.floor(Math.random() * 5);

    for (let i = 0; i < 5; i++) {

        const liRef = document.createElement(`li`)
        liRef.classList.add(`carousel__slide`)

        const randomIndex = Math.floor(Math.random() * twentyMovies.length);
        const randomMovie = twentyMovies[randomIndex];

        const iframe = document.createElement(`iframe`);
        iframe.src = randomMovie.trailer_link;
        iframe.width = 420;
        iframe.height = 315;
        iframe.frameBorder = 0;

        liRef.appendChild(iframe);
        ulRef.appendChild(liRef);

        if (i === activeIndex) {
            liRef.setAttribute(`data-active`, ``);
        };
    };
};



// Rendera ut 20 filmer i popular__card-container
const renderTwentyMovies = async () => {

    const twentyMovies = await loadTwentyMovies();
    const popularCardContainerRef = document.querySelector(`#popularCardContainer`);
    console.log(twentyMovies);
    for (let i = 0; i < twentyMovies.length; i++) {

        const movie = twentyMovies[i];

        let articleRef = document.createElement(`article`);
        articleRef.classList.add(`popular__movie-poster`);
        articleRef.dataset.id = movie.imdbid;
        popularCardContainerRef.appendChild(articleRef);

        let imgElem = document.createElement(`img`);
        imgElem.src = movie.poster;
        imgElem.alt = `Movie poster of ${movie.title}`;
        articleRef.appendChild(imgElem);

        let pElem = document.createElement(`p`);
        pElem.classList.add(`popular__movie-title`);
        pElem.textContent = movie.title;
        articleRef.appendChild(pElem);

        let starElem = document.createElement(`img`);
        starElem.classList.add(`popular__star`);
        starElem.src = `./res/star.png`;
        starElem.alt = `Hollow star icon for favorites`

        starElem.addEventListener(`mouseover`, () => {
            starElem.src = `./res/star-filled.png`;
            starElem.alt = `Filled star icon for favorites`
        });

        starElem.addEventListener(`mouseout`, () => {
            starElem.src = `./res/star.png`;
        });
        articleRef.appendChild(starElem);
    };
};


const renderSearchList = async () => {

    const resultWrapper = document.querySelector(`section:nth-child(3)`);
    resultWrapper.classList.remove(`d-none`);

    const contentWrapperRef = document.querySelector(`section:nth-child(4)`);
    contentWrapperRef.innerHTML = ``
    // classList.add(`d-none`)

    const popularCardContainerRef = document.querySelector(`section:nth-child(5)`);
    popularCardContainerRef.innerHTML = ``
    // popularCardContainerRef.classList.add(`d-none`);

    // const renderNew = document.querySelector(`section:nth-child(3)`)
    // renderNew.innerHTML = ``;

    // const resultTitle = document.querySelector(`.results__title`)
    // let searchInputRef = document.querySelector(`#searchInput`);

    // resultTitle.textContent = `Search result for ${searchInputRef}`;
    // console.log(searchInputRef.value);

    // const popularTitleRef = document.querySelector(`section div .popular__title`);
    // popularTitleRef.textContent = `Searchresult`

}










const searchBtnRef = document.querySelector(`#searchBtn`)
searchBtnRef.addEventListener(`click`, async (event) => {

    event.preventDefault();
    renderSearchList();


    const inputField = await loadOmdbMovies();
    console.log(inputField);

    console.log(`FOUND ME!`);

    // popularCardContainerRef.innerHTML = ``

    for (let i = 0; i < inputField.length; i++) {

        const movie = inputField[i];
        console.log(movie);

        const popularCardContainerRef = document.querySelector(`section:nth-child(3)`);
        popularCardContainerRef.classList.add(`section`)


        let articleRef = document.createElement(`article`);
        articleRef.classList.add(`popular__movie-poster`);
        articleRef.dataset.id = movie.imdbID;

        let ulRef = document.querySelector(`#resultsList`);
        ulRef.appendChild(articleRef)

        let imgElem = document.createElement(`img`);
        imgElem.src = movie.Poster;
        imgElem.alt = movie.Title;
        articleRef.appendChild(imgElem);

        let pElem = document.createElement(`p`);
        pElem.classList.add(`popular__movie-title`);
        pElem.textContent = movie.Title;
        articleRef.appendChild(pElem);

        const searchInputRef = document.querySelector(`#searchInput`)
        const resultTitle = document.querySelector(`.results__title`)
        resultTitle.textContent = `Search result for: ${searchInputRef.value}`;

        let starElem = document.createElement(`img`);
        starElem.classList.add(`popular__star`);
        starElem.src = `./res/star.png`;
        starElem.alt = `Hollow star icon for favorites`

        starElem.addEventListener(`mouseover`, () => {
            starElem.src = `./res/star-filled.png`;
            starElem.alt = `Filled star icon for favorites`
        });

        starElem.addEventListener(`mouseout`, () => {
            starElem.src = `./res/star.png`;
        });
        articleRef.appendChild(starElem);
    };
});