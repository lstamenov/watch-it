import React from 'react';
import ShowLayout from '../../layouts/ShowLayout/ShowLayout';
import { default as ShowLayoutUI } from '../../ui/ShowLayout/ShowLayout';
import NotFound from '../NotFound/NotFound';
import { TvShow } from '../../types/types';
import Page from '../../ui/Page/Page';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';

const Show: React.FC = () => {
  const renderContent = (
    show: TvShow | null,
    similarShows: TvShow[],
    recommendedShows: TvShow[],
  ) => {
    if (show) {
      return (
        <ShowLayoutUI show={show} similarShows={similarShows} recommendedShows={recommendedShows} />
      );
    }

    return <NotFound />;
  };

  return (
    <AnimatedPage>
      <Page>
        <ShowLayout>
          {(props) => renderContent(props.show, props.similarShows, props.recommendedShows)}
        </ShowLayout>
      </Page>
    </AnimatedPage>
  );
};

export default Show;
