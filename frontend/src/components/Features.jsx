import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, MessageCircle, Star, DollarSign, Briefcase } from 'react-feather';
import PropTypes from 'prop-types';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 100px 0;
  perspective: 1000px;
  overflow: hidden;
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
  gap: 20px;
`;

const FeatureCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled(animated.div)`
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
    title: "Easy Photographer Search",
    description: "Find the perfect photographer for your event using our advanced search filters, including location, event type, and budget.",
    icon: Search
  },
  {
    title: "Seamless Booking",
    description: "Book your chosen photographer with ease, manage event details, and make secure payments all in one place.",
    icon: Calendar
  },
  {
    title: "Direct Communication",
    description: "Use our in-platform chat to discuss event specifics and ensure clear communication with your photographer.",
    icon: MessageCircle
  },
  {
    title: "Ratings and Reviews",
    description: "Make informed decisions based on genuine client feedback and ratings from previous events.",
    icon: Star
  },
  {
    title: "Secure Payments",
    description: "Enjoy peace of mind with our integrated, secure payment system, including milestone payment options.",
    icon: DollarSign
  },
  {
    title: "Grow Your Business",
    description: "Photographers can showcase their work, manage bookings, and expand their client base effortlessly.",
    icon: Briefcase
  }
];

const Feature = React.memo(({ title, description, icon: Icon, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(-10deg)',
    config: { ...config.gentle, duration: 1000 },
    delay: index * 100
  });

  const iconSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-45deg)',
    config: { ...config.wobbly, duration: 1000 },
    delay: index * 100 + 500
  });

  return (
    <FeatureCard ref={ref} style={spring}>
      <IconWrapper style={iconSpring}>
        <Icon size={40} color="#000000" />
      </IconWrapper>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCard>
  );
});

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
};

Feature.displayName = 'Feature';

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(-10deg)',
    config: { ...config.gentle, duration: 1000 }
  });

  const [renderedFeatures, setRenderedFeatures] = useState([]);

  const renderNextFeature = useCallback((index) => {
    if (index < features.length) {
      setRenderedFeatures(prev => [...prev, features[index]]);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => renderNextFeature(renderedFeatures.length), 100);
      return () => clearTimeout(timer);
    }
  }, [inView, renderedFeatures.length, renderNextFeature]);

  const memoizedFeatures = useMemo(() =>
    renderedFeatures.map((feature, index) => (
      <Feature key={index} {...feature} index={index} />
    )),
    [renderedFeatures]
  );

  return (
    <Section>
      <Container>
        <Title ref={ref} style={titleSpring}>
          Simplify Your Event Photography
        </Title>
        <Grid>
          {memoizedFeatures}
        </Grid>
      </Container>
    </Section>
  );
};

export default React.memo(Features);
