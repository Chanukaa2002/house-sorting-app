import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionnaireScreen from "./components/QuestionnaireScreen";
import ResultScreen from "./components/ResultScreen";
import LoadingScreen from "./components/LoadingScreen";

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MagicalParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L55 40 L85 40 L62 58 L70 88 L50 70 L30 88 L38 58 L15 40 L45 40 Z' fill='%23ffd700' opacity='0.1'/%3E%3C/svg%3E")
      no-repeat;
    background-size: 30px 30px;
    animation: twinkle 4s infinite;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const screenVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const handleStartQuestionnaire = () => {
    setCurrentScreen("loading");
    setTimeout(() => {
      setCurrentScreen("questionnaire");
    }, 2000);
  };

  const handleQuestionnaireComplete = (questionnaireAnswers) => {
    setAnswers(questionnaireAnswers);
    setCurrentScreen("loading");

    // Submit answers to API
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionnaireAnswers),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setTimeout(() => {
          setCurrentScreen("result");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setTimeout(() => {
          setCurrentScreen("result");
        }, 2000);
      });
  };

  const handleStartOver = () => {
    setAnswers({});
    setResult(null);
    setCurrentScreen("welcome");
  };

  return (
    <AppContainer>
      <MagicalParticles />

      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <motion.div
            key="welcome"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <WelcomeScreen onStart={handleStartQuestionnaire} />
          </motion.div>
        )}

        {currentScreen === "loading" && (
          <motion.div
            key="loading"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {currentScreen === "questionnaire" && (
          <motion.div
            key="questionnaire"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />
          </motion.div>
        )}

        {currentScreen === "result" && (
          <motion.div
            key="result"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <ResultScreen result={result} onStartOver={handleStartOver} />
          </motion.div>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
