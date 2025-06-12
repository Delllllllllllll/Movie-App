const API_KEY = '25b4e220ac2e513e2c7fe6cd11c6bf7b';

export async function fetchMovieOrTv(mediaType, category, page, signal) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${category}?api_key=${API_KEY}&page=${Number(page)}`);
    if(!response.ok) throw new Error('Network response was not ok');
    
    return response.json();
}

export async function fetchMediaDetails(mediaType, id, signal) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}`);
    if(!response.ok) throw new Error('Network response was not ok');
    
    return response.json();
}

export async function fetchGenres(mediaType, signal){
    const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${API_KEY}`);
    if(!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export async function fetchMovieOrTvCasts(mediaType, id, signal) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}`);
    if(!response.ok) throw new Error('Network response was not ok');

    return response.json();
}


export async function fetchMovieOrTvVideos(mediaType, id, signal) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}`);
    if(!response.ok) throw new Error('Network response was not ok');

    return response.json();
}