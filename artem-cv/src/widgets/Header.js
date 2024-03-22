import React from 'react';
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className='header profile-photo'>
        <h1>{t('FullName')}</h1>
        <h2>{t('JobTitle')}</h2>
        </div>
    )
}
export default Header;