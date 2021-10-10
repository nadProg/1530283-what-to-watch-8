import { RatingDescription, ratingDescriptionToUpperLimit } from '../const';
import type { ValuesOf } from '../types/types';

const MAX_OVERVIEW_ACTORS_COUNT = 4;

export const formatRating = (rating: number): string => {
  const formattedRating = String(rating).replace('.', ',');
  return formattedRating.length === 1 ? `${formattedRating},0` : formattedRating;
};


export const formatOverviewActors = (actors: string[]): string => {
  const formattedActors = actors.slice(0, MAX_OVERVIEW_ACTORS_COUNT).join(', ');
  return actors.length > MAX_OVERVIEW_ACTORS_COUNT ? `${formattedActors} and others` : formattedActors;
};

export const getRatingDescription = (rating:number): ValuesOf<typeof RatingDescription> => {
  for (const key of Object.keys(RatingDescription) as Array<keyof typeof RatingDescription>) {
    if (rating <= ratingDescriptionToUpperLimit[key]) {
      return RatingDescription[key];
    }
  }

  return RatingDescription.Normal;
};
