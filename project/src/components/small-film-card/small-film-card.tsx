import { Link, useHistory } from 'react-router-dom';
import type { Film } from '../../types/types';
import { AppRoute } from '../../constants';
import { useEffect, useState, useRef } from 'react';
import SmallFilmCardVideo from '../small-film-card-video/small-film-card-video';
import SmallFilmCardImage from '../small-film-card-image/small-film-card-image';

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
    <article className={fullClassName} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => history.push(AppRoute.Film(film.id))}>
      {
        isDelayedHovered ?
          <SmallFilmCardVideo src={film.previewVideoLink} poster={film.previewImage} /> :
          <SmallFilmCardImage src={film.previewImage} alt={film.name} />
      }
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film(film.id)} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
