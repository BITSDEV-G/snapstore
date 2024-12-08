import  { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatbotContainer = styled(animated.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #ffc107, #ff9800);
  color: #000;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 20px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 15px;
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  ${props => props.isBot ? `
    background-color: rgba(255, 255, 255, 0.1);
    align-self: flex-start;
  ` : `
    background-color: #ffc107;
    color: #000;
    align-self: flex-end;
  `}
`;

const ChatInput = styled.div`
  display: flex;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.05);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffc107;
  }
`;

const SendButton = styled.button`
  background-color: #ffc107;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca28;
  }
`;

const ToggleButton = styled(animated.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffc107;
  color: #000;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with SnapStore today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const chatbotAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
    config: config.gentle
  });

  const toggleAnimation = useSpring({
    transform: isOpen ? 'scale(0)' : 'scale(1)',
    config: config.wobbly
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(msgs => [...msgs, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('pricing') || lowerInput.includes('cost')) {
      return "Our pricing varies depending on the type of event and photographer. You can find detailed pricing information on our 'Pricing' page or by contacting a specific photographer.";
    } else if (lowerInput.includes('book') || lowerInput.includes('reservation')) {
      return "To book a photographer, simply browse our listings, select a photographer you like, and use the 'Book Now' button on their profile. You'll be guided through the booking process step by step.";
    } else if (lowerInput.includes('photographer') || lowerInput.includes('photography')) {
      return "We have a wide range of talented photographers specializing in various types of events such as weddings, corporate events, portraits, and more. You can explore their portfolios on our website.";
    } else {
      return "I'm sorry, I didn't quite understand that. Could you please rephrase your question or ask about our services, booking process, or photographer information?";
    }
  };

  return (
    <>
      <ChatbotContainer style={chatbotAnimation}>
        <ChatHeader>
          <ChatTitle><FaRobot /> SnapStore Assistant</ChatTitle>
          <CloseButton onClick={() => setIsOpen(false)}><FaTimes /></CloseButton>
        </ChatHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <Message key={index} isBot={message.isBot}>
              {message.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <ChatInput>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <SendButton onClick={handleSend}><FaPaperPlane /></SendButton>
        </ChatInput>
      </ChatbotContainer>
      <ToggleButton style={toggleAnimation} onClick={() => setIsOpen(true)}>
        <FaRobot />
      </ToggleButton>
    </>
  );
};

export default Chatbot;
