let favourites = JSON.parse(localStorage.getItem('favourites'));
console.log(favourites);

const container = document.querySelector('.app');
container.addEventListener('click', event => {
    if (event.target.matches('.movies__fav-icon')) {
        toggleFavourite(event.target.id, event.target.parentElement.id);
    }});

const createUrl = (typeOfSearch, search) => {
    const baseURL = "http://www.omdbapi.com/";
    const apiKey = "95869d44";
    return `${baseURL}?apikey=${apiKey}&${typeOfSearch}=${search}`
}

exports.createUrl = createUrl;


const getFilm = ((typeOfSearch="s", search) => {
    var url = `http://www.omdbapi.com/?apikey=95869d44&t=${search}`;
        fetch(createUrl(typeOfSearch,search))
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                console.log(body);
                showFilm(body);
            })
        })

// looks for all elements with class .movie__info and sets innerText to the info related to their id
const showFilm = (film) => {
    let favourite= '';
    const movieSpans = document.querySelectorAll('.movie__info')
    movieSpans.forEach( item => {
        item.innerText = film[item.id]
    })    
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

const filmTemplate = (filmTitle, filmID) => `${filmTitle}  <span class="movies__fav-icon" id="${filmID}">F</span`;

getFilm('t','pulp');