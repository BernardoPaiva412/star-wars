// fetch movies
const url = "http://localhost:3000/movies"
const response = await fetch(url)
const movies = await response.json()
console.log(movies)

// render movies
movies.forEach((movie) => {
    const template = document.querySelector("#movie-template")

    const clone = template.content.cloneNode(true)
    clone.querySelector(".movie-title").textContent = movie.title
    clone.querySelector(".movie-release-date").textContent = movie.releaseDate
    clone.querySelector(".movie-cover").src = movie.cover
    clone.querySelector(".movie-cover").alt = movie.title
    clone.querySelector(".movie-link").href = `/filme/?slug=${movie.slug}`

    document.querySelector("#movies-container").appendChild(clone)
})