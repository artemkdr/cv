import React from 'react';
import i18n from '../i18n';

const ActionProvider = ({ createChatBotMessage, setState, children } : {
  createChatBotMessage: Function,
  setState: Function,
  children: React.ReactNode
}) => {
  const handleMessage = async (message : string) => {
    let answer = "...";
    const loading = createChatBotMessage("");
    setState((prev : any) => ({ ...prev, messages: [...prev.messages, loading], }));
    
    try {
        const rsp = await fetch('//cv.artem.work/api/chatbot?q=' + message);
        if (rsp.ok) {
            answer = (await rsp.text()) ?? "";
        }
        //console.log(answer);
    } catch (ex) {
        answer = i18n.t("Chatbot.Error");
    }
    // if the server responds with input/output models, then replace it with generic message
    if (answer.indexOf("input:") >= 0 && answer.indexOf("output:") >= 0) {
      answer = i18n.t("Chatbot.Generic");
    }
    const botMessages = answer.split('\n').map((msg) => createChatBotMessage(msg));
    setState((prev : any) => {
        const prevMsgLoading = prev.messages[prev.messages.length - 1]?.message === '' && prev.messages[prev.messages.length - 1]?.type === 'bot';
        const newPrevMsg = !prevMsgLoading ? prev.messages : prev.messages.slice(0, -1);
        return { ...prev, messages: [...newPrevMsg, ...botMessages]};
    });
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: {
            handleMessage
          }
        });
      })}
    </div>
  );
};

export default ActionProvider;