import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../i18n';
import Select from 'react-select';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (selected : any) => {
    i18n.changeLanguage(selected?.value);
  };

  const options = supportedLngs?.map((lang) => ({
    value: lang,
    label: t(`i18Languages.${lang}`)
  }));

  return (
    <div className='language-selector'>
      <Select 
        className='react-select'
        classNamePrefix='react-select'
        onChange={handleChange} 
        value={options?.find(option => option.value === i18n.language)}
        options={options}
        isSearchable={false} />
    </div>
  );
};

export default LanguageSelector;
