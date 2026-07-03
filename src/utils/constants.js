export const LOGO_URL =
  "https://imgs.search.brave.com/tOJpXUG94iS6_M8_MTS09CiCErpecLhhqCHzPsjUNGw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L25ldGZsaXgtbG9n/by1kcmF3aW5nLXBu/Zy0xOS5wbmc";

export const PHOTO_URL =
  "https://imgs.search.brave.com/_1YhWGfJE_pbpg5x-rNvmWKanuf0TuNM8vjby3XCJhQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbmV0/ZmxpeC1wcm9maWxl/LXBpY3R1cmVzLTEw/MDAteC0xMDAwLXFv/OWg4MjEzNHQ5bnYw/ajAuanBn";

export const MOVIE_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const MOVIE_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

export const POSTER_URL = "https://image.tmdb.org/t/p/w500/";

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/81b52f88-dc76-488d-a939-0cf13a260a6e/web/IN-en-20260622-TRIFECTA-perspective_d39d60ef-cb5a-4793-9546-0a8d9a87948e_large.jpg";

export const LANGUAGES = [
  { indetifier: "en", name: "English" },
  { indetifier: "hindi", name: "Hindi" },
  { indetifier: "spanish", name: "Spanish" },
];
