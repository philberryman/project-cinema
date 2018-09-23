let user="alison";

let userObject = JSON.parse(localStorage.getItem(user));

function User (user) {
    this.name = user;
    this.favourites = {};
    this.toWatch = {};
}

if (userObject === null) {
    userObject = new User(user);
}
console.log(userObject);

// localStorage.setItem('favourites', JSON.stringify(favourites));

// console.log(favourites);

// creates all event listeners that are needed
const createListeners = () => {
    const container = document.querySelector('.app');
    container.addEventListener('click', event => {
        if (event.target.matches('.movies__fav-icon')) {
            console.log("dsds" + event.target.dataset.title);
            toggleFavourite(event.target.id, event.target.dataset.id);
        }
        if (event.target.closest('.result__poster, .result__more-info, .result__text')) {
            showMovie(event.target.closest('.result').id)
        }
        if (event.target.matches('.movie__back-to-result')) {
            switchDiv('results');
            console.log(45345)
        }
        if (event.target.matches('.nav__favourites')) {
            switchDiv('favourites');
            showFavourites();
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
    console.log(`${baseURL}?apikey=${apiKey}&${typeOfSearch}=${search}`)
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
    switchDiv("results");
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = resultsHtml;
}

// template for search results
const searchTemplate = (result) => {
    return `
    <div class="result" id="${result.imdbID}">
        <div class="result__poster">
            <img src="${result.Poster}" class="cover">
        </div>
        <div class="result__info">
            <div class="result__text">
                <div class="result__title">${result.Title}</div>
                <div class="result__year">${result.Year}</div>
            </div>
            <div class="result__links">
                <div class="result__more-info result__link">More Info</div>
                <div class="result__favourite  result__link"> <i class="movies__fav-icon ${isFavourite(result.imdbID)}" id="${result.imdbID}" data-fav-id="${result.imdbID}"></i></div>
            </div>
        </div>
    </div>
   
    `
};

const isFavourite = (id) => {
    if (userObject.favourites.hasOwnProperty(id)) {
        if (userObject.favourites[id].favourite===1) {
            console.log(`${id} is favourite`);
            return ' fas fa-star fa-2x'
        };
    }
    return ' far fa-star fa-2x'
}

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
    return apiRequest('i', id).then(function (body) {
        renderMovie(movieTemplate(body));
    });
}

const movieTemplate = (movie) => {
    console.log(movie)
    return `
    <div class="movie__back-to-result"><<< Back to results</div>

    <div class="movie__poster"><img src="${movie.Poster}" class="cover"></div>
    <div class="movie__info">
        <div class="movie__title">${movie.Title}</div>
        <div class="movie__title">${movie.Year}</div>
        <div class="movie__title">${movie.Title}</div>
        <div class="movie__title">${movie.Year}</div>
        <div class="movie__title">${movie.Title}</div>
        <div class="movie__title">${movie.Year}</div>
    </div>
    `
}
const renderMovie = movieHtml => {
    switchDiv("movie");
    const movieDiv = document.querySelector('.movie');
    movieDiv.innerHTML = movieHtml;
}

function Movie (body) {
    this.id = body.imdbID;
    this.title = body.Title;
    this.actors = body.Actors;
    this.awards = body.Awards;
    this.boxOffice = body.BoxOffice;
    this.country = body.Country;
    this.language = body.Language;
    this.plot = body.Plot;
    this.poster = body.Poster;
    this.rated = body.Rated;
    this.runtime = body.Runtime;
    this.type = body.Type;
    this.year = body.Year;
    this.rating = body.imdbRating;
    this.writer = body.Wtier;
    this.favourite =1;
    console.log(body);
}

const toggleFavourite = (filmID, filmTitle) => {
    console.log(filmID)
    const film = document.querySelector(`[data-fav-id=${filmID}]`);
    film.classList.toggle('fas');
    film.classList.toggle('far');

    if (film.classList.contains('fas')) {
        if (!userObject.favourites.hasOwnProperty(filmID)) {
            return apiRequest('i', filmID).then(function (body) {
                console.log('this');
                userObject.favourites[filmID] = new Movie(body);
                console.log(body);
                console.log(userObject);
                localStorage.setItem(user, JSON.stringify(userObject));
            });            
        }
        userObject.favourites[filmID].favourite = 1;
    } else {
        userObject.favourites[filmID].favourite = 0;
        console.log(userObject.favourites[filmID].favourite)
        console.log(userObject.favourites[filmID])

        console.log("remove facourite")
    }
    // updatedFavourites.filmName = 
    console.log(userObject);

    localStorage.setItem(user, JSON.stringify(userObject));
    console.log(userObject);
}

const switchDiv = (div) => {
    const nextDiv = document.querySelector('.'+div)
    const results = document.querySelector('.results');
    const movie = document.querySelector('.movie');
    const favourites = document.querySelector('.favourites');
    results.style.display = 'none';
    movie.style.display = 'none';
    favourites.style.display = 'none';

    nextDiv.style.display = 'flex';
}


const favouritesTemplate = movie => {
    return `
    <div class="favourites__movie">${movie.title}</div>   
    `
}


const showFavourites = () => {
    const favouriteKeys = Object.keys(userObject.favourites);
    const favouritesArray = favouriteKeys.map(movie => {
        return userObject.favourites[movie];
    })
    console.log(favouritesArray);
    const favouritesFiltered = favouritesArray.filter(movie => movie.favourite===1);
    const favouritesHTML = favouritesFiltered.map(movie => {
        return favouritesTemplate(movie)
    }).join("")
    renderFavourites(favouritesHTML);
}

const renderFavourites = html => {
    switchDiv("favourites");
    const favouritesDiv = document.querySelector('.favourites');
    favouritesDiv.innerHTML = html;
}

createListeners();
