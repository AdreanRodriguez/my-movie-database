
    const loadTwentyMovies = async () => {
    const response = await fetch(`https://santosnr6.github.io/Data/movies.json`);
    const twentyMovies = await response.json();
    return twentyMovies;
}


const loadOmdbMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=2799d50&s=Batman`);
    const omdbMovies = await response.json();
    console.log(omdbMovies.Search);
    return omdbMovies;

};
export { loadTwentyMovies, loadOmdbMovies };