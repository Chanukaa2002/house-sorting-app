import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const LoadingContainer = styled.div`
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

const LoadingTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 2rem;
  color: #d4af37;
`;

const LoadingText = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #e8d5b7;
  font-style: italic;
  max-width: 500px;
  line-height: 1.6;
`;

const CrystalBall = styled(motion.div)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.3),
    rgba(212, 175, 55, 0.2),
    rgba(139, 115, 85, 0.4)
  );
  border: 3px solid #d4af37;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.4),
    inset 0 0 30px rgba(212, 175, 55, 0.2);
`;

const CrystalBallGlow = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  animation: float 3s ease-in-out infinite;
`;

const MagicalSwirl = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  border-top-color: rgba(212, 175, 55, 0.8);
  transform: translate(-50%, -50%);
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin: 2rem 0;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #ffd700, #8b7355);
  border-radius: 4px;
`;

const loadingMessages = [
  "Analyzing your magical essence...",
  "Consulting the ancient texts...",
  "Weighing your deepest traits...",
  "Searching through house histories...",
  "The Sorting Hat is deliberating...",
  "Almost ready to reveal your destiny...",
];

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <LoadingContainer>
      <LoadingTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Magical Analysis in Progress
      </LoadingTitle>

      <CrystalBall
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <CrystalBallGlow />
        <MagicalSwirl
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <MagicalSwirl
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            width: "60%",
            height: "60%",
            borderTopColor: "rgba(255, 215, 0, 0.6)",
            borderWidth: "1px",
          }}
        />
      </CrystalBall>

      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </ProgressBar>

      <AnimatePresence mode="wait">
        <LoadingText
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingMessages[messageIndex]}
        </LoadingText>
      </AnimatePresence>

      {/* Floating magical particles */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: "#d4af37",
              borderRadius: "50%",
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </LoadingContainer>
  );
};

export default LoadingScreen;
