document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    const grid = document.getElementById('movieGrid');
    const status = document.getElementById('status');

    const client = window.supabaseClient;

    if (!client) {
        if (status) status.innerText = 'Error: Supabase client not found in window.';
        return;
    }

    try {
        const { data: movies, error } = await client
            .from('movie_ratings')
            .select('*');

        if (error) {
            console.error('Supabase error:', error);
            if (status) status.innerText = `Error: ${error.message}`;
            return;
        }

        if (!movies || movies.length === 0) {
            if (status) status.innerText = 'No movies found in database.';
            return;
        }

        // Hide status message once loaded
        if (status) status.style.display = 'none';

        // Render movie cards into movieGrid
        if (grid) {
            grid.innerHTML = movies.map(movie => `
                <div class="movie-card">
                    <img src="${movie.poster_url || 'https://via.placeholder.com/200x280'}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p><strong>Genre:</strong> ${movie.genre || 'N/A'}</p>
                    <p><strong>Rating:</strong> ⭐ ${movie.avg_rating ?? 'N/A'}</p>
                </div>
            `).join('');
        }

    } catch (err) {
        console.error('Unexpected error:', err);
        if (status) status.innerText = `Unexpected Error: ${err.message}`;
    }
}