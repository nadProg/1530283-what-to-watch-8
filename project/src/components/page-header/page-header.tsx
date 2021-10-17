import { joinStrings } from '../../utils/common';

const BASE_CLASSNAME = 'page-header';

type PageHeaderProps = {
  children: React.ReactNode,
  className?: string,
}

function PageHeader({className, children}: PageHeaderProps): JSX.Element {
  const fullClassName = className ? joinStrings(BASE_CLASSNAME, className) : BASE_CLASSNAME;

  return <header className={fullClassName}>{children}</header>;
}

export default PageHeader;
