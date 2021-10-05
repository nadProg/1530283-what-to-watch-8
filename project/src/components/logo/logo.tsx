import { Link } from 'react-router-dom';
import type { LogoProps } from '../../types/types';

const BASE_CLASS = 'logo__link';

function Logo({ theme }: LogoProps): JSX.Element {
  const themedClassName = theme ? `${BASE_CLASS}--${theme}` : '';
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
