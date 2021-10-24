export const MAX_GENRES_COUNT = 9;

export const CATALOG_INITIAL_PAGE = 1;

export const CATALOG_PAGE_SIZE = 8;

export const MAX_SIMILAR_FILMS_COUNT = 4;

export const ALL_GENRES = 'All genres';

export const AUTH_TOKEN_KEY_NAME = 'wtw-token';

export const MIN_PASSWORD_LENGTH = 2;

export const EMPTY_SPACE = ' ';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const AppRoute = {
  Root: () => '/',
  Login: () => '/login',
  MyList: () => '/mylist',
  Film: (id:string | number = ':id') => `/films/${id}`,
  AddReview: (id:string | number = ':id') => `/films/${id}/review`,
  Player: (id:string | number = ':id') => `/player/${id}`,
} as const;

export const APIRoute = {
  Films: () => '/films',
  PromoFilm: () => '/promo',
  Film: (id:string | number) => `/films/${id}`,
  SimilarFilms: (id:string | number) => `/films/${id}/similar`,
  FavoriteFilms: () => '/favorite',
  Comments: (id:string | number) => `/comments/${id}`,
  Login: () => '/login',
  Logout: () => '/logout',
} as const;

export const FetchStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Succeeded: 'SUCCEEDED',
  Failed: 'FAILED',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NotAuth: 'NOT_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const CustomRouteType = {
  Guest: 'GUEST',
  Private: 'PRIVATE',
} as const;

export const FilmCardTab = {
  Overview: 'overview',
  Details: 'details',
  Reviews: 'reviews',
} as const;

export const RatingDescription = {
  Bad: 'Bad',
  Normal: 'Normal',
  Good: 'Good',
  VeryGood: 'Very Good',
  Awesome: 'Awesome',
} as const;

export const ratingDescriptionToLowerLimit: {
  [key in keyof typeof RatingDescription]: number
} = {
  Bad: 0,
  Normal: 3,
  Good: 5,
  VeryGood: 8,
  Awesome: 10,
};

export const ActionType = {
  SetFilter: 'filter/setFilter',
  SetAuthorizationStatus: 'authorization/setStatus',
  SetAuthorizationInfo: 'authorization/setInfo',
  SetFilms: 'films/setData',
  SetFilmsFetchStatus: 'films/setFetchStatus',
  SetPromoFilm: 'promoFilm/setData',
  SetPromoFilmFetchStatus: 'promoFilm/setFetchStatus',
  SetFavoriteFilms: 'favoriteFilms/setData',
  SetFavoriteFilmsFetchStatus: 'favoriteFilms/setFetchStatus',
  SetSimilarFilms: 'similarFilms/setData',
  SetSimilarFilmsFetchStatus: 'similarFilms/setFetchStatus',
  SetCurrentFilm: 'currentFilm/setData',
  SetCurrentFilmFetchStatus: 'currentFilm/setFetchStatus',
  SetCurrentComments: 'currentComments/setData',
  SetCurrentCommentsFetchStatus: 'currentComments/setFetchStatus',
  Redirect: 'app/redirect',
} as const;
