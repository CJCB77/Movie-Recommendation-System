const movieSection = document.getElementById("movies")

const API_KEY = "3e72b72e4191aec0b1fce161339bc177"
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_PATH = "https://image.tmdb.org/t/p/w500"


let queryMovies = BASE_URL + `/discover/movie?api_key=${API_KEY}&language=en-US&
sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=true&with_crew=true&
with_genres=true&with_watch_monetization_types=flatrate`

let queryGenres = BASE_URL + `/genre/movie/list?api_key=${API_KEY}&language=en-US`


//My functions
async function getActors(movie_id) {
    let queryCredits =BASE_URL + `/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`

    return fetch(queryCredits)
        .then(resp =>{
            if(resp.ok){
                return resp.json()
            }else{
                console.log("Failed to retrieve actors")
            }
        })
        .then(data => {
            let main_actors = data.cast.slice(0,4)
            return main_actors
        })
        .catch((error) => {
            console.log(error)
        })
    
}


fetch(queryMovies)
    .then(response => {
        if(response.ok){
            console.log("SUCCESS")
            return response.json()
        }else{
            console.log("FAILURE")
        }
    })
    .then(data => {
        for(let movie of data.results){         
            let card = document.createElement("article")
            card.classList.add("card")
            card.innerHTML =`
                            <div class="card__main">
                                <header>
                                <img src="${IMG_PATH  + movie.backdrop_path}" class="movie-img"alt="movie poster">
                                </header>
                                <footer>
                                <h3>${movie.title}</h3>
                                <p class="score">${movie.vote_average}</p>
                                </footer>
                            </div>
                            <div class="card__info">
                             
                                <p>${movie.overview}</p>
                            </div>
                            `
            movieSection.append(card)
         }
         let scores = document.querySelectorAll(".score")
         for(let score of scores){
             if(score.innerText >= 7.5){
                 score.setAttribute('style', 'background-color: var(--green)')
             }else if (score.innerText < 7.5 && score.innerText > 5){
                score.setAttribute('style', 'background-color: var(--orange)')
             }else{
                score.setAttribute('style', 'background-color: var(--red)')
             }
         }
    })







