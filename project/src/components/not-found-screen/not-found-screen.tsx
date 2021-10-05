import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <h1>This page does not exist</h1>
      <Link to="/">Go to main page</Link>
    </section>
  );
}

export default NotFoundScreen;
