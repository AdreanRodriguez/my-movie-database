const apiKey = `2799d50` // Min api nyckel
const searchInputRef = document.querySelector(`#searchInput`)


const loadTwentyMovies = async () => {

    try {
        const response = await fetch(`https://santosnr6.github.io/Data/movies.json`);
        const twentyMovies = await response.json();
        console.log(twentyMovies);
        return twentyMovies;
    } catch (error) {
        console.error(`Failed to fetch data from Jesper`);
    }

}


const loadOmdbMovies = async () => {

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInputRef.value}`);
        const omdbMovies = await response.json();
        return omdbMovies.Search;
    } catch (error) {
        console.error(`Failed to fetch data from OMDB API`);
    }
};

export { loadTwentyMovies, loadOmdbMovies };