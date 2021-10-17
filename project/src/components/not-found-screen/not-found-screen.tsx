import { Link } from 'react-router-dom';
import PageTitle from '../page-title/page-title';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <PageTitle>This page does not exist</PageTitle>
      <Link to="/">Go to main page</Link>
    </section>
  );
}

export default NotFoundScreen;
