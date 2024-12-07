import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Camera, User, Folder, Shield, Image, Globe } from 'react-feather';
import PropTypes from 'prop-types';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #1a1a1a);
  padding: 100px 0;
  perspective: 1000px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #ffc107, #ff9800);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffc107;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
  line-height: 1.6;
`;

const features = [
  {
    title: "High-Quality Photos",
    description: "Access our vast collection of professional, high-resolution photographs that capture moments in stunning detail.",
    icon: Camera
  },
  {
    title: "User Profiles",
    description: "Create and customize your profile to showcase your photography style, interests, and portfolio to the community.",
    icon: User
  },
  {
    title: "Smart Categories",
    description: "Effortlessly navigate through our intelligently organized categories to find the perfect photo for any project or inspiration.",
    icon: Folder
  },
  {
    title: "Secure Transactions",
    description: "Shop with confidence using our state-of-the-art, encrypted payment processing system for worry-free purchases.",
    icon: Shield
  },
  {
    title: "Creative Filters",
    description: "Enhance your photographs with our library of creative filters that add depth, mood, and vibrance to your images.",
    icon: Image
  },
  {
    title: "Global Community",
    description: "Connect with photographers and enthusiasts worldwide to share your passion and collaborate on exciting projects.",
    icon: Globe
  }
];

const Feature = ({ title, description, icon: Icon }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 }
  });

  return (
    <FeatureCard ref={ref} style={spring}>
      <IconWrapper>
        <Icon size={40} color="#000000" />
      </IconWrapper>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCard>
  );
};
Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 }
  });

  return (
    <Section>
      <Container>
        <Title ref={ref} style={titleSpring}>
          Elevate Your Photography Experience
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