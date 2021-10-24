import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useIdParam } from '../../hooks/useIdParams';
import { getСurrentFilm } from '../../store/api-actions';
import type { Film, State, ThunkAppDispatch } from '../../types/types';
import { formatElapsedTime } from '../../utils/date';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const mapStateToProps = ({currentFilm}: State) => ({
  fetchedFilm: currentFilm,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentFilm(id: number) {
    dispatch(getСurrentFilm(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PlayerScreen({fetchedFilm, fetchCurrentFilm}: PropsFromRedux): JSX.Element {
  const id = useIdParam();

  const history = useHistory();

  useEffect(() => {
    fetchCurrentFilm(id);
  }, [id]);

  if (isFetchNotReady(fetchedFilm)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilm)) {
    return <NotFoundScreen />;
  }

  const handleExitButtonClick = () => {
    history.goBack();
  };

  const currentFilm = fetchedFilm.data as Film;

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
