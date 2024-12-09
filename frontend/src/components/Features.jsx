import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Search, Calendar, MessageCircle, Star, DollarSign, Briefcase } from 'react-feather';
import PropTypes from 'prop-types';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 60px 0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(animated.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #ffc107;
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #ffc107, #ff9800);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: #ffc107;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #cccccc;
  line-height: 1.5;
`;

const features = [
  {
    title: "Easy Photographer Search",
    description: "Find the perfect photographer using advanced search filters.",
    icon: Search
  },
  {
    title: "Seamless Booking",
    description: "Book, manage events, and make secure payments in one place.",
    icon: Calendar
  },
  {
    title: "Direct Communication",
    description: "Use in-platform chat for clear communication with photographers.",
    icon: MessageCircle
  },
  {
    title: "Ratings and Reviews",
    description: "Make informed decisions based on genuine client feedback.",
    icon: Star
  },
  {
    title: "Secure Payments",
    description: "Enjoy peace of mind with our integrated payment system.",
    icon: DollarSign
  },
  {
    title: "Grow Your Business",
    description: "Photographers can showcase work and expand their client base.",
    icon: Briefcase
  }
];

const Feature = ({ title, description, icon: Icon }) => (
  <FeatureCard>
    <IconWrapper>
      <Icon size={30} color="#000000" />
    </IconWrapper>
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureDescription>{description}</FeatureDescription>
  </FeatureCard>
);
Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const titleSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 1000 }
  });

  return (
    <Section>
      <Container>
        <Title style={titleSpring}>
          Simplify Your Event Photography
        </Title>
        <Grid>
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Features;
