import { renderSearchListener } from "./search.js";


const starIcon = async () => {

}


const setupFavorites = async () => {

    const favBtnRef = document.querySelector(`#favBtn`);
    favBtnRef.addEventListener(`click`, async () => {

        const favoritesContainerRef = document.querySelector(`#favoritesContainer`);
        favoritesContainerRef.classList.remove(`d-none`)

        const sectionThree = document.querySelector(`section:nth-child(3)`);
        sectionThree.innerHTML = ``;

        const sectionFour = document.querySelector(`section:nth-child(4)`);
        sectionFour.innerHTML = ``;

        const sectionFive = document.querySelector(`section:nth-child(5)`);
        sectionFive.innerHTML = ``;


        
        console.log(`Längst ner i favorites`);
    })
};

export { setupFavorites, starIcon };

// Göra en funktion när man klickar på stjärnorna
// Så ska de först vara ifyllda när man klickat
// Sparas sedan i setupFavorites funktionen som det görs
// kort för varje klickad favorit.