import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px;
  margin: 0 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 48px;
  color: rgba(255, 193, 7, 0.3);
  margin-bottom: 20px;
`;

const TestimonialText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffc107;
`;

const AuthorTitle = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #a0a0a0;
`;

const Rating = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Star = styled(FaStar)`
  color: #ffc107;
  margin-right: 2px;
`;

const testimonials = [
  {
    text: "SnapStore has transformed how I find photographers for my events. The platform is user-friendly, and the quality of professionals is outstanding.",
    author: "Emily Rodriguez",
    title: "Event Planner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  },
  {
    text: "As a wedding photographer, SnapStore has helped me grow my business significantly. The booking process is seamless, and I love the direct communication with clients.",
    author: "Michael Chang",
    title: "Professional Photographer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  },
  {
    text: "Finding the perfect photographer for my corporate events has never been easier. SnapStore's search filters and portfolio previews are incredibly helpful.",
    author: "Sarah Thompson",
    title: "Corporate Event Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  },
  {
    text: "The secure payment system and clear communication channels on SnapStore give me peace of mind when booking photographers for my clients' events.",
    author: "David Lee",
    title: "Luxury Event Coordinator",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  }
];


const Testimonial = ({ text, author, title, image, rating }) => {
  return (
  <TestimonialCard>
    <QuoteIcon />
    <TestimonialText>{text}</TestimonialText>
    <Rating>
      {[...Array(5)].map((_, i) => (
        <Star key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} />
      ))}
    </Rating>
    <TestimonialAuthor>
      <AuthorImage src={image} alt={author} />
      <AuthorInfo>
        <AuthorName>{author}</AuthorName>
        <AuthorTitle>{title}</AuthorTitle>
      </AuthorInfo>
    </TestimonialAuthor>
  </TestimonialCard>
  );
};
Testimonial.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { mass: 1, tension: 120, friction: 14 }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Section>
      <Container>
        <Title ref={ref} style={titleSpring}>
          What Our Users Say
        </Title>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </Slider>
      </Container>
    </Section>
  );
};

export default Testimonials;
