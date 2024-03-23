import './App.css';

import React from 'react';
// Initialize i18next with translations
import './i18n';
import { useTranslation } from 'react-i18next';
import ContactSection from "./widgets/ContactSection.js"
import SkillsSection from './widgets/SkillsSection.js';
import SimpleSection from './widgets/SimpleSection.js';
import JobSection from './widgets/JobSection.js';
import Header from './widgets/Header.js';
import Footer from './widgets/Footer.js';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkMode from './helpers/useDarkMode.js';
import useTranslationsList from './helpers/useTranslationsList.js';
import LanguageSelector from './widgets/LanguageSelector.js';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

function App() {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();  

  let jobs = t('Jobs.List', { returnObjects: true });
  
  return (
    <div class='ext'> 
      <ThemeProvider theme={{background: '#ffffff', headerBgColor: '#2196F3', fontFamily: 'Roboto Condensed', botFontColor: '#222', userFontColor: '#222' }}>
        <ChatBot 
          floating={true}
          steps={[
            { id: '1', message: 'What is your name?', trigger: '2' },
            { id: '2', user: true, trigger: '3'},
            { id: '3', message: 'Hi {previousValue}, nice to meet you!' }
          ]} />    
      </ThemeProvider>
      <LanguageSelector />
      <DarkModeSwitch 
        style={{ position: 'absolute', top: '10px', right: '10px' }} 
        checked={isDarkMode} 
        onChange={toggleDarkMode} 
        size={25} />
      <Header />
      <div className='container'>      
        <div className='left-pane'>
          <ContactSection />
          <div class="delimiter dotted"></div>
          <SkillsSection title={t('Expertise.Title')} items={useTranslationsList("Expertise")} />
          <SkillsSection title={t('TechSkills.Title')} items={useTranslationsList("TechSkills")} />
          <SkillsSection title={t('SoftSkills.Title')} items={useTranslationsList("SoftSkills")} />
          <SkillsSection title={t('Education.Title')} items={useTranslationsList("Education")} />
          <SkillsSection title={t('Languages.Title')} items={useTranslationsList("Languages")} />
          <SimpleSection title={t('About.Title')} text={t('About.Text')} />
        </div>
        <div className='right-pane'>
          <h2>{t('Jobs.Title')}</h2>
          {jobs?.map((item, index) => (
            <JobSection job={item} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
