import type { RatingDescriptionType } from '../types/types';
import { RatingDescription, ratingDescriptionToUpperLimit } from '../const';

const MAX_OVERVIEW_ACTORS_COUNT = 4;

export const formatRating = (rating: number): string => {
  const formattedRating = String(rating).replace('.', ',');
  return formattedRating.length === 1 ? `${formattedRating},0` : formattedRating;
};


export const formatOverviewActors = (actors: string[]): string => {
  const formattedActors = actors.slice(0, MAX_OVERVIEW_ACTORS_COUNT).join(', ');
  return actors.length > MAX_OVERVIEW_ACTORS_COUNT ? `${formattedActors} and others` : formattedActors;
};

export const getRatingDescription = (rating:number): RatingDescriptionType => {
  for (const [name, description] of Object.entries(RatingDescription)) {
    if (rating <= ratingDescriptionToUpperLimit[name]) {
      return description;
    }
  }

  return RatingDescription.Good;
};
