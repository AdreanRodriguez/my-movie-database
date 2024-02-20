// import { loadOmdbMovies } from "./fetch.js";
// console.log(`hej`);
// const apiKey = `2799d50` // Min api nyckel

// searchBtnRef.addEventListener(`click`, async (event) => {
//     event.preventDefault();

//     const inputField = await loadOmdbMovies();
//     let searchInputRef = document.querySelector(`#searchInput`);
//     const resultOfMovie = inputField.filter(movie => movie.Title.includes(searchInputRef.value));

//     for (let i = 0; i < resultOfMovie.length; i++) {

//         const foundMovie = await loadOmdbMovies(resultOfMovie[i].Search.Title);

//         let divRef = document.createElement(`div`);
//         divRef.classList.add(`popular__movie-poster`);
//         divRef.dataset.id = movie.imdbid;
//         popularCardContainerRef.appendChild(divRef);

//         let imgElem = document.createElement(`img`);
//         imgElem.src = movie.poster;
//         imgElem.alt = movie.title;
//         divRef.appendChild(imgElem);

//         let pElem = document.createElement(`p`);
//         pElem.classList.add(`popular__movie-title`);
//         pElem.textContent = movie.title;
//         divRef.appendChild(pElem);

//         let starElem = document.createElement(`img`);
//         starElem.classList.add(`popular__star`);
//         starElem.src = `./res/star.png`;

//         starElem.addEventListener(`mouseover`, () => {
//             starElem.src = `./res/star-filled.png`;
//         });

//         starElem.addEventListener(`mouseout`, () => {
//             starElem.src = `./res/star.png`;
//         });
//         divRef.appendChild(starElem);
//     };
// });


// Gör en funktion som renderar ut sökresultatet och töm inner html för 20 filmerna.