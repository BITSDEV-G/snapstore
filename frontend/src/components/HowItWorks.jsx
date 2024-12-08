import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaCamera, FaCalendarCheck, FaStar } from 'react-icons/fa';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 100px 0;
`;

const Container = styled.div`
  max-width: 1200px;
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

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Step = styled(animated.div)`
  flex-basis: calc(25% - 20px);
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-basis: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const StepIcon = styled.div`
  font-size: 48px;
  color: #ffc107;
  margin-bottom: 20px;
`;

const StepTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
`;

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const stepSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const steps = [
    {
      icon: <FaSearch />,
      title: 'Search',
      description: 'Find the perfect photographer for your event',
    },
    {
      icon: <FaCamera />,
      title: 'Explore',
      description: 'View portfolios and compare photographers',
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Book',
      description: 'Secure your booking with easy online payment',
    },
    {
      icon: <FaStar />,
      title: 'Review',
      description: 'Share your experience and help others',
    },
  ];

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>How SnapStore Works</Title>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index} style={stepSpring}>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
        </StepsContainer>
      </Container>
    </Section>
  );
};

export default HowItWorks;
