import { addToFavorites, removeFromFavorites } from "./localStorage.js";





const setupFavorites = async () => {

    // // Gömmer section nr 3
    const sectionFour = document.querySelector(`section:nth-child(3)`);
    sectionFour.classList.add(`d-none`)

    const favBtnRef = document.querySelector(`#favBtn`);
    favBtnRef.addEventListener(`click`, async () => {

        // Tar bort klassen d-none för att kunna visa innehållet i konteinern
        const favoritesContainerRef = document.querySelector(`#favoritesContainer`);
        favoritesContainerRef.classList.remove(`d-none`)



        // Tömmer section nr 4
        const sectionFour = document.querySelector(`section:nth-child(4)`);
        sectionFour.innerHTML = ``;

        // Tömmer section nr 5
        const sectionFive = document.querySelector(`section:nth-child(5)`);
        sectionFive.innerHTML = ``;

        // Kallar på #favorites för att kunna lägga mina filmer i den innuti forEach loopen
        const divRef = document.querySelector(`#favorites`);

        // Gjort en section för att lägga in ett p element och evt en knapp.
        const newSection = document.createElement(`section`);
        newSection.classList.add(`favorites-container__section`);
        favoritesContainerRef.appendChild(newSection);
        favoritesContainerRef.insertBefore(newSection, favoritesContainerRef.firstChild);

        // Gör ett p element och lägger in det i sectionen som skapades över.
        const hThree = document.createElement(`p`);
        hThree.classList.add(`favorites-container__section-heading`);
        hThree.textContent = `Your favorites`
        newSection.appendChild(hThree)

        // Gör en knapp för att kunna använda till att ta bort alla favoriter.
        const clearAllFavBtn = document.createElement(`button`);
        clearAllFavBtn.classList.add(`clear-btn`);
        clearAllFavBtn.id = `clearBtn`;
        clearAllFavBtn.textContent = `Delete all favorites`;
        newSection.appendChild(clearAllFavBtn);




        // Hämta favoritlistan från localStorage
        const favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];

        console.log('Favoriter i localStorage:', favorites);

        favorites.forEach(movie => {

            console.log('Nuvarande filmobjekt:', movie);

            const movieElem = document.createElement(`article`);
            movieElem.classList.add(`popular__movie-poster`);
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
            starElem.id = `popularStar`;
            starElem.src = `./res/star-filled.png`;
            starElem.alt = `Filled star icon for favorites`;
            movieElem.appendChild(starElem);


            // clearAllFavBtn.addEventListener(`click`, () => {
            //     console.log(`Bottom clicked`);
            //     const movieElem = document.createElement(`article`);
            //     movieElem.remove();
            //     const movieId = movie.id;
            //     removeFromFavorites(movieId);
            //     localStorage.setItem(`favorites`, JSON.stringify(favorites));

            // });


            starElem.addEventListener(`click`, async () => {
                
                console.log(`When clicked, star is filled`);
                starElem.src = `./res/star.png`;
                starElem.alt = `Hollow star icon for favorites`;

                const movieId = movie.id;
                const movieTitle = titleElem.textContent;
                const moviePoster = posterElem.src;

                const movieInfo = {
                    id: movieId,
                    title: movieTitle,
                    poster: moviePoster
                };

                // Ta bort filmen i från localStorage
                removeFromFavorites(movieId);

                // Ta bort filmen i från DOM
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
                // Ta bort filmen från DOM
                movieElem.remove();
                

            })
            console.log(`Längst ner i favorites`);
        })
    });
}


export { setupFavorites };
