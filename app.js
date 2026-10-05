// Phase 7: Application Logic (app.js)

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    await fetchMovies();
    setupEventListeners();
    checkUserSession();
}

// 1. Fetch & Render Movies from Supabase
async function fetchMovies() {
    const movieContainer = document.getElementById('movie-list');
    if (!movieContainer) return;

    try {
        const { data: movies, error } = await supabase
            .from('movies')
            .select('*');

        if (error) throw error;

        movieContainer.innerHTML = movies.map(movie => `
            <div class="movie-card" data-id="${movie.id}">
                <img src="${movie.poster_url || 'https://via.placeholder.com/200x300'}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre || 'N/A'}</p>
                <p>Duration: ${movie.duration || 'N/A'} mins</p>
                <button onclick="selectMovie('${movie.id}')">Book Tickets</button>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error fetching movies:', err.message);
    }
}

// 2. Select Movie & Load Showtimes
async function selectMovie(movieId) {
    console.log('Selected Movie ID:', movieId);
    try {
        const { data: showtimes, error } = await supabase
            .from('showtimes')
            .select('*')
            .eq('movie_id', movieId);

        if (error) throw error;

        renderShowtimes(showtimes);
    } catch (err) {
        console.error('Error fetching showtimes:', err.message);
    }
}

function renderShowtimes(showtimes) {
    const showtimeContainer = document.getElementById('showtime-list');
    if (!showtimeContainer) return;

    if (!showtimes || showtimes.length === 0) {
        showtimeContainer.innerHTML = '<p>No showtimes available for this movie.</p>';
        return;
    }

    showtimeContainer.innerHTML = showtimes.map(st => `
        <button class="showtime-btn" onclick="selectShowtime('${st.id}')">
            ${new Date(st.showtime).toLocaleString()} - Hall ${st.hall_number || '1'}
        </button>
    `).join('');
}

// 3. User Session Management
async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    updateAuthUI(session);

    supabase.auth.onAuthStateChange((_event, session) => {
        updateAuthUI(session);
    });
}

function updateAuthUI(session) {
    const authStatus = document.getElementById('auth-status');
    if (!authStatus) return;

    if (session) {
        authStatus.textContent = `Logged in as: ${session.user.email}`;
    } else {
        authStatus.textContent = 'Not logged in';
    }
}

// 4. Global Event Listeners
function setupEventListeners() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert('Login failed: ' + error.message);
            else alert('Logged in successfully!');
        });
    }
}