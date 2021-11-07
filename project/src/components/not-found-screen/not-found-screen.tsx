import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import InfoScreen from '../info-screen/info-screen';
import PageTitle from '../page-title/page-title';

function NotFoundScreen(): JSX.Element {
  return (
    <InfoScreen>
      <PageTitle>This page does not exist</PageTitle>
      <p>
        <Link to={AppRoute.Root()} style={{color: 'inherit', textDecoration: 'none'}}>
          Go to main page
        </Link>
      </p>
    </InfoScreen>
  );
}

export default NotFoundScreen;
