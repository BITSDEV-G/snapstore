import { FaGoogle, FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { AuthContainer, AuthForm, Input, Button, Divider, SocialButton, ToggleText } from '../styles/authStyles';

const Signup = ({ onToggle }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <AuthContainer>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#ffc107' }}>SnapStore</h1>
      <AuthForm onSubmit={handleSubmit}>
        <Input type="text" placeholder="Name" required />
        <Input type="email" placeholder="Email address" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit">Create account</Button>
      </AuthForm>
      <Divider><span>OR</span></Divider>
      <AuthForm>
        <SocialButton type="button">
          <FaGoogle /> Continue with Google
        </SocialButton>
        <SocialButton type="button">
          <FaGithub /> Continue with GitHub
        </SocialButton>
      </AuthForm>
      <ToggleText>
        Already have an account? <a href="#" onClick={onToggle}>Log in</a>
      </ToggleText>
    </AuthContainer>
  );
};

Signup.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default Signup;
