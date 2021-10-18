import classNames from 'classnames';

const BASE_CLASSNAME = 'page-header';

type PageHeaderProps = {
  children: React.ReactNode,
  className?: string,
}

function PageHeader({className, children}: PageHeaderProps): JSX.Element {
  return <header className={classNames(BASE_CLASSNAME, className)}>{children}</header>;
}

export default PageHeader;
