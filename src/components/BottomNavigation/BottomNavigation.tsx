import React, { useEffect, useState } from 'react';
import TvIcon from '@mui/icons-material/Tv';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLocation, useNavigate } from 'react-router-dom';

type Route = {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  route: string;
};

interface Props {
  children: (props: {
    routes: Route[];
    currentRoute: Route;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: Route) => void;
  }) => JSX.Element;
}

const routes = [
  { label: 'Home', Icon: HomeOutlinedIcon, route: '/' },
  { label: 'Movies', Icon: MovieOutlinedIcon, route: '/movies' },
  { label: 'Shows', Icon: TvIcon, route: '/shows' },
  { label: 'Profile', Icon: PermIdentityOutlinedIcon, route: '/profile' },
];

const BottomNavigation: React.FC<Props> = ({ children }) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const getRoute = () =>
    routes.find(({ label }) => path.includes(label.toLocaleLowerCase())) || routes[0];

  const [currentRoute, setCurrentRoute] = useState(getRoute());

  useEffect(() => {
    setCurrentRoute(getRoute());
  }, [useLocation().pathname]);

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: Route) =>
    navigate(value.route);

  return children({ routes, currentRoute, onChange: handleChange });
};

export default BottomNavigation;
