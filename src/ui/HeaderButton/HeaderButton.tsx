import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import NavButton from '../../components/navButton/NavButton';

interface Props {
  title: string;
  path: string;
}

const HeaderButton: React.FC<Props> = ({ title, path }) => {
  const currentPath = useLocation().pathname;

  const isActive = useMemo(() => {
    if (path === currentPath) return true;

    if (path !== '/' && currentPath.includes(path)) return true;

    return false;
  }, [currentPath]);

  return <NavButton text={title} path={path} isClicked={isActive} />;
};

export default HeaderButton;
