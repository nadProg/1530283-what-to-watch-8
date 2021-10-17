import { joinStrings } from '../../utils/common';

type PageTitleProps = {
  hidden?: boolean
  children: React.ReactNode,
  className?: string,
}

function PageTitle({className, children, hidden = false}:PageTitleProps): JSX.Element {
  const baseClassName = hidden ? 'visually-hidden' : 'page-title';
  const fullClassName = className ? joinStrings(baseClassName, className) : baseClassName;

  return <h1 className={fullClassName}>{children}</h1>;
}

export default PageTitle;
