import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { Link } from 'react-scroll';

const FooterSection = styled.footer`
  background: linear-gradient(to bottom, #000000, #1a1a1a);
  color: #ffffff;
  padding: 80px 0 40px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

const FooterColumn = styled(animated.div)`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  color: #ffc107;
  font-size: 24px;
  margin-bottom: 20px;
`;

const FooterLink = styled(Link)`
  font-family: 'Poppins', sans-serif;
  color: #cccccc;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ffc107;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #cccccc;
  font-size: 20px;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffc107;
    transform: translateY(-3px);
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  margin-top: 20px;
`;

const SubscribeInput = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  border: none;
  border-radius: 4px 0 0 4px;
  flex-grow: 1;
`;

const SubscribeButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #ffc107;
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca28;
  }
`;

const Copyright = styled.div`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cccccc;
`;

const HeartIcon = styled(FaHeart)`
  color: #ff4136;
  display: inline-block;
  margin: 0 5px;
  animation: pulse 1s ease infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const columnAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <FooterSection ref={ref}>
      <FooterContainer>
        <FooterColumn style={columnAnimation}>
          <FooterTitle>SnapStore</FooterTitle>
          <p>Empowering photographers to showcase and sell their best work.</p>
          <SocialIcons>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></SocialIcon>
          </SocialIcons>
        </FooterColumn>
        <FooterColumn style={columnAnimation}>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="hero" smooth={true} duration={500}>Home</FooterLink>
          <FooterLink to="features" smooth={true} duration={500}>Features</FooterLink>
          <FooterLink to="about-us" smooth={true} duration={500}>About Us</FooterLink>
          <FooterLink to="blog" smooth={true} duration={500}>Blog</FooterLink>
          <FooterLink to="team" smooth={true} duration={500}>Team</FooterLink>
          <FooterLink to="testimonials" smooth={true} duration={500}>Testimonials</FooterLink>
        </FooterColumn>
        <FooterColumn style={columnAnimation}>
          <FooterTitle>Support</FooterTitle>
          <FooterLink as="a" href="#">FAQ</FooterLink>
          <FooterLink as="a" href="#">Help Center</FooterLink>
          <FooterLink as="a" href="#">Contact Us</FooterLink>
          <FooterLink as="a" href="#">Privacy Policy</FooterLink>
          <FooterLink as="a" href="#">Terms of Service</FooterLink>
        </FooterColumn>
        <FooterColumn style={columnAnimation}>
          <FooterTitle>Newsletter</FooterTitle>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <SubscribeForm onSubmit={(e) => e.preventDefault()}>
            <SubscribeInput type="email" placeholder="Enter your email" required />
            <SubscribeButton type="submit">Subscribe</SubscribeButton>
          </SubscribeForm>
        </FooterColumn>
      </FooterContainer>
      <Copyright>
        © {new Date().getFullYear()} SnapStore. All rights reserved. Made with <HeartIcon /> by Our Amazing Team
      </Copyright>
    </FooterSection>
  );
};

export default Footer;
