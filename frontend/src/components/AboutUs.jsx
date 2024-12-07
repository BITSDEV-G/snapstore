import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const AboutUsSection = styled.section`
background: linear-gradient(to bottom, #000000, #0a0a0a, #1a1a1a);
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

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TextContent = styled(animated.div)`
  width: 100%;
  max-width: 500px;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Paragraph = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #cccccc;
  line-height: 1.8;
  margin-bottom: 30px;
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

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.molasses,
  });

  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(-100px)',
    config: config.molasses,
  });

  const textSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(100px)',
    config: config.molasses,
  });

  const buttonSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: config.wobbly,
  });

  return (
    <AboutUsSection ref={ref}>
      <Container>
        <Title style={titleSpring}>Discover Our Story</Title>
        <Content>
          <ImageWrapper style={imageSpring}>
            <Image src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="Professional photographer in action" />
          </ImageWrapper>
          <TextContent style={textSpring}>
            <Paragraph>
              At <Highlight>SnapStore</Highlight>, we believe that every moment is a masterpiece waiting to be captured. Founded in 2010 by a group of passionate photographers, we&apos;ve grown from a small studio into a global community of visual storytellers.
            </Paragraph>
            <Paragraph>
              Our mission is to <Highlight>empower creators</Highlight> by providing a platform where photography transcends mere images and becomes an art form that speaks to the soul. We curate only the finest high-quality photographs, ensuring that each image in our collection tells a unique story.
            </Paragraph>
            <Paragraph>
              With a team of <Highlight>award-winning photographers</Highlight> and state-of-the-art technology, we&apos;re not just capturing moments; we&apos;re preserving emotions, freezing time, and creating legacies. Join us in our journey to make the world a more beautiful place, one snapshot at a time.
            </Paragraph>
            <Button style={buttonSpring}>Learn More About Us</Button>
          </TextContent>
        </Content>
      </Container>
    </AboutUsSection>
  );
};

export default AboutUs;
