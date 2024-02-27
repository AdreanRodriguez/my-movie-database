'use strict';
import { renderSearchListener } from "./search.js";
import { addToFavorites, removeFromFavorites } from "./localStorage.js";
import { loadTwentyMovies, loadOmdbMovies, loadSpecifiedDetails } from "./fetch.js";
import { setupFavorites } from "./favorites.js";


window.addEventListener('load', () => {
    console.log('load');

    //Förslagsvis anropar ni era funktioner som skall sätta lyssnare, rendera objekt osv. härifrån

    setupCarousel();
    loadOmdbMovies();
    renderTwentyMovies();
    fiveTrailers();
    setupFavorites();
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
};



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
    let favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];

    for (let i = 0; i < twentyMovies.length; i++) {

        const movie = twentyMovies[i];

        let articleRef = document.createElement(`article`);
        articleRef.classList.add(`popular__movie-poster`);
        articleRef.dataset.id = movie.imdbid;
        popularCardContainerRef.appendChild(articleRef);


        let imgElem = document.createElement(`img`);
        imgElem.src = movie.poster;
        imgElem.alt = `Movie poster of ${movie.title}`;
        articleRef.appendChild(imgElem)

        let pElem = document.createElement(`p`);
        pElem.classList.add(`popular__movie-title`);
        pElem.textContent = movie.title;
        articleRef.appendChild(pElem);


        let starElem = document.createElement(`img`);
        starElem.classList.add(`popular__star`);
        starElem.src = `./res/star.png`;
        starElem.alt = `Hollow star icon for favorites`



        favorites.forEach(movie => {

            if (articleRef.dataset.id === movie.id) {
                console.log(`HejHEJEHEJ`);
                starElem.src = `./res/star-filled.png`;
                starElem.alt = `Filled star icon for favorites`;
            };
        });




        let isFilledStar = false;
        starElem.addEventListener(`click`, async () => {
            if (!isFilledStar) {
                console.log(`When clicked, star is filled`);
                starElem.src = `./res/star-filled.png`
                starElem.alt = `Filled star icon for favorites`;
                starElem.dataset.id = movie.id

                const movieId = articleRef.dataset.id;
                const movieTitle = pElem.textContent;
                const moviePoster = imgElem.src;

                const movieInfo = {
                    id: movieId,
                    title: movieTitle,
                    poster: moviePoster
                };

                addToFavorites(movieInfo);

                console.log(`localStorage Clicked`);

                isFilledStar = true;
            } else {
                console.log(`When click, star is hollow`);
                starElem.src = `./res/star.png`
                isFilledStar = false;
                starElem.alt = `Hollow star icon for favorites`
                removeFromFavorites(articleRef.dataset.id)
            }
        });
        articleRef.appendChild(starElem);



        articleRef.addEventListener(`click`, async (event) => {

            const details = await loadSpecifiedDetails(event.currentTarget.dataset.id);
            console.log(`här är våra detaljer`, details);

            const popularCardContainerRef = document.querySelector(`#popularCardContainer`);
            popularCardContainerRef.innerHTML = ``;


            const movieSection = document.createElement(`section`);
            movieSection.classList.add(`clicked-movie`);
            popularCardContainerRef.appendChild(movieSection);


            const favoriteH2 = document.querySelector(`.popular__title`);
            favoriteH2.textContent = `Movie information`

            const sectionFour = document.querySelector(`section:nth-child(4)`);
            sectionFour.innerHTML = ``


            // Skapa och visa detaljer om den valda filmen
            const articleMovie = document.createElement(`article`);
            articleMovie.classList.add(`clicked-movie__article-movie`);
            articleMovie.dataset.id = movie.id
            movieSection.appendChild(articleMovie);

            const posterElem = document.createElement(`img`);
            posterElem.src = movie.poster;
            posterElem.alt = movie.title;
            articleMovie.appendChild(posterElem);

            const sectionInfo = document.createElement(`section`);
            sectionInfo.classList.add(`clicked-movie__info-section`);
            movieSection.appendChild(sectionInfo);


            const titleElem = document.createElement(`p`);
            titleElem.classList.add(`clicked-movie__title`);
            titleElem.textContent = details.Title;
            sectionInfo.appendChild(titleElem);


            const yearRef = document.createElement(`p`);
            yearRef.classList.add(`clicked-movie__year`);
            yearRef.textContent = `Year: ${details.Year}`;
            sectionInfo.appendChild(yearRef);

            const genreRef = document.createElement(`p`);
            genreRef.classList.add(`clicked-movie__genre`);
            genreRef.textContent = `Genre: ${details.Genre}`;
            sectionInfo.appendChild(genreRef);


            const infoText = document.createElement(`p`);
            infoText.classList.add(`clicked-movie__info`);
            infoText.textContent = `${details.Plot}`;
            sectionInfo.appendChild(infoText);


            const imdbRatingRef = document.createElement(`p`);
            imdbRatingRef.classList.add(`clicked-movie__rating`);
            imdbRatingRef.textContent = `Imdb rating: ${details.imdbRating} / 10`;
            sectionInfo.appendChild(imdbRatingRef);

            const runTimeRef = document.createElement(`p`);
            runTimeRef.classList.add(`clicked-movie__runtime`);
            runTimeRef.textContent = `Runtime: ${details.Runtime}`;
            sectionInfo.appendChild(runTimeRef);


            const divDown = document.createElement(`div`);
            divDown.classList.add(`clicked-movie__div-down`);
            sectionInfo.appendChild(divDown);


            const actorsRef = document.createElement(`p`)
            actorsRef.classList.add(`clicked-movie__actor`);
            actorsRef.textContent = `Actor: ${details.Actors}`;
            divDown.appendChild(actorsRef);


            const directorRef = document.createElement(`p`);
            directorRef.classList.add(`clicked-movie__director`);
            directorRef.textContent = `Director: ${details.Director}`;
            divDown.appendChild(directorRef);


            const writerRef = document.createElement(`p`);
            writerRef.classList.add(`clicked-movie__writer`);
            writerRef.textContent = `Writer: ${details.Writer}`;
            divDown.appendChild(writerRef);


            console.log(`clicked poster`, posterElem);
        });
    };
};



