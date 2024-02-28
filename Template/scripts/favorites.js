import { removeFromFavorites } from "./localStorage.js";
import { loadOmdbMovies, loadSpecifiedDetails } from "./fetch.js";





const setupFavorites = async () => {

    // // Gömmer section nr 3
    const sectionThree = document.querySelector(`section:nth-child(3)`);
    sectionThree.classList.add(`d-none`)





    const favBtnRef = document.querySelector(`#favBtn`);
    favBtnRef.addEventListener(`click`, async (event) => {
        event.preventDefault();


        // Tömmer input.
        const searchInputRef = document.querySelector(`#searchInput`);
        searchInputRef.value = ``;

        // Tar bort klassen d-none för att kunna visa innehållet i konteinern
        const favoritesContainerRef = document.querySelector(`#favoritesContainer`);
        favoritesContainerRef.classList.remove(`d-none`);

        // Tömmer section nr 4
        const sectionFour = document.querySelector(`section:nth-child(4)`);
        sectionFour.innerHTML = ``;

        // Tömmer section nr 5
        const sectionFive = document.querySelector(`section:nth-child(5)`);
        sectionFive.innerHTML = ``;

        // Tömmer favoriter så det inte blir dubletter
        const divRef = document.querySelector(`#favorites`);
        // Måste lägga till klassen för den försvinner på rad 98
        divRef.classList.add(`favorites`);
        divRef.innerHTML = ``;

        // Kollar om section inte är null
        const sectionInfo = document.querySelector(`.section`);
        if (sectionInfo !== null) {
            sectionInfo.classList.add(`d-none`);
        };


        // Hämta favoritlistan från localStorage
        const favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];


        favorites.forEach(movie => {

            const divRef = document.querySelector(`#favorites`);

            const movieElem = document.createElement(`article`);
            movieElem.classList.add(`favorite__movie-poster`);
            movieElem.dataset.id = movie.id;

            divRef.appendChild(movieElem);

            const posterElem = document.createElement(`img`);
            posterElem.src = movie.poster;
            posterElem.alt = movie.title;
            movieElem.appendChild(posterElem);

            const titleElem = document.createElement(`p`);
            titleElem.classList.add(`popular__movie-title`);
            titleElem.textContent = movie.title;
            movieElem.appendChild(titleElem);

            let starElem = document.createElement(`img`);
            starElem.classList.add(`popular__star`);
            starElem.dataset.id = movie.id;
            starElem.src = `./res/star-filled.png`;
            starElem.alt = `Filled star icon for favorites`;
            movieElem.appendChild(starElem);


            posterElem.addEventListener(`click`, async () => {

                const details = await loadSpecifiedDetails(movie.id);

                const divRef = document.querySelector(`.favorites`);
                divRef.classList.remove(`favorites`);
                
                divRef.classList.add(`favorites-container__clicked-movie`)
                divRef.innerHTML = ``;

                const movieSection = document.createElement(`section`);
                // För att kunna göra det responsivt så har jag en annan klass för att inte förstöra för allt annat.
                movieSection.classList.add(`favorites__clicked-movie`);

                divRef.appendChild(movieSection);


                // const sectionRef = document.querySelector(`section:nth-child(3)`);
                // sectionRef.innerHTML = ``

                const favoriteH2 = document.querySelector(`.favorites-container__title`);
                favoriteH2.textContent = `Movie information`;


                // Skapa och visa detaljer om den valda filmen
                const articleMovie = document.createElement(`article`);
                articleMovie.classList.add(`favorites__clicked-movie__article-movie`);
                articleMovie.dataset.id = movie.id;
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

            });




            starElem.addEventListener(`click`, async () => {

                starElem.src = `./res/star.png`;
                starElem.alt = `Hollow star icon for favorites`;
                starElem.dataset.id = movie.id

                const movieId = movie.id;
                const movieImdbID = movie.imdbID;
                const movieTitle = titleElem.textContent;
                const moviePoster = posterElem.src;


                const movieInfo = {
                    id: movieId,
                    imdbID: movieImdbID,
                    title: movieTitle,
                    poster: moviePoster
                };


                if (movieElem.dataset.id === movie.id) {
                    starElem.src = `./res/star-filled.png`;
                    starElem.alt = `Filled star icon for favorites`;
                }

                // Ta bort filmen i från localStorage
                removeFromFavorites(movieId);

                // Ta bort filmen från DOM
                movieElem.remove();

                console.log(`localStorage Clicked`);

                // Kontrollera om filmen redan finns i favoriter
                const favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];

                const movieIndex = favorites.findIndex(favorite => favorite.id === movieInfo);

                if (movieIndex !== -1) {
                    removeFromFavorites(movieId); // Ta bort filmen från favoriter
                    favorites.splice(movieIndex, 1); // Ta bort filmen från den lokala arrayen
                }

                // Uppdatera localStorage efter att en film tagits bort från favoriter
                localStorage.setItem(`favorites`, JSON.stringify(favorites));



            });
        });
    });
};

export { setupFavorites };
