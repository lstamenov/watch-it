import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  currentTab: 'movies' | 'shows';
  setCurrentTab: (tab: 'movies' | 'shows') => void;
}

const GenresTab: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  const { t } = useTranslation();

  const onTabChange = (event: React.SyntheticEvent, newValue: 'movies' | 'shows') =>
    setCurrentTab(newValue);

  return (
    <Tabs
      variant="fullWidth"
      centered
      onChange={onTabChange}
      value={currentTab}
      TabIndicatorProps={{ style: { backgroundColor: '#b45177' } }}
      sx={{
        marginTop: '25px',
        marginBottom: '20px',
        '.Mui-selected': {
          color: '#b45177 !important',
          borderColor: '#b45177',
        },
      }}
    >
      <Tab
        sx={{
          fontSize: '22px',
          color: '#AA7489',
          fontWeight: 700,
        }}
        label={t('MOVIES')}
        value="movies"
      />
      <Tab
        sx={{
          fontSize: '22px',
          color: '#AA7489',
          fontWeight: 700,
        }}
        label={t('SHOWS')}
        value="shows"
      />
    </Tabs>
  );
};

export default GenresTab;
