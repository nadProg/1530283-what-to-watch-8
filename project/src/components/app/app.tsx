import MainScreen from '../main-screen/main-screen';
import type {MainFilmCard} from '../../types/types';

const mainFilmCard: MainFilmCard = {
  title: 'The Grand Budapest Hotel',
  genre:  'Drama',
  year: 2014,
};

function App(): JSX.Element {
  return <MainScreen mainFilmCard={mainFilmCard}/>;
}

export default App;
