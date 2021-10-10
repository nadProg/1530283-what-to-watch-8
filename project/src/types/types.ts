
export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  actors: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type CommentPost = {
  rating: number,
  comment: string,
}

export type CommentGet = CommentPost & {
  id: number,
  user: {
    id: number,
    name: string,
  },
  date: Date,
}

export type Params = {
  id: string
}

export type ValuesOf<T> = T[keyof T]
