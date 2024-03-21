import './App.css';

import React from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

import ContactSection from "./widgets/ContactSection.js"
import SkillsSection from './widgets/SkillsSection.js';
import SimpleSection from './widgets/SimpleSection.js';
import JobSection from './widgets/JobSection.js';
import Footer from './widgets/Footer.js';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// Initialize i18next with translations
i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
  detection: { 
    order: ['querystring', 'localStorage', 'navigator'],
    lookupQuerystring: 'lang',
  },
  backend: {
    loadPath: 'locales/{{lng}}.json', // Path to load translation files
  },
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr']
});

function App() {
  const { t } = useTranslation();

  const [isDarkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    if (checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  const getTranslationsList = (key) => {
    var o = t(key + ".List", { returnObjects: true });
    var list = [];
    if (typeof(o) === 'object' && o.length > 0) {
        for (var i = 0; i < o.length; i++) {
          var k = key + ".List." + i;
          list.push(t(k));
        }
    }
    return list;
  } 

  let jobs = t('Jobs.List', { returnObjects: true });
  
  return (
    <div class='ext'>
      <DarkModeSwitch style={{ position: 'absolute', top: '10px', right: '10px' }} checked={isDarkMode} onChange={toggleDarkMode} size={25} />
      <div className='header profile-photo'>
        <h1>{t('FullName')}</h1>
        <h2>{t('JobTitle')}</h2>
      </div>
      <div className='container'>      
        <div className='left-pane'>
          <ContactSection />
          <div class="delimiter dotted"></div>
          <SkillsSection title={t('Expertise.Title')} items={getTranslationsList("Expertise")} />
          <SkillsSection title={t('TechSkills.Title')} items={getTranslationsList("TechSkills")} />
          <SkillsSection title={t('SoftSkills.Title')} items={getTranslationsList("SoftSkills")} />
          <SkillsSection title={t('Education.Title')} items={getTranslationsList("Education")} />
          <SkillsSection title={t('Languages.Title')} items={getTranslationsList("Languages")} />
          <SimpleSection title={t('About.Title')} text={t('About.Text')} />
        </div>
        <div className='right-pane'>
          <h2>{t('Jobs.Title')}</h2>
          {jobs?.map((item, index) => (
            <JobSection job={item}  />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
