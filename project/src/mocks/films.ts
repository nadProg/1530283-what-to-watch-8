import type { Film } from '../types/types';
import { getRandomInteger, shuffle, getRandomItemFromArray } from '../utils/common';

const FILMS_COUNT = 8;

const names = [
  'The Grand Budapest Hotel',
  'Bohemian Rhapsody',
  'Johnny English',
  'Shutter Island',
  'Pulp Fiction',
  'War of the worlds',
  'Snatch',
  'What we do in the shadows',
];

const images = [
  'img/the-grand-budapest-hotel-poster.jpg',
  'img/bohemian-rhapsody.jpg',
  'img/johnny-english.jpg',
  'img/shutter-island.jpg',
  'img/pulp-fiction.jpg',
  'img/war-of-the-worlds.jpg',
  'img/snatch.jpg',
  'img/what-we-do-in-the-shadows.jpg',
];

const genres = ['Comedy', 'Western', 'Thriller', 'History', 'Comedy', 'Western', 'Thriller', 'History'];

const ratings = [5.0, 7.0, 8.0, 6.6, 7.7, 8.5, 5.6, 8.8];

const actors = ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan', 'Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'];

const directors = ['Wes Anderson', 'James Cameron', 'Willem Dafoe', 'Saoirse Ronan', 'Edward Norton', 'Martin Scorsese', 'James Cameron', 'Edward Norton'];

const colors = ['#aa3311', '#aa3322', '#aa5533', '#aa7733', '#aa9933', '#aa5555', '#aa7777', '#aa6622'];

const films: Film[] = new Array(FILMS_COUNT).fill(null).map((item, index) => ({
  id: index + 1,
  name: getRandomItemFromArray(names),
  posterImage: getRandomItemFromArray(images),
  previewImage: getRandomItemFromArray(images),
  backgroundImage: getRandomItemFromArray(images),
  backgroundColor: getRandomItemFromArray(colors),
  videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
  rating: getRandomItemFromArray(ratings),
  scoresCount: getRandomInteger(10, 300),
  director: getRandomItemFromArray(directors),
  actors: shuffle(actors).slice(0, getRandomInteger(2, 8)),
  runTime: getRandomInteger(30, 180),
  genre: getRandomItemFromArray(genres),
  released: getRandomInteger(1995, 2021),
  isFavorite: !!(Math.random() > 0.5),
}));

export { films };
