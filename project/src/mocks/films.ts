import type { Film } from '../types/types';

const filmsCount = 8;

const posterImages = [
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

const ratings = [5.0, 7.1, 8.5, 6.6, 7.7, 8.5, 5.6, 8.8];

const years = [2018, 1998, 2005, 2015, 2018, 1995, 2020, 2001];

const starring = ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'];

const directors = ['Wes Anderson', 'James Cameron', 'Willem Dafoe', 'Saoirse Ronan', 'Edward Norton', 'Martin Scorsese', 'James Cameron', 'Edward Norton'];

const films: Film[] = new Array(filmsCount).fill(null).map((item, index) => ({
  id: index + 1,
  name: 'The Grand Budapest Hotel',
  posterImage: posterImages[index],
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
  rating: ratings[index],
  scoresCount: 240,
  director: directors[index],
  starring,
  runTime: 99,
  genre: genres[index],
  released: years[index],
  isFavorite: !!(Math.random() > 0.5),
}));

export { films };
