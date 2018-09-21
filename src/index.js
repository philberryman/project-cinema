let favourites = JSON.parse(localStorage.getItem('favourites'));
// console.log(favourites);

const container = document.querySelector('.app');
container.addEventListener('click', event => {
    if (event.target.matches('.movies__fav-icon')) {
        toggleFavourite(event.target.id, event.target.parentElement.id);
    }
    if (event.target.parentNode.matches('.result')) {
        showMovie(event.target.parentNode.id)
    }
});

const createUrl = (typeOfSearch, search) => {
    const baseURL = "http://www.omdbapi.com/";
    const apiKey = "95869d44";
    return `${baseURL}?apikey=${apiKey}&${typeOfSearch}=${search}`
}


const apiRequest = (typeOfSearch="s", search) => {
    return fetch(createUrl(typeOfSearch,search))
            .then(function (response) {
                return response.json();
            })
        }


// template for search results
const searchTemplate = (result) => {
    return `
    <div class="result" id="${result.Title}">
        <div class="result__title">${result.Title}</div>
        <div class="result__year">${result.Year}</div>
        <div class="result__poster">${result.Poster}</div>
    </div>`
};

// inserts html into .search div - not Pure (altering dom)
const renderMovieResults = resultsHtml => {
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = resultsHtml;
}

// takes search query / uses apiRequest to fetch results. Maps through and returns html
const createSearchHtml = (search) => {
    return apiRequest('s',search).then(function (body){
        const apiResults = body.Search;
        const resultsHtml = apiResults.map((result) => {
        return searchTemplate(result)
        }).join("");
        renderMovieResults(resultsHtml);
    });
}

const createMovieHtml = (id) => {
    return apiRequest('t',id).then(function (body){
        console.log(body);
    });
}

const showMovie = (id) => {
    createMovieHtml(id);
}

const toggleFavourite = (filmID,filmTitle) => {
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

createSearchHtml('pulp')
