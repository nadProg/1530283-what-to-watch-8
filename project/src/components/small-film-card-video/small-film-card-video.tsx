type SmallFilmCardVideoProps = {
  src: string,
  poster?: string,
}

function SmallFilmCardVideo({src, poster}: SmallFilmCardVideoProps): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video src={src} autoPlay muted poster={poster} width="280" height="175" style={{objectFit: 'cover'}} />
    </div>
  );
}

export default SmallFilmCardVideo;
