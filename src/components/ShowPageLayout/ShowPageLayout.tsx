import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWatchShow } from '../../store';
import { TvShow } from '../../types/types';

interface Props {
  showId: number;
  children: (props: {
    show: TvShow | null;
    similar: TvShow[];
    recommendations: TvShow[];
    watchLink: string;
  }) => JSX.Element;
}

const ShowPageLayout: React.FC<Props> = ({ showId, children }) => {
  const {
    loadShow,
    showData: { show, similar, recommendations },
    clear,
  } = useWatchShow();
  const { i18n } = useTranslation();
  const watchLink = useMemo(() => `/shows/play/${showId}`, [showId]);

  useEffect(() => {
    loadShow(showId);

    return () => {
      clear();
    };
  }, [showId, i18n.language]);

  return children({ show, similar, recommendations, watchLink });
};

export default ShowPageLayout;
