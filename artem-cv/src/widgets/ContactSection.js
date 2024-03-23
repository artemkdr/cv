import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <div className='contact'>
            <h2 className="first">{t('Contact.Title')}</h2>
            <div className="line phone">
                <div className="icon"></div>
                <a href={'tel:' + t('Contact.Phone')}>{t('Contact.PhoneFormatted')}</a>
                </div>
            <div className="line email">
                <div className="icon"></div>
                <a href={'mailto:' + t('Contact.Email')} target="_blank" rel="noopener noreferrer">{t('Contact.Email')}</a>
                </div>
            <div className="line linkedin">
                <div className="icon"></div>
                <a href={t('Contact.Linkedin')} target="_blank" rel="noopener noreferrer">{t('Contact.LinkedinLabel')}</a>
            </div>
            <div className="line github">
                <div className="icon"></div>
                <a href={t('Contact.Github')} target="_blank" rel="noopener noreferrer">{t('Contact.GithubLabel')}</a>
            </div>
            <div className="line address">
                <div className="icon"></div>
                <div>{t('Contact.Address')}</div>
            </div>   
        </div>
    );
}

export default ContactSection;