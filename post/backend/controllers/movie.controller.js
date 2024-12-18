import fs from 'fs/promises';

let moviesData = [];

// Load movies data from the local JSON file
export async function loadMoviesData() {
	try {
		const data = await fs.readFile('./data/movies.json', 'utf-8'); // Updated correct path
		moviesData = JSON.parse(data).results;
	} catch (error) {
		console.error('Error loading movies data:', error);
	}
}

// Call loadMoviesData to populate moviesData on server start
loadMoviesData();
console.log(moviesData)

export async function getTrendingMovie(req, res) {
	try {
		if (!moviesData.length) return res.status(404).json({ success: false, message: "No movies available" });
		const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)];
		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
export async function getMovieTrailers(req, res) {
	const { id } = req.params;
	try {
		const movie = moviesData.find(movie => movie.id === parseInt(id));
		if (!movie) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}
		// Return the trailers from the movie
		res.json({ success: true, trailers: movie.trailers });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function getMovieDetails(req, res) {
	const { id } = req.params;
	try {
		const movie = moviesData.find(movie => movie.id === parseInt(id));
		if (!movie) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}
		res.status(200).json({ success: true, content: movie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarMovies(req, res) {
	const { id } = req.params;
	try {
		const movie = moviesData.find(movie => movie.id === parseInt(id));
		if (!movie) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}
		const similarMovies = moviesData.filter(m => m.id !== movie.id && m.genre_ids.some(genre => movie.genre_ids.includes(genre)));
		res.status(200).json({ success: true, similar: similarMovies });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const categoryMovies = moviesData.filter(movie => movie.category.toLowerCase() === category.toLowerCase());
		if (!categoryMovies.length) {
			return res.status(404).json({ success: false, message: "No movies found for this category" });
		}
		res.status(200).json({ success: true, content: categoryMovies });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
