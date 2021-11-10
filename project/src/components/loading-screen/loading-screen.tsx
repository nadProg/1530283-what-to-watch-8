import { CSSProperties } from 'react';
import InfoScreen from '../info-screen/info-screen';
import PageTitle from '../page-title/page-title';

const LOADER_STYLES: CSSProperties = {
  margin: 'auto',
  background: 'transparent',
  display: 'block',
  shapeRendering: 'auto',
};

function LoadingScreen(): JSX.Element {
  return (
    <InfoScreen>
      <PageTitle hidden>Loading screen</PageTitle>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={LOADER_STYLES} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <rect x="15" y="30" width="10" height="40" fill="#df5127">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.6"></animate>
        </rect>
        <rect x="35" y="30" width="10" height="40" fill="#e06a45">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.4"></animate>
        </rect>
        <rect x="55" y="30" width="10" height="40" fill="#df9984">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.2"></animate>
        </rect>
        <rect x="75" y="30" width="10" height="40" fill="#d6b1a6">
          <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-1"></animate>
        </rect>
      </svg>
    </InfoScreen>
  );
}

export default LoadingScreen;
