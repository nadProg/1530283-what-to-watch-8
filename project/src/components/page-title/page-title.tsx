import classNames from 'classnames';

type PageTitleProps = {
  hidden?: boolean
  children: React.ReactNode,
  className?: string,
}

function PageTitle({className, children, hidden = false}: PageTitleProps): JSX.Element {
  return <h1 className={classNames(hidden ? 'visually-hidden' : 'page-title', className)} data-testid="page-title">{children}</h1>;
}

export default PageTitle;
