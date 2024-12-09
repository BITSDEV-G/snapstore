import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 80px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled(animated.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Subtitle = styled(animated.p)`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 40px;
`;

const CTAButton = styled(animated.a)`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  background-color: #ffc107;
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000000;
    color: #ffc107;
  }
`;

const CTASection = ({ title, subtitle, buttonText, buttonLink }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const subtitleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    delay: 200,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const buttonSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    delay: 400,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>{title}</Title>
        <Subtitle style={subtitleSpring}>{subtitle}</Subtitle>
        <CTAButton href={buttonLink} style={buttonSpring}>
          {buttonText}
        </CTAButton>
      </Container>
    </Section>
  );
};

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export default CTASection;
