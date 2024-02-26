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
        const searchInputRef = document.querySelector(`#searchInput`)
        searchInputRef.value = ``

        // Tar bort klassen d-none för att kunna visa innehållet i konteinern
        const favoritesContainerRef = document.querySelector(`#favoritesContainer`);
        favoritesContainerRef.classList.remove(`d-none`);


        // Tömmer section nr 4
        const sectionFour = document.querySelector(`section:nth-child(4)`);
        sectionFour.innerHTML = ``;

        // Tömmer section nr 5
        const sectionFive = document.querySelector(`section:nth-child(5)`);
        sectionFive.innerHTML = ``;

        // Kallar på #favorites för att kunna lägga mina filmer i den innuti forEach loopen
        const divRef = document.querySelector(`#favorites`);
        divRef.innerHTML = ``;

        const movies = await loadOmdbMovies();




        // Hämta favoritlistan från localStorage
        const favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];


        console.log('Favoriter i localStorage:', favorites);

        favorites.forEach(movie => {

            console.log('Nuvarande filmobjekt:', movie);

            const movieElem = document.createElement(`article`);
            movieElem.classList.add(`popular__movie-poster`);
            movieElem.dataset.id = movie.id;
            divRef.appendChild(movieElem);
            divRef.appendChild(movieElem);


            const posterElem = document.createElement(`img`);
            posterElem.src = movie.poster;
            posterElem.alt = movie.title;
            movieElem.appendChild(posterElem);
            movieElem.appendChild(posterElem)

            const titleElem = document.createElement(`p`);
            titleElem.classList.add(`popular__movie-title`);
            titleElem.textContent = movie.title;
            movieElem.appendChild(titleElem);

            let starElem = document.createElement(`img`);
            starElem.classList.add(`popular__star`);
            starElem.id = `popularStar`;
            starElem.dataset.id = movie.id
            starElem.src = `./res/star-filled.png`;
            starElem.alt = `Filled star icon for favorites`;
            movieElem.appendChild(starElem);




            posterElem.addEventListener(`click`, async () => {

                const details = await loadSpecifiedDetails(movie.id);
                console.log(`här är våra detaljer`, details);

                divRef.innerHTML = ``;
                divRef.classList.add(`clicked-movie`);

                const favoriteH2 = document.querySelector(`.favorites-container__title`);
                favoriteH2.textContent = `Movie information`

            
                // Skapa och visa detaljer om den valda filmen
                const articleMovie = document.createElement(`article`);
                articleMovie.classList.add(`article-movie`);
                articleMovie.dataset.id = movie.id
                divRef.appendChild(articleMovie);

                const posterElem = document.createElement(`img`);
                posterElem.src = movie.poster;
                posterElem.alt = movie.title;
                articleMovie.appendChild(posterElem);

                const sectionInfo = document.createElement(`section`);
                sectionInfo.classList.add(`movie-section`);
                divRef.appendChild(sectionInfo)

                const imdbRatingRef = document.createElement(`p`);
                imdbRatingRef.classList.add(`movie-rating`);
                imdbRatingRef.textContent = `Imdb rating: ${details.imdbRating} / 10`
                sectionInfo.appendChild(imdbRatingRef)

                const titleElem = document.createElement(`p`);
                titleElem.classList.add(`movie-title`);
                titleElem.textContent = details.Title;
                divRef.appendChild(titleElem);

                const infoText = document.createElement(`p`);
                infoText.classList.add(`movie-info`);
                infoText.textContent = `${details.Plot}`
                sectionInfo.appendChild(infoText)

                const yearRef = document.createElement(`p`)
                yearRef.classList.add(`movie-year`);
                yearRef.textContent = `Year: ${details.Year}`
                sectionInfo.appendChild(yearRef)

                const actorsRef = document.createElement(`p`)
                actorsRef.classList.add(`movie-actor`);
                actorsRef.textContent = `Actor: ${details.Actors}`
                sectionInfo.appendChild(actorsRef);


                const genreRef = document.createElement(`p`);
                genreRef.classList.add(`movie-genre`);
                genreRef.textContent = `Genre: ${details.Genre}`
                sectionInfo.appendChild(genreRef)

                const writerRef = document.createElement(`p`);
                writerRef.classList.add(`movie-writer`);
                writerRef.textContent = `Writer: ${details.Writer}`
                sectionInfo.appendChild(writerRef)

                const directorRef = document.createElement(`p`);
                directorRef.classList.add(`movie-director`);
                directorRef.textContent = `Director: ${details.Director}`
                sectionInfo.appendChild(directorRef)

                const runTimeRef = document.createElement(`p`);
                runTimeRef.classList.add(`movie-runtime`);
                runTimeRef.textContent = `Runtime: ${details.Runtime}`
                sectionInfo.appendChild(runTimeRef)


                console.log(`clicked poster`, posterElem);
            });




            starElem.addEventListener(`click`, async () => {

                console.log(`When clicked, star is filled`);
                starElem.src = `./res/star.png`;
                starElem.alt = `Hollow star icon for favorites`;
                starElem.dataset.id = movie.id

                const movieId = movie.id;
                const movieImdbID = movie.imdbID
                const movieTitle = titleElem.textContent;
                const moviePoster = posterElem.src;


                const movieInfo = {
                    id: movieId,
                    imdbID: movieImdbID,
                    title: movieTitle,
                    poster: moviePoster
                };


                if (movieElem === movie.id) {
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



            })
            console.log(`Längst ner i favorites`);
        })
    });
}

export { setupFavorites };
