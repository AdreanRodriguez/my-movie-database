const apiKey = `2799d50` // Min api nyckel
const searchInputRef = document.querySelector(`#searchInput`)


    const loadTwentyMovies = async () => {
    const response = await fetch(`https://santosnr6.github.io/Data/movies.json`);
    const twentyMovies = await response.json();
    return twentyMovies;
}


const loadOmdbMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInputRef.value}`);
    const omdbMovies = await response.json();
    // console.log(typeof omdbMovies.Search);
    return omdbMovies.Search;
    
};

export { loadTwentyMovies, loadOmdbMovies };