import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import PropTypes from 'prop-types';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const TeamMemberCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const MemberImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  ${TeamMemberCard}:hover & {
    transform: scale(1.05);
  }
`;

const MemberContent = styled.div`
  padding: 20px;
`;

const MemberName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffc107;
  margin-bottom: 10px;
`;

const MemberRole = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
  margin-bottom: 15px;
`;

const MemberBio = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #a0a0a0;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: #ffc107;
  transition: color 0.3s ease;

  &:hover {
    color: #ffdb58;
  }
`;

const teamMembers = [
  {
    name: "Emma Thompson",
    role: "Founder & CEO",
    bio: "With over a decade of experience in event photography, Emma founded SnapStore to revolutionize how clients connect with photographers.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Alex Chen",
    role: "CTO",
    bio: "Alex's expertise in software development and passion for photography drive SnapStore's innovative technology solutions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Sarah Johnson",
    role: "Head of User Experience",
    bio: "Sarah's background in both photography and UX design helps create an intuitive platform for photographers and clients alike.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Michael Lee",
    role: "Head of Marketing",
    bio: "Michael's experience in digital marketing and event management helps SnapStore connect with both photographers and event planners effectively.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];
const TeamMember = ({ name, role, bio, image, github, linkedin, twitter }) => {
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
    <TeamMemberCard ref={ref} style={spring}>
      <MemberImage src={image} />
      <MemberContent>
        <MemberName>{name}</MemberName>
        <MemberRole>{role}</MemberRole>
        <MemberBio>{bio}</MemberBio>
        <SocialLinks>
          <SocialLink href={github} target="_blank" rel="noopener noreferrer">
            <GitHub size={20} />
          </SocialLink>
          <SocialLink href={linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </SocialLink>
          <SocialLink href={twitter} target="_blank" rel="noopener noreferrer">
            <Twitter size={20} />
          </SocialLink>
        </SocialLinks>
      </MemberContent>
    </TeamMemberCard>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
};

const Team = () => {
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
          Meet Our Team
        </Title>
        <Grid>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Team;
