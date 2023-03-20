import React from 'react';

interface Props {
  path: string;
}

const BackgroundLayout: React.FC<Props> = ({ path, children }) => (
  <div
    style={{
      background: `url(https://image.tmdb.org/t/p/original${path}) no-repeat fixed 0px 0px/100vw 100vh`,
    }}
  >
    {children}
  </div>
);

export default BackgroundLayout;
