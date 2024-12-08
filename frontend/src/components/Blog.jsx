import { memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import LazyLoad from 'react-lazyload';
import { Calendar, User, ArrowRight } from 'react-feather';
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const BlogCard = styled(animated.div)`
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

const BlogImage = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #ffc107;
  margin-bottom: 15px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #cccccc;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const BlogExcerpt = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ReadMore = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #ffc107;
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const LazyBlogImage = ({ src }) => (
  <LazyLoad height={300} offset={100}>
    <BlogImage style={{ backgroundImage: `url(${src})` }} />
  </LazyLoad>
);

LazyBlogImage.propTypes = {
  src: PropTypes.string.isRequired,
};

const BlogPost = memo(({ title, excerpt, image, date, author }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 1, tension: 90, friction: 10 },
  });

  return (
    <BlogCard ref={ref} style={spring}>
      <LazyBlogImage src={image} />
      <BlogContent>
        <BlogTitle>{title}</BlogTitle>
        <BlogMeta>
          <MetaItem>
            <Calendar size={14} />
            {date}
          </MetaItem>
          <MetaItem>
            <User size={14} />
            {author}
          </MetaItem>
        </BlogMeta>
        <BlogExcerpt>{excerpt}</BlogExcerpt>
        <ReadMore href="#" key={title}>
          Read More <ArrowRight size={16} />
        </ReadMore>
      </BlogContent>
    </BlogCard>
  );
});

BlogPost.displayName = 'BlogPost';

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const blogPosts = [
  {
    title: 'Mastering Low Light Photography',
    excerpt: 'Discover techniques to capture stunning images in challenging low light conditions, from cityscapes to astrophotography.',
    image: 'https://images.pexels.com/photos/1804169/pexels-photo-1804169.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 15, 2023',
    author: 'Jane Doe',
  },
  {
    title: 'The Art of Composition in Landscape Photography',
    excerpt: 'Learn the fundamental principles of composition to create visually striking landscape photographs that captivate viewers.',
    image: 'https://images.pexels.com/photos/2858669/pexels-photo-2858669.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 10, 2023',
    author: 'John Smith',
  },
  {
    title: 'Capturing the Soul of Street Photography',
    excerpt: 'Tips and tricks for capturing authentic moments in urban environments, telling stories through your lens.',
    image: 'https://images.pexels.com/photos/14041407/pexels-photo-14041407.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 5, 2023',
    author: 'Alice Johnson',
  },
];

const Blog = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 1, tension: 90, friction: 10 },
  });

  return (
    <Section>
      <Container>
        <Title ref={ref} style={titleSpring}>
          Latest from Our Blog
        </Title>
        <Grid>
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Blog;
