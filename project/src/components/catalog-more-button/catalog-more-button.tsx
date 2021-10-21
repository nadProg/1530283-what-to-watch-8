type CatalogMoreButtonProps = {
  onClick: () => void;
}

function CatalogMoreButton({onClick}: CatalogMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
}

export default CatalogMoreButton;
