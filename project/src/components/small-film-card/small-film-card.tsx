import { Link, useHistory } from 'react-router-dom';
import type { Film } from '../../types/types';
import { AppRoute } from '../../constants';
import { useEffect, useState, useRef } from 'react';

const HOVER_DELAY = 1000;

const VIDEO_WRAPPER_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

type SmallFilmCardProps = {
  film: Film,
}

function SmallFilmCard({film}: SmallFilmCardProps): JSX.Element {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [ isHovered, setHovered ] = useState(false);
  const [ isDelayedHovered, setDelayedHovered ] = useState(false);

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
    <article className="small-film-card catalog__films-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => history.push(AppRoute.Film(film.id))}>
      {
        isDelayedHovered ?
          <div style={VIDEO_WRAPPER_STYLES}>
            <video src={film.previewVideoLink} autoPlay muted poster={film.previewImage} width="280" height="175" style={{objectFit: 'cover'}} />
          </div> :
          <div className="small-film-card__image">
            <img src={film.posterImage} alt={film.name} width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film(film.id)} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
