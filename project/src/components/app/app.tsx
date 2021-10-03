import MainScreen from '../main-screen/main-screen';

type MainFilmCard = {
  title: string,
  genre: string,
  year: number,
}

const mainFilmCard: MainFilmCard = {
  title: 'The Grand Budapest Hotel',
  genre:  'Drama',
  year: 2014,
};

function App(): JSX.Element {
  return <MainScreen mainFilmCard={mainFilmCard}/>;
}

export default App;
