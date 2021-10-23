import { CSSProperties, ReactNode } from 'react';

const INFO_SCREEN_STYLES: CSSProperties = {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

type InfoScreenProps = {
  children?: ReactNode,
}

function InfoScreen({children}: InfoScreenProps): JSX.Element {
  return (
    <div className="page-content" style={INFO_SCREEN_STYLES}>
      {children}
    </div>
  );
}

export default InfoScreen;
