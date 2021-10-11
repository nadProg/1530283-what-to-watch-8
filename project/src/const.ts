export const AppRoute = {
  Root: '/',
  Login: '/login',
  MyList: '/mylist',
  Film: '/films/:id',
  Review: '/films/:id/review',
  Player: '/player/:id',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NotAuth: 'NOT_AUTH',
} as const;

export const CustomRouteType = {
  Guest: 'GUEST',
  Private: 'PRIVATE',
} as const;

export const NavigationItem = {
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
