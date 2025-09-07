import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const QuestionnaireContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  margin-bottom: 1rem;
  color: #d4af37;
`;

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d4af37;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #8b0000, #dc143c, #d4af37);
  border-radius: 6px;
`;

const ProgressText = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  color: #e8d5b7;
  font-size: 1rem;
`;

const QuestionCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7),
    rgba(30, 30, 60, 0.8)
  );
  border: 2px solid #d4af37;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(10px);
`;

const QuestionNumber = styled.div`
  color: #d4af37;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #e8d5b7;
  line-height: 1.6;
  font-weight: 400;
`;

const ScaleInfo = styled.p`
  font-size: 0.9rem;
  color: #b8a082;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const SliderContainer = styled.div`
  margin: 2rem 0;
`;

const SliderWrapper = styled.div`
  position: relative;
  margin: 1rem 0;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #8b7355, #d4af37);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: radial-gradient(circle, #d4af37, #8b7355);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(212, 175, 55, 0.5);
    transition: all 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(212, 175, 55, 0.7);
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #b8a082;
`;

const CurrentValue = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #d4af37;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const NavButton = styled(motion.button)`
  background: ${(props) =>
    props.primary
      ? "linear-gradient(135deg, #8b0000, #dc143c)"
      : "linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(30, 30, 60, 0.8))"};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 2px solid #d4af37;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  flex: ${(props) => (props.primary ? 2 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
  }
`;

const CompletionMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 100, 0, 0.3),
    rgba(0, 150, 0, 0.2)
  );
  border: 2px solid #00ff00;
  border-radius: 15px;
  margin: 2rem 0;
`;

const QuestionnaireScreen = ({ onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from API
    fetch("/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered =
    questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: parseInt(value),
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (allQuestionsAnswered) {
        onComplete(answers);
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] || 5 : 5;
  const isCurrentAnswered = currentQuestion
    ? currentQuestion.id in answers
    : false;

  if (loading) {
    return (
      <QuestionnaireContainer>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2 style={{ color: "#d4af37" }}>Loading Questions...</h2>
        </div>
      </QuestionnaireContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <QuestionnaireContainer>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h2 style={{ color: "#dc143c" }}>
            Error loading questions. Please try again.
          </h2>
        </div>
      </QuestionnaireContainer>
    );
  }

  return (
    <QuestionnaireContainer>
      <Header>
        <Title>The Sorting Hat's Questions</Title>
        <ProgressContainer>
          <ProgressBar>
            <ProgressFill
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </ProgressBar>
          <ProgressText>
            Question {currentQuestionIndex + 1} of {questions.length}
          </ProgressText>
        </ProgressContainer>
      </Header>

      <AnimatePresence mode="wait">
        {allQuestionsAnswered ? (
          <CompletionMessage
            key="completion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ color: "#00ff00", marginBottom: "1rem" }}>
              ✨ All Questions Completed! ✨
            </h3>
            <p style={{ color: "#e8d5b7" }}>
              The Sorting Hat has gathered all the information needed. Click
              "Submit to Sorting Hat" to discover your house!
            </p>
          </CompletionMessage>
        ) : (
          <QuestionCard
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionNumber>Question {currentQuestionIndex + 1}</QuestionNumber>

            <QuestionText>{currentQuestion.question}</QuestionText>

            <ScaleInfo>{currentQuestion.scale}</ScaleInfo>

            <SliderContainer>
              <SliderWrapper>
                <Slider
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
                <SliderLabels>
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </SliderLabels>
              </SliderWrapper>

              <CurrentValue>{currentAnswer}/10</CurrentValue>
            </SliderContainer>
          </QuestionCard>
        )}
      </AnimatePresence>

      <NavigationButtons>
        <NavButton
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Previous
        </NavButton>

        <NavButton
          primary
          onClick={handleNext}
          disabled={!isCurrentAnswered && !allQuestionsAnswered}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {allQuestionsAnswered
            ? "Submit to Sorting Hat"
            : isLastQuestion
            ? "Complete"
            : "Next"}
        </NavButton>
      </NavigationButtons>
    </QuestionnaireContainer>
  );
};

export default QuestionnaireScreen;
