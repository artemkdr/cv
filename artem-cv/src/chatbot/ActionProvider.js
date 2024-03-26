import React from 'react';
import i18n from '../i18n';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleMessage = async (message) => {
    let answer = "...";
    const loading = createChatBotMessage("");
    setState((prev) => ({ ...prev, messages: [...prev.messages, loading], }));
    
    try {
        const rsp = await fetch('//cv.artem.work/api/chatbot?q=' + message);
        if (rsp.ok) {
            answer = (await rsp.text())?.replace(/\n/g, '<br/>');
            // if the server responds with input/output models, then replace it with generic message
            if (answer?.indexOf("input:") >= 0 && answer?.indexOf("output:") >= 0) {
              answer = i18n.t("Generic");
            }
        }
        //console.log(answer);
    } catch (ex) {
        answer = i18n.t("Error");
    }
    const botMessage = createChatBotMessage(answer + "");
    setState((prev) => {
        const newPrevMsg = prev.messages.slice(0, -1)
        return { ...prev, messages: [...newPrevMsg, botMessage]};
    });
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage
          }
        });
      })}
    </div>
  );
};

export default ActionProvider;