import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaStar } from 'react-icons/fa';

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

const PhotographersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const PhotographerCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const PhotographerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const PhotographerInfo = styled.div`
  padding: 20px;
`;

const PhotographerName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const PhotographerSpecialty = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #ffc107;
`;

const featuredPhotographers = [
  {
    name: "Emma Thompson",
    specialty: "Wedding Photography",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    rating: 4.9
  },
  {
    name: "Alex Chen",
    specialty: "Portrait Photography",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    rating: 4.8
  },
  {
    name: "Sarah Johnson",
    specialty: "Event Photography",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    rating: 4.7
  },
  {
    name: "Michael Lee",
    specialty: "Landscape Photography",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    rating: 4.9
  }
];

const FeaturedPhotographers = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>Featured Photographers</Title>
        <PhotographersGrid>
          {featuredPhotographers.map((photographer, index) => (
            <PhotographerCard key={index} style={cardSpring}>
              <PhotographerImage src={photographer.image} alt={photographer.name} />
              <PhotographerInfo>
                <PhotographerName>{photographer.name}</PhotographerName>
                <PhotographerSpecialty>{photographer.specialty}</PhotographerSpecialty>
                <Rating>
                  <FaStar /> {photographer.rating.toFixed(1)}
                </Rating>
              </PhotographerInfo>
            </PhotographerCard>
          ))}
        </PhotographersGrid>
      </Container>
    </Section>
  );
};

export default FeaturedPhotographers;
