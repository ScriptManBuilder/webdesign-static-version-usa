import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const progressGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
  100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
`;

// Main loader container
const LoaderContainer = styled.div<{ $isComplete: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, 
    #0F172A 0%,
    #020617 50%,
    #1E293B 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: ${fadeIn} 0.5s ease-in-out;
  
  ${props => props.$isComplete && css`
    animation: fadeOut 0.8s ease-in-out forwards;
    
    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { 
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.5;
  }
`;

// Loader content
const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
  max-width: 500px;
  padding: 2rem;
  animation: ${slideUpFadeIn} 1s ease-out;
`;

// Logo
const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Tagline
const Tagline = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 3rem 0;
  font-weight: 500;
  letter-spacing: 0.025em;
  animation: ${slideUpFadeIn} 1.2s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Spinner container
const SpinnerContainer = styled.div`
  margin: 2rem 0;
  animation: ${slideUpFadeIn} 1.4s ease-out;
`;

// Spinner
const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #3B82F6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 45px;
    height: 45px;
    border: 2px solid transparent;
    border-top: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    top: 6px;
    left: 6px;
    animation: ${spin} 2s linear infinite reverse;
  }
`;

// Progress section
const ProgressSection = styled.div`
  width: 100%;
  margin: 3rem 0 2rem 0;
  animation: ${slideUpFadeIn} 1.6s ease-out;
`;

// Progress bar container
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
`;

// Progress bar
const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, 
    #3B82F6 0%,
    #60A5FA 50%,
    #93C5FD 100%
  );
  border-radius: 10px;
  transition: width 0.3s ease-out;
  animation: ${progressGlow} 2s ease-in-out infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// Progress text
const ProgressText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

// Loading text
const LoadingText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  text-align: center;
  line-height: 1.5;
  animation: ${slideUpFadeIn} 1.8s ease-out;
  min-height: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

interface InitialLoaderProps {
  progress: number;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ progress }) => {
  const isComplete = progress >= 100;

  // Dynamic loading messages based on progress
  const getLoadingMessage = () => {
    if (progress < 20) return 'Initializing premium web design platform...';
    if (progress < 40) return 'Loading exclusive design courses...';
    if (progress < 60) return 'Preparing interactive learning environment...';
    if (progress < 80) return 'Setting up personalized dashboard...';
    if (progress < 95) return 'Final system configuration...';
    return 'Welcome to the world of web design!';
  };

  return (
    <LoaderContainer $isComplete={isComplete}>
      <LoaderContent>
        <Logo>WEB DESIGN</Logo>
        <Tagline>Premium Web Design Education</Tagline>
        
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        
        <ProgressSection>
          <ProgressBarContainer>
            <ProgressBar $progress={progress} />
          </ProgressBarContainer>
          <ProgressText>{Math.round(progress)}%</ProgressText>
        </ProgressSection>
        
        <LoadingText>
          {getLoadingMessage()}
        </LoadingText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default InitialLoader;