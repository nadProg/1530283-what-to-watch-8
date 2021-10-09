function GenreFilter(): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      <li className="catalog__genres-item catalog__genres-item--active">
        <a href="#all-genres" className="catalog__genres-link">All genres</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#comedy" className="catalog__genres-link">Comedies</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#crime" className="catalog__genres-link">Crime</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#documentary" className="catalog__genres-link">Documentary</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#dramas" className="catalog__genres-link">Dramas</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#horror" className="catalog__genres-link">Horror</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#kids-n-family" className="catalog__genres-link">Kids & Family</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#romance" className="catalog__genres-link">Romance</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#sci-fi" className="catalog__genres-link">Sci-Fi</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#thrillers" className="catalog__genres-link">Thrillers</a>
      </li>
    </ul>
  );
}

export default GenreFilter;
