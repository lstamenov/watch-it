import React, { useEffect, useState } from 'react';
import TvIcon from '@mui/icons-material/Tv';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';
import { useTranslation } from 'react-i18next';

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

const BottomNavigation: React.FC<Props> = ({ children }) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  const routes = [
    { label: t('HOME'), Icon: HomeOutlinedIcon, route: '/' },
    { label: t('MOVIES'), Icon: MovieOutlinedIcon, route: '/movies' },
    { label: t('SHOWS'), Icon: TvIcon, route: '/shows' },
    user
      ? { label: t('PROFILE'), Icon: PermIdentityOutlinedIcon, route: '/profile' }
      : { label: t('SIGN_IN'), Icon: LoginOutlinedIcon, route: '/login' },
  ];

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
