import  { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Section = styled.section`
  background: linear-gradient(to bottom, #000000, #000000, #000000);
  padding: 100px 0;
  color: #ffffff;
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

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ffc107;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Poppins', sans-serif;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 16px;
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: #ffc107;
  }
`;

const SubmitButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 12px 24px;
  background-color: #ffc107;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca28;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  color: #ffc107;
`;

const InfoText = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
`;

const Map = styled.div`
  margin-top: 40px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Section id="contact-us">
      <Container>
        <Title ref={ref} style={titleSpring}>
          Get in Touch
        </Title>
        <ContactWrapper>
          <ContactForm onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
          <ContactInfo>
            <InfoItem>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoText>123 Photography Lane, Snap City, SC 12345</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FaPhone />
              </InfoIcon>
              <InfoText>+1 (555) 123-4567</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoText>contact@snapstore.com</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FaClock />
              </InfoIcon>
              <InfoText>Monday - Friday: 9am - 5pm</InfoText>
            </InfoItem>
            <Map>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412634965804!2d-73.98656708459377!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="SnapStore Location"
              ></iframe>
            </Map>
          </ContactInfo>
        </ContactWrapper>
      </Container>
    </Section>
  );
};

export default ContactUs;
