const getMethod = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWMxNDE5NDUxZmRjZDkzZDA5ZjVlZTg5MzUzZTBiYSIsInN1YiI6IjVmODA2MDE2YzgxMTNkMDAzOGFlNTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQRs-HcDu6UkTY631fHnxO4ylkoeFH0P48MSEPj1h0k",
  },
};

export const movieOptions = {
  url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  ...getMethod,
};

export const tvOptions = {
  url: "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  ...getMethod,
};

export const trendingMovieOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
  ...getMethod,
};

export const trendingTvOptions = {
  url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
  ...getMethod,
};

export const topRatedMovieOptions = {
  url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  ...getMethod,
};

export const topRatedTvShowOptions = {
  url: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  ...getMethod,
};

export const similarMoviesOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
    ...getMethod,
  };
};

export const searchMoviesOptions = (searchString: string) => {
  return {
    url: `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`,
    ...getMethod,
  };
};

export const searchTvShowsOptions = (searchString: string) => {
  return {
    url: `https://api.themoviedb.org/3/search/tv?query=${searchString}&include_adult=false&language=en-US&page=1`,
    ...getMethod,
  };
};

export const movieDetailsOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`,
    ...getMethod,
  };
};

export const tvShowDetailsOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`,
    ...getMethod,
  };
};

export const ageRatingOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}/release_dates`,
    ...getMethod,
  };
};

export const seasonDetailsOptions = (id: string, seasonNo: string) => {
  return {
    url: `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?language=en-US`,
    ...getMethod,
  };
};

export const movieTrailersOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    ...getMethod,
  };
};

export const tvShowTrailersOptions = (id: string) => {
  return {
    url: `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
    ...getMethod,
  };
};

export const movieGenreOptions = () => {
  return {
    url: `https://api.themoviedb.org/3/genre/movie/list`,
    ...getMethod,
  };
};

export const tvGenreOptions = () => {
  return {
    url: `https://api.themoviedb.org/3/genre/tv/list`,
    ...getMethod,
  };
};
