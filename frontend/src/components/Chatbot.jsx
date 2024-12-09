import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatbotContainer = styled(animated.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 768px) {
    width: 90%;
    right: 5%;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #ffc107, #ff9800);
  color: #000;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  height: 350px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  max-width: 80%;
  background: ${props => props.$isBot ? 'linear-gradient(135deg, #ff7043, #ff5722)' : '#ffc107'};
  color: ${props => props.$isBot ? '#fff' : '#000'};
  font-size: 16px;
  line-height: 1.5;
  align-self: ${props => props.$isBot ? 'flex-start' : 'flex-end'};
  box-shadow: ${props => props.$isBot ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.$isBot ? 'none' : '1px solid #ffca28'};
`;

const ChatInput = styled.div`
  display: flex;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
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
  padding: 12px 18px;
  margin-left: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;

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
  width: 70px;
  height: 70px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: bounceIn 0.5s ease-out;

  @keyframes bounceIn {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const TypingMessage = styled.div`
  font-size: 16px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  position: relative;
`;
const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    if (index.current < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index.current));
        index.current += 1;
      }, 100); // Speed of typing effect
      return () => clearTimeout(timer);
    }
  }, [displayedText, text]);

  return <TypingMessage>{displayedText}</TypingMessage>;
};

TypingEffect.propTypes = {
  text: PropTypes.string.isRequired,
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello, I'm SnapStore Assistant! 😊 How can I assist you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    setIsTyping(true); // Start typing indicator

    // Simulate bot response with a delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(msgs => [...msgs, { text: botResponse, isBot: true }]);
      setIsTyping(false); // Stop typing indicator
    }, 1500); // Typing delay
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hey there! 👋 I'm here to help you find the best photographers and services. How can I assist you today?";
    } else if (lowerInput.includes('what is your service') || lowerInput.includes('what do you do')) {
      return "We connect you with top photographers for any occasion. Whether you're booking for a wedding, corporate event, or portraits, we have you covered!";
    } else if (lowerInput.includes('pricing') || lowerInput.includes('cost')) {
      return "Our pricing varies based on the photographer and event type. You can check our 'Pricing' page or contact a photographer directly for quotes.";
    } else if (lowerInput.includes('book') || lowerInput.includes('reservation')) {
      return "Booking a photographer is simple! Browse our photographers, pick your favorite, and click 'Book Now' to proceed.";
    } else if (lowerInput.includes('when will you be available') || lowerInput.includes('when are you available')) {
      return "Our team is working hard to make improvements, so stay tuned for even better experiences. Meanwhile, you can browse photographers and get in touch with them directly!";
    } else {
      return "Hi! 👋 I'm continuously learning and improving to assist you better. The SnapStore team is working on some exciting updates. Thanks for your patience!";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
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
            <Message key={index} $isBot={message.isBot}>
              {message.text}
            </Message>
          ))}
          {isTyping && (
            <Message $isBot={true}>
              <TypingEffect text="Typing..." />
            </Message>
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <ChatInput>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
          />
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        </ChatInput>
      </ChatbotContainer>

      <ToggleButton style={toggleAnimation} onClick={() => setIsOpen(!isOpen)}>
        <FaRobot />
      </ToggleButton>
    </>
  );
};

Chatbot.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
};

export default Chatbot;
