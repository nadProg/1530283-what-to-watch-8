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
