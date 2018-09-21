let favourites = JSON.parse(localStorage.getItem('favourites'));
// console.log(favourites);

// creates all event listeners that are needed
const createListeners = () => {
    const container = document.querySelector('.app');
    container.addEventListener('click', event => {
        if (event.target.matches('.movies__fav-icon')) {
            toggleFavourite(event.target.id, event.target.parentElement.id);
        }
        if (event.target.closest('.result')) {
            showMovie(event.target.closest('.result').id)
        }
    });
	const formElement = document.querySelector("form");
	const formInput = document.querySelector("#form-search");
	formElement.addEventListener('submit', event => {
		event.preventDefault();
		search = formInput.value;
		searchMovies(search);
	});
}

// builds the url for omdb api request
const createUrl = (typeOfSearch, search) => {
    const baseURL = "http://www.omdbapi.com/";
    const apiKey = "95869d44";
    return `${baseURL}?apikey=${apiKey}&${typeOfSearch}=${search}`
}

// makes all requests to omdb api
const apiRequest = (typeOfSearch = "s", search) => {
    return fetch(createUrl(typeOfSearch, search))
        .then(function (response) {
            return response.json();
        })
}

// SEARCH RESULTS FUNCTIONS :: 
// These functions get search results from API and render them

// inserts html into .search div - not Pure (altering dom)
const renderMovieResults = resultsHtml => {
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = resultsHtml;
}

// template for search results
const searchTemplate = (result) => {
    return `
    <div class="result" id="${result.Title}">
        <div class="result__poster">
            <img src="${result.Poster}" class="cover">
        </div>
        <div class="result__info">
            <div class="result__title">${result.Title}</div>
            <div class="result__year">${result.Year}</div>
        </div>
    </div>`
};


// takes search query / uses apiRequest to fetch results. Maps through and returns html
const searchMovies = (search) => {
    return apiRequest('s', search).then(function (body) {
        const apiResults = body.Search;
        const resultsHtml = apiResults.map((result) => {
            return searchTemplate(result)
        }).join("");
        renderMovieResults(resultsHtml);
    });
}

// MOVIE FUNCTIONS :: 
//These 3 functions get a movie from the API and render it.
const showMovie = (id) => {
    return apiRequest('t', id).then(function (body) {
        renderMovie(movieTemplate(body));
    });
}

const movieTemplate = (movie) => {
    return `
    <div class="movie__title">${movie.Title}</div>
    <div class="movie__title">${movie.Year}</div>
    <div class="movie__title">${movie.Poster}</div>
    <div class="movie__title">${movie.Title}</div>
    <div class="movie__title">${movie.Year}</div>
    <div class="movie__title">${movie.Poster}</div>
    <div class="movie__title">${movie.Title}</div>
    <div class="movie__title">${movie.Year}</div>
    <div class="movie__title">${movie.Poster}</div>
    `
}
const renderMovie = movieHtml => {
    const movieDiv = document.querySelector('.movie');
    movieDiv.innerHTML = movieHtml;
}


const toggleFavourite = (filmID, filmTitle) => {
    console.log(123)
    // console.log(filmName);
    let filmA = '#' + filmID;
    // console.log(filmA);
    const film = document.querySelector(`#${filmID}`);
    film.classList.toggle('favourited');

    var updatedFavourites = JSON.parse(localStorage.getItem('favourites'));

    if (film.classList.contains('favourited')) {
        console.log("toggle " + filmTitle);
        updatedFavourites[filmTitle] = 1;
    } else {
        updatedFavourites[filmTitle] = 0;
    }
    // updatedFavourites.filmName = 
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    console.log(updatedFavourites);
}

createListeners();
searchMovies('pulp')