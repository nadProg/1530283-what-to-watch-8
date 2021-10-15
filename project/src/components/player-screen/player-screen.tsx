import { useHistory, useParams } from 'react-router-dom';
import type { ParamsWithId, Film } from '../../types/types';
import { formatElapsedTime } from '../../utils/date';

export type PlayerScreenProps = {
  getFilmById: (id: number) => Film,
}

function PlayerScreen({getFilmById}: PlayerScreenProps): JSX.Element {
  const { id } = useParams() as ParamsWithId;
  const film = getFilmById(Number(id));
  const history = useHistory();

  const handleExitButtonClick = () => {
    history.goBack();
  };

  const progress = Math.random();
  const playerProgress = Number((progress * 100).toFixed(2));
  const timeElapsed = film.runTime * (1 - progress);

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.posterImage}></video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${playerProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatElapsedTime(timeElapsed)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
