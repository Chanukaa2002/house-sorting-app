import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SortingHatSVG from "./SortingHatSVG";

const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #d4af37, #ffd700, #8b7355);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
  color: #e8d5b7;
  font-style: italic;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(135deg, #8b0000, #dc143c);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: 2px solid #d4af37;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #dc143c, #8b0000);
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(139, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HatContainer = styled(motion.div)`
  margin: 2rem 0;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
`;

const MagicalText = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #d4af37;
  opacity: 0.7;
  font-style: italic;
`;

const WelcomeScreen = ({ onStart }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1,
        duration: 0.6,
        type: "spring",
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const hatVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.7,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const magicalTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.7,
      transition: {
        delay: 1.5,
        duration: 1,
      },
    },
  };

  return (
    <WelcomeContainer>
      <MagicalText
        variants={magicalTextVariants}
        initial="hidden"
        animate="visible"
      >
        ✨ The Sorting Hat awaits your arrival ✨
      </MagicalText>

      <Title variants={titleVariants} initial="hidden" animate="visible">
        Hogwarts House Sorting
      </Title>

      <HatContainer
        variants={hatVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 },
        }}
      >
        <SortingHatSVG />
      </HatContainer>

      <Subtitle variants={subtitleVariants} initial="hidden" animate="visible">
        Welcome to the magical world of Hogwarts! The ancient Sorting Hat will
        analyze your personality through a series of questions to determine
        which house best suits your character.
      </Subtitle>

      <StartButton
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={onStart}
      >
        Begin Your Journey
      </StartButton>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;
