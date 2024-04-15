import './App.css';

import React, { useState } from 'react';
// Initialize i18next with translations
import './i18n';
import { useTranslation } from 'react-i18next';
import ContactSection from "./widgets/ContactSection"
import SkillsSection from './widgets/SkillsSection';
import SimpleSection from './widgets/SimpleSection';
import JobSection from './widgets/JobSection';
import Header from './widgets/Header';
import Footer from './widgets/Footer';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkMode from './helpers/useDarkMode';
import useTranslationsList from './helpers/useTranslationsList';
import LanguageSelector from './widgets/LanguageSelector';
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCommentDots, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import 'react-chatbot-kit/build/main.css';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();  
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const jobs : any[] = t('Jobs.List', { returnObjects: true });
  
  const chatbotConfig = {
    botName: t('Chatbot.BotName'),
    initialMessages: [createChatBotMessage(t('Chatbot.Salutation'), {})]
  };

  const handleChatBtnClick = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };
  const handleCloseChatBtnClick = () => {
    setIsChatbotVisible(false);
  };

  return (
    <div className='ext'> 

      <button className='chat-button' onClick={handleChatBtnClick} >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isChatbotVisible && <button className='close-chat-button' onClick={handleCloseChatBtnClick} >
        <FontAwesomeIcon icon={faClose} />
      </button>}

      {isChatbotVisible && 
        <Chatbot 
          config={chatbotConfig}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          headerText={t('Chatbot.Title')}
          placeholderText={t('Chatbot.Placeholder')}
          />}

      <a href={t('Contact.PDFLink')} className='download-pdf-button' target='blank' rel="noopener noreferrer" title={t('Contact.PDFLinkTitle')}>
        <FontAwesomeIcon icon={faFilePdf} />
      </a>
      
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
          <div className="delimiter dotted"></div>
          <SkillsSection title={t('Expertise.Title')} items={useTranslationsList("Expertise")} />
          <SkillsSection title={t('TechSkills.Title')} items={useTranslationsList("TechSkills")} />
          <SkillsSection title={t('SoftSkills.Title')} items={useTranslationsList("SoftSkills")} />
          <SkillsSection title={t('Education.Title')} items={useTranslationsList("Education")} />
          <SkillsSection title={t('Languages.Title')} items={useTranslationsList("Languages")} />
          <SimpleSection title={t('About.Title')} text={t('About.Text')} />
        </div>
        <div className='right-pane'>
          <h2>{t('Jobs.Title')}</h2>
          {jobs?.map((item : any, index : number) => (
            <JobSection job={item} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
