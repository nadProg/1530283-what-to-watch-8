import { connect, ConnectedProps } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import type { ParamsWithId, Film, State } from '../../types/types';
import { formatElapsedTime } from '../../utils/date';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import { getFilmById } from '../../utils/films';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const mapStateToProps = ({films, currentComments}: State) => ({
  fetchedFilms: films,
  fetchedComments: currentComments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PlayerScreen({fetchedFilms}: PropsFromRedux): JSX.Element {
  const { id } = useParams() as ParamsWithId;

  const history = useHistory();

  // Здесь будет загрузка текущего фильма и комментариев по ID

  if (isFetchNotReady(fetchedFilms)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilms)) {
    return <NotFoundScreen />;
  }

  const handleExitButtonClick = () => {
    history.goBack();
  };

  const films = fetchedFilms.data as Film[];
  const currentFilm = getFilmById(films, Number(id));

  const progress = Math.random();
  const playerProgress = Number((progress * 100).toFixed(2));
  const timeElapsed = currentFilm.runTime * (1 - progress);

  return (
    <div className="player">
      <video src={currentFilm.videoLink} className="player__video" poster={currentFilm.previewImage}></video>

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
          <div className="player__name">{currentFilm.name}</div>

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

export { PlayerScreen };
export default connector(PlayerScreen);
