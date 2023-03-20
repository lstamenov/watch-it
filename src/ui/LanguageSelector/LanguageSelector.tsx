import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './LanguageSelector.module.css';
import { Lang } from '../../i18n/langs';
import { Tooltip } from '@mui/material';
import { t } from 'i18next';

interface Props {
  langs: Lang[];
  selectedLang: Lang;
  onSelectLanguage: (newLang: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ langs, selectedLang, onSelectLanguage }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLangClick = (lang: string) => () => {
    onSelectLanguage(lang);
    handleClose();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 20px 0 20px',
        }}
      >
        <Tooltip title={t('CHANGE_LANGUAGE') || ''}>
          <div onClick={handleClick} className={styles.selector}>
            {<selectedLang.Icon width={28} height={28} />}
            <FontAwesomeIcon color="#AA7489" fontSize={22} icon={faAngleDown} />
          </div>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            backgroundColor: '#4F4F4F',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#4F4F4F',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              padding: '0 5px 0 5px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {langs.map(({ id, Icon }) => (
          <MenuItem disabled={id === selectedLang.id} key={id} onClick={onLangClick(id)}>
            <Icon width={22} height={22} />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default LanguageSelector;
