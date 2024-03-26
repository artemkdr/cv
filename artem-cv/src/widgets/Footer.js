import React from 'react';
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className="copyright">{t('BuildWith')}<br/>&copy; {new Date().getFullYear()} {t('Copyright')}</div>
        </div>
    )
}
export default Footer;