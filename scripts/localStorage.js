
// Lägga till film i favoriter
const addToFavorites = async (movieInfo) => {

    // Hämta favoritlistan från localStorage eller skapa en ny om den inte finns
    // JSON.parse omvandlar denna sträng till ett JavaScript-objekt eller en tom array istället för null
    let favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];

    // Lägg till filmen till favoritlistan
    favorites.push(movieInfo)

    // Spara den uppdaterade favoritlistan till localStorage
    localStorage.setItem(`favorites`, JSON.stringify(favorites));
};
// Ta bort film i favoriter
const removeFromFavorites = async (movieID) => {

    // Hämta favoritlistan från localStorage eller skapa en ny om den inte finns
    let favorites = JSON.parse(localStorage.getItem(`favorites`)) || [];

    // Filtrera bort filmen med matchande ID
    favorites = favorites.filter(movie => movie.id !== movieID);

    // Spara den uppdaterande favoritlistan till localStorage
    localStorage.setItem(`favorites`, JSON.stringify(favorites));
};

export { addToFavorites, removeFromFavorites };