import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleMessage = async (message) => {
    let rsp = "...";
    const loading = createChatBotMessage("");
    setState((prev) => ({ ...prev, messages: [...prev.messages, loading], }));
    
    try {
        rsp = await fetch('//34.65.92.137/api/chatbot?q=' + message);
    } catch (ex) {
        rsp = "Oups... something is broken."
    }
    const botMessage = createChatBotMessage(rsp);
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