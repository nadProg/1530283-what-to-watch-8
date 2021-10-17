type PageContentProps = {
  children: React.ReactNode,
}

function PageContent({children}:PageContentProps): JSX.Element {
  return <div className="page-content">{children}</div>;
}

export default PageContent;
