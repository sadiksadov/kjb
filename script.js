const movieName = document.getElementById('movieName');
const movieImg = document.getElementById('movieImg'); // Rasm inputi
const movieGenre = document.getElementById('movieGenre');
const movieRating = document.getElementById('movieRating');
const addBtn = document.getElementById('addBtn');
const movieList = document.getElementById('movieList');
const totalCount = document.getElementById('totalCount');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function addMovie() {
    const name = movieName.value;
    const img = movieImg.value;
    const genre = movieGenre.value;
    const rating = movieRating.value;

    if (name === "") {
        alert("Пожалуйста, введите название фильма!");
        return;
    }

    const newMovie = {
        name: name,
        img: img,       
        genre: genre,
        rating: rating,
        fav: false,
        date: new Date().toLocaleDateString()
    };

    movies.push(newMovie);
    saveAndRender();

    movieName.value = "";
    movieImg.value = "";
    movieGenre.value = "";
    movieRating.value = "";
}



function toggleFavorite(index) {
    movies[index].fav = !movies[index].fav;
    saveAndRender();
}


function deleteMovie(index) {
    if (confirm("удалить этот фильм?")) {
        movies.splice(index, 1);
        saveAndRender();
    }
}

function saveAndRender() {
    localStorage.setItem('movies', JSON.stringify(movies));
    
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; 

    movies.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'movie-item';
        
        item.innerHTML = `
            <div class="movie-content">
                <img src="${movie.img}.jpg" class="movie-poster">
                <div class="movie-text">
                    <strong>${movie.name}</strong>
                    <p>${movie.genre} | Рейтинг: <span class="rating">${movie.rating}</span> | ${movie.date}</p>
                </div>
            </div>
            <div class="actions">
                <span class="star ${movie.fav ? 'active' : ''}" onclick="toggleFavorite(${index})">★</span>
                <button class="del-btn" onclick="deleteMovie(${index})">Удалить</button>
            </div>
        `;
        movieList.appendChild(item);
    });

    document.getElementById('totalCount').innerText = ` фильмов: ${movies.length}`;
}

saveAndRender();

const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});
