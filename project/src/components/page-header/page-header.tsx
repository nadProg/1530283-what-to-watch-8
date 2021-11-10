import classNames from 'classnames';

const BASE_CLASS_NAME = 'page-header';

type PageHeaderProps = {
  children: React.ReactNode,
  className?: string,
}

function PageHeader({className, children}: PageHeaderProps): JSX.Element {
  return <header className={classNames(BASE_CLASS_NAME, className)} data-testid="page-header">{children}</header>;
}

export default PageHeader;
