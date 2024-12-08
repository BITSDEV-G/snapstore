import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const AboutUsSection = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 120px 0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(animated.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #ffc107;
  text-align: center;
  margin-bottom: 60px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled(animated.div)`
  width: 100%;
  max-width: 500px;
  height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`;

const TextContent = styled(animated.div)`
  width: 100%;
  max-width: 500px;
  will-change: transform, opacity;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Paragraph = styled(animated.p)`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #cccccc;
  line-height: 1.8;
  margin-bottom: 30px;
  will-change: transform, opacity;
`;

const Highlight = styled.span`
  color: #ffc107;
  font-weight: 600;
`;

const Button = styled(animated.button)`
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #000000;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 193, 7, 0.3);
  }
`;

const AboutUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(-10deg)',
    config: { ...config.molasses, duration: 1000 },
  });

  const imageSpring = useSpring({
    opacity: inView && isLoaded ? 1 : 0,
    transform: inView && isLoaded ? 'translateX(0) rotateY(0)' : 'translateX(-100px) rotateY(-10deg)',
    config: { ...config.molasses, duration: 1000 },
  });

  const textSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0) rotateY(0)' : 'translateX(100px) rotateY(10deg)',
    config: { ...config.molasses, duration: 1000 },
  });

  const buttonSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
    config: { ...config.wobbly, duration: 800 },
  });

  const [paragraphs, setParagraphs] = useState([]);

  const renderNextParagraph = useCallback((index) => {
    if (index < 3) {
      setParagraphs(prev => [...prev, index]);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => renderNextParagraph(paragraphs.length), 200);
      return () => clearTimeout(timer);
    }
  }, [inView, paragraphs.length, renderNextParagraph]);

  const paragraphSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { ...config.gentle, duration: 800 },
  });

  return (
    <AboutUsSection ref={ref}>
      <Container>
        <Title style={titleSpring}>Discover Our Story</Title>
        <Content>
          <ImageWrapper style={imageSpring}>
            <Image
              src="https://images.pexels.com/photos/3928550/pexels-photo-3928550.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Professional photographer in action"
              onLoad={() => setIsLoaded(true)}
            />
          </ImageWrapper>
          <TextContent style={textSpring}>
            {paragraphs.includes(0) && (
              <Paragraph style={paragraphSpring}>
                At <Highlight>SnapStore</Highlight>, we believe that every moment is a masterpiece waiting to be captured. Founded in 2010 by a group of passionate photographers, we&apos;ve grown from a small studio into a global community of visual storytellers.
              </Paragraph>
            )}
            {paragraphs.includes(1) && (
              <Paragraph style={paragraphSpring}>
                Our mission is to <Highlight>empower creators</Highlight> by providing a platform where photography transcends mere images and becomes an art form that speaks to the soul. We curate only the finest high-quality photographs, ensuring that each image in our collection tells a unique story.
              </Paragraph>
            )}
            {paragraphs.includes(2) && (
              <Paragraph style={paragraphSpring}>
                With a team of <Highlight>award-winning photographers</Highlight> and state-of-the-art technology, we&apos;re not just capturing moments; we&apos;re preserving emotions, freezing time, and creating legacies. Join us in our journey to make the world a more beautiful place, one snapshot at a time.
              </Paragraph>
            )}
            <Button style={buttonSpring}>Learn More About Us</Button>
          </TextContent>
        </Content>
      </Container>
    </AboutUsSection>
  );
};

export default React.memo(AboutUs);
