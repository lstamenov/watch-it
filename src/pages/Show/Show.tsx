import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ShowPageLayout from '../../components/ShowPageLayout/ShowPageLayout';
import { useWatchShow } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { default as ShowPageLayoutUI } from '../../ui/ShowPageLayout/ShowPageLayout';

const Show: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const showId = id ? Number(id) : -1;
  const {
    showData: { status },
  } = useWatchShow();

  const Content = useMemo(
    () => (
      <ShowPageLayout showId={showId}>{(props) => <ShowPageLayoutUI {...props} />}</ShowPageLayout>
    ),
    [showId],
  );

  return <AnimatedPage isLoading={status === 'pending'}>{Content}</AnimatedPage>;
};

export default Show;
