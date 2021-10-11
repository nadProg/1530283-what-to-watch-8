import Logo from '../logo/logo';

function PageFooter(): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo footer />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default PageFooter;
