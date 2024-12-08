import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaUserTie, FaCamera } from 'react-icons/fa';

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

const BenefitsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const BenefitColumn = styled(animated.div)`
  flex-basis: calc(50% - 20px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const BenefitTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  color: #ffc107;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const BenefitIcon = styled.span`
  font-size: 32px;
  margin-right: 15px;
`;

const BenefitList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  &:before {
    content: '✓';
    color: #ffc107;
    margin-right: 10px;
  }
`;

const Benefits = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const columnSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const clientBenefits = [
    'Easy search and filter options',
    'View detailed photographer profiles',
    'Secure online booking and payment',
    'Direct communication with photographers',
    'Review and rating system',
  ];

  const photographerBenefits = [
    'Showcase your portfolio to a wide audience',
    'Manage bookings and availability easily',
    'Secure payments through the platform',
    'Build your reputation with client reviews',
    'Access to analytics and insights',
  ];

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>Benefits of SnapStore</Title>
        <BenefitsContainer>
          <BenefitColumn style={columnSpring}>
            <BenefitTitle>
              <BenefitIcon><FaUserTie /></BenefitIcon>
              For Clients
            </BenefitTitle>
            <BenefitList>
              {clientBenefits.map((benefit, index) => (
                <BenefitItem key={index}>{benefit}</BenefitItem>
              ))}
            </BenefitList>
          </BenefitColumn>
          <BenefitColumn style={columnSpring}>
            <BenefitTitle>
              <BenefitIcon><FaCamera /></BenefitIcon>
              For Photographers
            </BenefitTitle>
            <BenefitList>
              {photographerBenefits.map((benefit, index) => (
                <BenefitItem key={index}>{benefit}</BenefitItem>
              ))}
            </BenefitList>
          </BenefitColumn>
        </BenefitsContainer>
      </Container>
    </Section>
  );
};

export default Benefits;
