import { Link } from 'react-router-dom';

const BASE_CLASS = 'logo__link';

type LogoProps = {
  footer?: boolean,
}

function Logo({ footer }: LogoProps): JSX.Element {
  const themedClassName = footer ? `${BASE_CLASS}--light` : '';
  const fullClassName = `${BASE_CLASS} ${themedClassName}`;

  return (
    <div className="logo">
      <Link to="/" className={fullClassName}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
