import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lang, langs } from '../../i18n/langs';

interface Props {
  children: (props: {
    langs: Lang[];
    selectedLang: Lang;
    onSelectLanguage: (newLang: string) => void;
  }) => JSX.Element;
}

const LanguageSelector: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const defaultLang = langs[0];

  const handleSelectLanguage = (newLang: string) => i18n.changeLanguage(newLang);

  const selectedLang = langs.find((val) => val.id === i18n.language);

  console.log(selectedLang);

  return children({
    langs,
    selectedLang: selectedLang || defaultLang,
    onSelectLanguage: handleSelectLanguage,
  });
};

export default LanguageSelector;
