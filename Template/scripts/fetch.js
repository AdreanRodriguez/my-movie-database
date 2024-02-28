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
        console.log(`Resultat av sökt film`, omdbMovies);
        return omdbMovies.Search;
    } catch (error) {
        console.error(`Failed to fetch data from OMDB API`);
    }
};

const loadSpecifiedDetails = async (id) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=${id}`);
        console.log(`HEÄÄÄ`, response);
        const details = await response.json();
        console.log(`Resultat av sökt film`, details);
        return details
    } catch (error) {
        console.error(`Faild to fetch data from plot full API`)
    }
}

export { loadTwentyMovies, loadOmdbMovies, loadSpecifiedDetails };