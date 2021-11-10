import { MAX_OVERVIEW_ACTORS_COUNT, RatingDescription, ratingDescriptionToLowerLimit } from '../constants';
import type { ValuesOf } from '../types/types';

export const formatRating = (rating: number): string => {
  const formattedRating = String(rating).replace('.', ',');
  return formattedRating.length === 1 ? `${formattedRating},0` : formattedRating;
};


export const formatOverviewActors = (actors: string[]): string => {
  const formattedActors = actors.slice(0, MAX_OVERVIEW_ACTORS_COUNT).join(', ');
  return actors.length > MAX_OVERVIEW_ACTORS_COUNT ? `${formattedActors} and others` : formattedActors;
};

export const getRatingDescription = (rating:number): ValuesOf<typeof RatingDescription> => {
  const keys = Object.keys(RatingDescription).reverse() as Array<keyof typeof RatingDescription>;
  for (const key of keys) {
    if (rating >= ratingDescriptionToLowerLimit[key]) {
      return RatingDescription[key];
    }
  }

  return RatingDescription.Bad;
};
