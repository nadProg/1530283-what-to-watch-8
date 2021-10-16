import { Link, useHistory } from 'react-router-dom';
import type { Film } from '../../types/types';
import { AppRoute } from '../../constants';
import { useEffect, useState, useRef } from 'react';
import SmallFilmCardVideo from '../small-film-card-video/small-film-card-video';

const BASE_CLASSNAME = 'small-film-card';

const HOVER_DELAY = 1000;

type SmallFilmCardProps = {
  film: Film,
  className?: string;
}

function SmallFilmCard({film, className}: SmallFilmCardProps): JSX.Element {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [ isHovered, setHovered ] = useState(false);
  const [ isDelayedHovered, setDelayedHovered ] = useState(false);

  const fullClassName = `${BASE_CLASSNAME} ${className}`.trim();

  const history = useHistory();

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    clearTimer();

    if (!isHovered) {
      if (isDelayedHovered) {
        setDelayedHovered(false);
      }

      return;
    }

    timer.current = setTimeout(() => {
      if (!isHovered) {
        if (isDelayedHovered) {
          setDelayedHovered(false);
        }

        return;
      }

      setDelayedHovered(true);
    }, HOVER_DELAY);

    return clearTimer;
  }, [isHovered]);

  return (
    <article
      className={fullClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => history.push(AppRoute.Film(film.id))}
    >
      <SmallFilmCardVideo
        src={film.previewVideoLink}
        isPlay={isDelayedHovered}
        poster={film.previewImage}
      />
      <h3 className="small-film-card__title">
        <Link
          to={AppRoute.Film(film.id)}
          className="small-film-card__link"
        >{film.name}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
