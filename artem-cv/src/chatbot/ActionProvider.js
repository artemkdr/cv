import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleMessage = async (message) => {
    let answer = "...";
    const loading = createChatBotMessage("");
    setState((prev) => ({ ...prev, messages: [...prev.messages, loading], }));
    
    try {
        const rsp = await fetch('//34.65.92.137/api/chatbot?q=' + message);
        if (rsp.ok) {
            answer = await rsp.text();
        }
        console.log(answer);
    } catch (ex) {
        answer = "Oups... something is broken."
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