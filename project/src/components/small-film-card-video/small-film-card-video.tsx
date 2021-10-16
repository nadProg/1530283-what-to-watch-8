import { useRef, useEffect } from 'react';

type SmallFilmCardVideoProps = {
  src: string,
  isPlay: boolean,
  poster?: string,
}

function SmallFilmCardVideo({src, poster, isPlay = false}: SmallFilmCardVideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoNode = videoRef.current;

    if (!videoNode) {
      return;
    }

    if (isPlay) {
      videoNode.play();
      return;
    }

    videoNode.load();
  }, [isPlay]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video ref={videoRef} src={src} muted poster={poster} width="280" height="175" style={{objectFit: 'cover'}} />
    </div>
  );
}

export default SmallFilmCardVideo;
