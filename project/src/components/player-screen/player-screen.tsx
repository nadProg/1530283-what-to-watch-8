import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import round from 'lodash/round';
import { AppRoute } from '../../constants';
import { formatElapsedTime } from '../../utils/date';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import { useVideo } from '../../hooks/useVideo';
import { useIdParam } from '../../hooks/useIdParams';
import { getСurrentFilm } from '../../store/films/films-api-actions';
import { getCurrentFilmData, getCurrentFilmStatus } from '../../store/films/films-selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Spinner from '../spinner/spinner';

const TOGGLER_POSITION_DECIMAL_PRECISION = 2;

function PlayerScreen(): JSX.Element {
  const filmId = useIdParam();

  const film = useSelector(getCurrentFilmData);
  const filmStatus = useSelector(getCurrentFilmStatus);

  const dispatch = useDispatch();

  const fetchCurrentFilm = (id: number) => {
    dispatch(getСurrentFilm(id));
  };

  useEffect(() => {
    if (film?.id === filmId) {
      return;
    }

    fetchCurrentFilm(filmId);
  }, [filmId]);

  const {
    ref: videoRef,
    isPlay: isVideoPlay,
    isReady: isVideoReady,
    duration: videoDuration,
    percentage: videoPercentage,
    elapsedTime: videoElapsedTime,
    togglePlay: toggleVideoPlay,
    onLoadedData: onVideoLoadedData,
    onTimeUpdate: onVideoTimeUpdate,
    requestFullScreen: requestVideoFullScreen,
  } = useVideo();

  if (isFetchNotReady(filmStatus)) {
    return <LoadingScreen />;
  }

  if (isFetchError(filmStatus) || !film) {
    return <NotFoundScreen />;
  }

  const onFullScreenButtonClick = () => {
    requestVideoFullScreen();
  };

  const onPlayButtonClick = () => {
    toggleVideoPlay();
  };

  const togglerLeftPosition = `${round(videoPercentage, TOGGLER_POSITION_DECIMAL_PRECISION)}%`;
  const playButtonIcon = isVideoPlay ? '#pause' : '#play-s';
  const timeValueTextContent = isVideoReady ? formatElapsedTime(videoElapsedTime) : 'Loading...';

  return (
    <div className="player">
      {!isVideoReady && <Spinner />}

      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.previewImage}
        onTimeUpdate={onVideoTimeUpdate}
        onLoadedData={onVideoLoadedData}
      />

      <Link
        to={AppRoute.Film(filmId)}
        className="player__exit"
        style={{ textDecoration: 'none' }}
      >
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={videoDuration - videoElapsedTime}
              max={videoDuration}
            />
            <div
              className="player__toggler"
              style={{ left: togglerLeftPosition }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {timeValueTextContent}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayButtonClick}
            disabled={!isVideoReady}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={playButtonIcon}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenButtonClick}
            disabled={!isVideoReady}
          >
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
