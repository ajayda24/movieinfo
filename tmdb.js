// var tmdb = {
//   getImage: 'https://image.tmdb.org/t/p/w500/imageId',
//   getGenres:
//     'https://api.themoviedb.org/3/discover/movie?with_genres=28||16||27||53',
//   getNowPlaying: 'https://api.themoviedb.org/3/movie/now_playing',
//api.themoviedb.org/3/discover/movie?year=2021&api_key=7a8ca7c97583e31eb5853b4d959ffe0c

//https://api.themoviedb.org/3/discover/movie?api_key=7a8ca7c97583e31eb5853b4d959ffe0c&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=2&release_date.gte=2015-01-01&release_date.lte=2021-07-07&with_watch_monetization_types=flatrate

//https://api.themoviedb.org/3/search/movie?api_key=7a8ca7c97583e31eb5853b4d959ffe0c&language=en-US&query=avengers&page=1&include_adult=false
// }


export async function getNowPlaying(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
  )
  const result = await response.json()
  return result
}

export async function getSearchMovies(searchInput){
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchInput}&page=1&include_adult=false`
  )
  const result = await response.json()
  return result
}

export async function getGenreBasedMovies(value,page){
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${value}&sort_by=vote_count.desc&page=${page}`
  )
  const result = await response.json()
  return result
}

export async function getYearBasedMovies(value,page){
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&year=${value}&page=${page}`
  )
  const result = await response.json()
  return result
}

export async function getSingleMovie(movieId,tv){
  var response
  if(tv == 'false'){
    response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
  } else {
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
  }
  
  const result = await response.json()
  return result
}

// export async function getYoutubeTrailer(movieName){
//   const response = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${movieName}%20trailer&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
//   )
//   const result = await response.json()
//   return result
// }

export async function getTrailer(movieId,tv){

  var response
  if (tv == 'false') {
    response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  } else {
    response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  }
  
  const result = await response.json()
  return result
}

