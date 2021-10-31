import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { formatElapsedTime } from '../../utils/date';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import { useIdParam } from '../../hooks/useIdParams';
import { getСurrentFilm } from '../../store/films/films-api-actions';
import {
  getCurrentFilmData,
  getCurrentFilmStatus
} from '../../store/films/films-selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loader from '../loader/loader';

function PlayerScreen(): JSX.Element {
  const filmId = useIdParam();

  const film = useSelector(getCurrentFilmData);
  const filmStatus = useSelector(getCurrentFilmStatus);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoReady, setVideoReady] = useState(false);
  const [isVideoPlay, setVideoPlay] = useState(false);
  const [isVideoFullScreen, setVideoFullScreen] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const dispatch = useDispatch();

  const fetchCurrentFilm = (id: number) => {
    dispatch(getСurrentFilm(id));
  };

  const playVideo = async (node: HTMLVideoElement) => {
    try {
      await node.play();
    } catch {
      setVideoPlay(false);
    }
  };

  useEffect(() => {
    if (film?.id === filmId) {
      return;
    }

    fetchCurrentFilm(filmId);
  }, [filmId]);

  useEffect(() => {
    if (!isVideoReady || !videoRef.current) {
      return;
    }

    const videoNode = videoRef.current;

    setDuration(videoNode.duration);
    setElapsedTime(videoNode.duration);
    setVideoPlay(true);
  }, [isVideoReady]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const videoNode = videoRef.current;

    if (isVideoPlay) {
      playVideo(videoNode);
      return;
    }

    videoNode.pause();
  }, [isVideoPlay]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const videoNode = videoRef.current;

    if (isVideoFullScreen) {
      videoNode.requestFullscreen();
      setVideoFullScreen(false);
    }
  }, [isVideoFullScreen]);

  if (isFetchNotReady(filmStatus)) {
    return <LoadingScreen />;
  }

  if (isFetchError(filmStatus) || !film) {
    return <NotFoundScreen />;
  }

  const hanldeVideoLoadedData = () => {
    setVideoReady(true);
  };

  const handleVideoTimeUpdate = () => {
    const videoNode = videoRef.current as HTMLVideoElement;
    const currentProgress = videoNode.currentTime / duration;
    const currentElapsedTime = duration * (1 - currentProgress);
    setProgress(currentProgress);
    setElapsedTime(currentElapsedTime);
  };

  const handleFullScreenButtonClick = () => {
    setVideoFullScreen(true);
  };

  const handlePlayButtonClick = () => {
    setVideoPlay((prevPlayState) => !prevPlayState);
  };

  return (
    <div className="player">
      {!isVideoReady && <Loader />}

      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.previewImage}
        onTimeUpdate={handleVideoTimeUpdate}
        onLoadedData={hanldeVideoLoadedData}
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
              value={progress}
              max={duration}
            />
            <div
              className="player__toggler"
              style={{ left: `${Math.round(progress * 100)}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {isVideoReady ? formatElapsedTime(elapsedTime) : 'Loading...'}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePlayButtonClick}
            disabled={!isVideoReady}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isVideoPlay ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenButtonClick}
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
