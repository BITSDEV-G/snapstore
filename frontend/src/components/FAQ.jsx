import  { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 100px 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(animated.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #ffc107;
  text-align: center;
  margin-bottom: 60px;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
`;

const Question = styled.button`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Answer = styled(animated.div)`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 0 0 8px 8px;
  padding: 20px;
  margin-top: 2px;
`;

const faqData = [
  {
    question: "How do I book a photographer on SnapStore?",
    answer: "To book a photographer, simply search for photographers in your area, view their portfolios, and send a booking request through our platform. Once the photographer accepts, you can finalize the details and make a secure payment."
  },
  {
    question: "What types of events can I find photographers for on SnapStore?",
    answer: "SnapStore offers photographers for a wide range of events, including weddings, corporate events, graduations, birthdays, portrait sessions, and outdoor/nature photography. If you have a specific event in mind, you can easily search for photographers specializing in that area."
  },
  {
    question: "How does payment work on SnapStore?",
    answer: "SnapStore uses a secure payment system. When you book a photographer, you'll make an initial deposit to confirm the booking. The remaining balance is typically paid after the event. All payments are processed through our platform to ensure security and transparency for both clients and photographers."
  },
  {
    question: "Can I communicate with the photographer before booking?",
    answer: "Yes, SnapStore provides a messaging system that allows you to communicate with photographers before making a booking. This way, you can discuss your needs, ask questions, and ensure the photographer is a good fit for your event."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>Frequently Asked Questions</Title>
        {faqData.map((item, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleQuestion(index)}>
              {item.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </Question>
            {openIndex === index && (
              <Answer>
                {item.answer}
              </Answer>
            )}
          </FAQItem>
        ))}
      </Container>
    </Section>
  );
};

export default FAQ;
