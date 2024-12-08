import styled from 'styled-components';
import { useSpring, useTrail, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaBuilding, FaGraduationCap, FaBirthdayCake, FaCamera, FaTree, FaStar, FaPalette } from 'react-icons/fa';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 120px 0;
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
  margin-bottom: 80px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #ffc107, #ff9800);
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const EventCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const EventIcon = styled(animated.div)`
  font-size: 64px;
  color: #ffc107;
  margin-bottom: 30px;
  transition: transform 0.3s ease;

  ${EventCard}:hover & {
    transform: scale(1.1);
  }
`;

const EventName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 15px;
`;

const SeeMore = styled(animated.a)`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #ffc107;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border: 2px solid #ffc107;
  border-radius: 30px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffc107;
    color: #000000;
  }
`;

const eventTypes = [
  { name: "Weddings", icon: FaHeart },
  { name: "Corporate Events", icon: FaBuilding },
  { name: "Graduations", icon: FaGraduationCap },
  { name: "Birthdays", icon: FaBirthdayCake },
  { name: "Portrait Sessions", icon: FaCamera },
  { name: "Outdoor & Nature", icon: FaTree },
  // Removed "Concerts" and "Food Photography"
  { name: "Fashion Shows", icon: FaStar },
  { name: "Art Exhibitions", icon: FaPalette },
];

const EventTypes = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.molasses,
  });

  const trail = useTrail(eventTypes.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.gentle,
  });

  return (
    <Section ref={ref}>
      <Container>
        <Title style={titleSpring}>Discover Our Event Photography Services</Title>
        <EventGrid>
          {trail.map((style, index) => {
            const event = eventTypes[index];
            return (
              <EventCard key={index} style={style}>
                <EventIcon>
                  <event.icon />
                </EventIcon>
                <EventName>{event.name}</EventName>
                <SeeMore href={`/event-types/${event.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  Explore More
                </SeeMore>
              </EventCard>
            );
          })}
        </EventGrid>
      </Container>
    </Section>
  );
};

export default EventTypes;