// Rendera ut "korten" när man sökt efter film.
const searchBtnRef = document.querySelector(`#searchBtn`)
searchBtnRef.addEventListener(`click`, async (event) => {

    event.preventDefault();
    renderSearchListener();

    let favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];
    console.log(`SÖÖÖK`, favorites);

    const inputField = await loadOmdbMovies();


    let ulRef = document.querySelector(`#resultsList`);
    ulRef.classList.remove(`clicked-movie`);
    ulRef.innerHTML = ``;


    const favoritesContainerRef = document.querySelector(`#favoritesContainer`);
    favoritesContainerRef.classList.add(`d-none`)


    for (let i = 0; i < inputField.length; i++) {

        const movie = inputField[i];
        console.log(movie);

        const popularCardContainerRef = document.querySelector(`section:nth-child(3)`);
        popularCardContainerRef.classList.add(`section`);


        let articleRef = document.createElement(`article`);
        articleRef.classList.add(`popular__movie-poster`);
        articleRef.dataset.id = movie.imdbID;

        ulRef.appendChild(articleRef);

        const posterElem = document.createElement(`img`);
        posterElem.src = movie.Poster;
        posterElem.alt = movie.Title;

        articleRef.appendChild(posterElem);


        let pElem = document.createElement(`p`);
        pElem.classList.add(`popular__movie-title`);
        pElem.textContent = movie.Title;
        articleRef.appendChild(pElem);

        const searchInputRef = document.querySelector(`#searchInput`);
        const resultTitle = document.querySelector(`.results__title`);
        resultTitle.textContent = `Top 10 search result for: ${searchInputRef.value}`;


        let starElem = document.createElement(`img`);
        starElem.classList.add(`popular__star`);
        starElem.alt = `Hollow star icon for favorites`
        starElem.src = `./res/star.png`;


        favorites.forEach(movie => {
            if (articleRef.dataset.id === movie.id) {
                starElem.src = `./res/star-filled.png`;
                starElem.alt = `Filled star icon for favorites`;
            }
        })



        let isFilledStar = false;
        starElem.addEventListener(`click`, async () => {
            if (!isFilledStar) {
                console.log(`When clicked, star is filled`);
                starElem.src = `./res/star-filled.png`
                starElem.alt = `Filled star icon for favorites`

                const movieId = articleRef.dataset.id;
                const movieTitle = pElem.textContent;
                const moviePoster = posterElem.src;

                const movieInfo = {
                    id: movieId,
                    title: movieTitle,
                    poster: moviePoster
                };

                addToFavorites(movieInfo);

                console.log(`localStorage Clicked`);

                isFilledStar = true;
            } else {
                console.log(`When click, star is hollow`);
                starElem.src = `./res/star.png`
                starElem.alt = `Hollow star icon for favorites`
                isFilledStar = false;
                removeFromFavorites(articleRef.dataset.id)
            }
        });

        articleRef.appendChild(starElem);

        if (movie.Poster === "N/A") {
            posterElem.src = `./res/no_image_available.jpeg`;
            posterElem.classList.add(`no-img`);
        } else {
            posterElem.src = movie.Poster;
        };

        posterElem.dataset.id = movie.imdbID


        posterElem.addEventListener(`click`, async (event) => {
            console.log(event.currentTarget);


            let ulRef = document.querySelector(`#resultsList`);
            ulRef.classList.add(`clicked-movie`)
            ulRef.innerHTML = ``

            console.log(event.target.dataset.id);
            const details = await loadSpecifiedDetails(event.currentTarget.dataset.id);

            // Skapa och visa detaljer om den valda filmen
            const articleMovie = document.createElement(`article`);
            articleMovie.classList.add(`clicked-movie__movie-poster`);
            articleMovie.dataset.id = movie.id;
            ulRef.appendChild(articleMovie);

            const posterElem = document.createElement(`img`);
            posterElem.src = movie.Poster;
            posterElem.alt = movie.Title;
            articleMovie.appendChild(posterElem);

            const sectionInfo = document.createElement(`section`);
            sectionInfo.classList.add(`clicked-movie__info-section`);
            ulRef.appendChild(sectionInfo);


            const titleElem = document.createElement(`p`);
            titleElem.classList.add(`clicked-movie__title`);
            titleElem.textContent = details.Title;
            sectionInfo.appendChild(titleElem);


            const yearRef = document.createElement(`p`)
            yearRef.classList.add(`clicked-movie__year`);
            yearRef.textContent = `Year: ${details.Year}`;
            sectionInfo.appendChild(yearRef);

            const genreRef = document.createElement(`p`);
            genreRef.classList.add(`clicked-movie__genre`);
            genreRef.textContent = `Genre: ${details.Genre}`;
            sectionInfo.appendChild(genreRef);


            const infoText = document.createElement(`p`);
            infoText.classList.add(`clicked-movie__info`);
            infoText.textContent = `${details.Plot}`;
            sectionInfo.appendChild(infoText);


            const imdbRatingRef = document.createElement(`p`);
            imdbRatingRef.classList.add(`clicked-movie__rating`);
            imdbRatingRef.textContent = `Imdb rating: ${details.imdbRating} / 10`;
            sectionInfo.appendChild(imdbRatingRef);


            const runTimeRef = document.createElement(`p`);
            runTimeRef.classList.add(`clicked-movie__runtime`);
            runTimeRef.textContent = `Runtime: ${details.Runtime}`;
            sectionInfo.appendChild(runTimeRef);


            const divDown = document.createElement(`div`);
            divDown.classList.add(`clicked-movie__div-down`);
            sectionInfo.appendChild(divDown);


            const actorsRef = document.createElement(`p`);
            actorsRef.classList.add(`clicked-movie__actor`);
            actorsRef.textContent = `Actor: ${details.Actors}`;
            sectionInfo.appendChild(actorsRef);

            const directorRef = document.createElement(`p`);
            directorRef.classList.add(`clicked-movie__director`);
            directorRef.textContent = `Director: ${details.Director}`;
            sectionInfo.appendChild(directorRef);


            const writerRef = document.createElement(`p`);
            writerRef.classList.add(`clicked-movie__writer`);
            writerRef.textContent = `Writer: ${details.Writer}`;
            sectionInfo.appendChild(writerRef);

        })
    };
});


export { loadSpecifiedDetails }