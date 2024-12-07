import styled from 'styled-components';
import { animated } from 'react-spring';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #000000, #1a1a1a);
`;

export const AuthCard = styled(animated.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #ffc107;
  text-align: center;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffc107;
    box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border: none;
  border-radius: 8px;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 193, 7, 0.3);
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 5px;
`;

export const SwitchText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #cccccc;
  font-size: 14px;
`;

export const SwitchLink = styled.a`
  color: #ffc107;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

