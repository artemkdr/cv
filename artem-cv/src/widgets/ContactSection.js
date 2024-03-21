import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <div className='contact'>
            <h2 className="first">{t('ContactTitle')}</h2>
            <div className="line phone"><div className="icon"></div><a href={'tel:' + t('Phone')}>{t('PhoneFormatted')}</a></div>
            <div className="line email"><div className="icon"></div><a href={'mailto:' + t('Email')}>{t('Email')}</a></div>
            <div className="line linkedin"><div className="icon"></div><a href="https://www.linkedin.com/in/artem-kudryavtsev-8937144/">{t('LinkedinLabel')}</a></div>
            <div className="line address"><div className="icon"></div><div>{t('Address')}</div></div>   
        </div>
    );
}

export default ContactSection;