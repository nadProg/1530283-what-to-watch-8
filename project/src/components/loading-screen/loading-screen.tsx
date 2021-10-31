import InfoScreen from '../info-screen/info-screen';
import Loader from '../loader/loader';
import PageTitle from '../page-title/page-title';

function LoadingScreen(): JSX.Element {
  return (
    <InfoScreen>
      <PageTitle hidden>Loading screen</PageTitle>
      <Loader />
    </InfoScreen>
  );
}

export default LoadingScreen;
