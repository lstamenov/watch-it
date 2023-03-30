import React from 'react';
import { default as BottomNavigationMUI } from '@mui/material/BottomNavigation';
import { BottomNavigationAction, SvgIconTypeMap } from '@mui/material';
import styles from './BottomNavigation.module.css';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Route = {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  route: string;
};

interface Props {
  routes: Route[];
  currentRoute: Route;
  onChange: (event: React.SyntheticEvent<Element, Event>, value: Route) => void;
}

const BottomNavigation: React.FC<Props> = ({ routes, currentRoute, onChange }) => {
  return (
    <BottomNavigationMUI
      sx={{
        '& .Mui-selected': {
          color: '#b45177',
        },
      }}
      value={currentRoute}
      onChange={onChange}
      showLabels
      className={styles.nav}
    >
      {routes.map((route) => (
        <BottomNavigationAction
          value={route}
          key={route.label}
          icon={
            <route.Icon style={route.route === currentRoute.route ? { color: '#b45177' } : {}} />
          }
          label={route.label}
          sx={route.route === currentRoute.route ? { color: '#b45177' } : { color: '#aa7489' }}
        />
      ))}
    </BottomNavigationMUI>
  );
};

export default BottomNavigation;
