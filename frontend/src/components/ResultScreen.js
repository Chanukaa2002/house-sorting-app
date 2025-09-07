import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import HouseCrestSVG from "./HouseCrestSVG";

const ResultContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const AnnouncementText = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 2rem;
  color: #d4af37;
  font-style: italic;
`;

const HouseReveal = styled(motion.div)`
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 20px;
  background: ${(props) => getHouseGradient(props.house)};
  border: 3px solid ${(props) => getHouseBorderColor(props.house)};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 30px ${(props) => getHouseGlowColor(props.house)};
  max-width: 600px;
  width: 100%;
`;

const HouseName = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  margin: 1rem 0;
  color: #fff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8),
    0 0 20px ${(props) => getHouseGlowColor(props.house)};
  font-weight: 700;
`;

const HouseDescription = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.6;
  color: #f0f0f0;
  margin: 1.5rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;

const ProbabilitiesContainer = styled(motion.div)`
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7),
    rgba(30, 30, 60, 0.8)
  );
  border-radius: 15px;
  border: 2px solid #d4af37;
  max-width: 500px;
  width: 100%;
`;

const ProbabilityTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ProbabilityBar = styled.div`
  margin: 1rem 0;
  text-align: left;
`;

const ProbabilityLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #e8d5b7;
  font-weight: 600;
`;

const ProbabilityProgress = styled.div`
  height: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #666;
`;

const ProbabilityFill = styled(motion.div)`
  height: 100%;
  background: ${(props) => getHouseGradient(props.house)};
  border-radius: 6px;
`;

const TraitsContainer = styled(motion.div)`
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7),
    rgba(30, 30, 60, 0.8)
  );
  border-radius: 15px;
  border: 2px solid #d4af37;
  max-width: 500px;
  width: 100%;
`;

const TraitsTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const TraitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
  padding: 0.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  border-left: 4px solid #d4af37;
`;

const TraitName = styled.span`
  color: #e8d5b7;
  font-weight: 600;
  text-transform: capitalize;
`;

const TraitScore = styled.span`
  color: #d4af37;
  font-weight: bold;
  font-size: 1.1rem;
`;

const RestartButton = styled(motion.button)`
  background: linear-gradient(135deg, #8b0000, #dc143c);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 30px;
  border: 2px solid #d4af37;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background: linear-gradient(135deg, #dc143c, #8b0000);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
  }
`;

const CelebrationParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

// Helper functions for house colors
const getHouseGradient = (house) => {
  switch (house) {
    case "Gryffindor":
      return "linear-gradient(135deg, #8b0000, #dc143c, #b8860b)";
    case "Hufflepuff":
      return "linear-gradient(135deg, #ffd700, #ffb347, #8b7355)";
    case "Ravenclaw":
      return "linear-gradient(135deg, #003366, #4169e1, #87ceeb)";
    case "Slytherin":
      return "linear-gradient(135deg, #006400, #32cd32, #228b22)";
    default:
      return "linear-gradient(135deg, #666, #999)";
  }
};

const getHouseBorderColor = (house) => {
  switch (house) {
    case "Gryffindor":
      return "#ffd700";
    case "Hufflepuff":
      return "#000";
    case "Ravenclaw":
      return "#cd7f32";
    case "Slytherin":
      return "#c0c0c0";
    default:
      return "#666";
  }
};

const getHouseGlowColor = (house) => {
  switch (house) {
    case "Gryffindor":
      return "rgba(220, 20, 60, 0.5)";
    case "Hufflepuff":
      return "rgba(255, 215, 0, 0.5)";
    case "Ravenclaw":
      return "rgba(65, 105, 225, 0.5)";
    case "Slytherin":
      return "rgba(50, 205, 50, 0.5)";
    default:
      return "rgba(255, 255, 255, 0.5)";
  }
};

const getHouseDescription = (house) => {
  switch (house) {
    case "Gryffindor":
      return "You belong in Gryffindor! You are brave, daring, and chivalrous. You stand up for what's right and aren't afraid to face danger when needed.";
    case "Hufflepuff":
      return "You belong in Hufflepuff! You are loyal, patient, and hardworking. You value fairness and friendship above all else.";
    case "Ravenclaw":
      return "You belong in Ravenclaw! You are intelligent, creative, and wise. You have a thirst for knowledge and love solving complex problems.";
    case "Slytherin":
      return "You belong in Slytherin! You are ambitious, cunning, and resourceful. You have strong leadership qualities and determination to achieve your goals.";
    default:
      return "The Sorting Hat has made its decision!";
  }
};

const ResultScreen = ({ result, onStartOver }) => {
  const house = result?.predicted_house || "Gryffindor";
  const probabilities = result?.probabilities || {};
  const traitScores = result?.trait_scores || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <ResultContainer>
      <CelebrationParticles>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#ffd700",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </CelebrationParticles>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <AnnouncementText>🎭 The Sorting Hat has spoken! 🎭</AnnouncementText>
        </motion.div>

        <motion.div variants={itemVariants}>
          <HouseReveal house={house}>
            <HouseCrestSVG house={house} size={120} />
            <HouseName house={house}>{house}</HouseName>
            <HouseDescription>{getHouseDescription(house)}</HouseDescription>
          </HouseReveal>
        </motion.div>

        {Object.keys(probabilities).length > 0 && (
          <motion.div variants={itemVariants}>
            <ProbabilitiesContainer>
              <ProbabilityTitle>House Probabilities</ProbabilityTitle>
              {Object.entries(probabilities)
                .sort(([, a], [, b]) => b - a)
                .map(([houseName, probability]) => (
                  <ProbabilityBar key={houseName}>
                    <ProbabilityLabel>
                      <span>{houseName}</span>
                      <span>{probability}%</span>
                    </ProbabilityLabel>
                    <ProbabilityProgress>
                      <ProbabilityFill
                        house={houseName}
                        initial={{ width: 0 }}
                        animate={{ width: `${probability}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </ProbabilityProgress>
                  </ProbabilityBar>
                ))}
            </ProbabilitiesContainer>
          </motion.div>
        )}

        {Object.keys(traitScores).length > 0 && (
          <motion.div variants={itemVariants}>
            <TraitsContainer>
              <TraitsTitle>Your Magical Traits</TraitsTitle>
              {Object.entries(traitScores).map(([trait, score]) => (
                <TraitItem key={trait}>
                  <TraitName>{trait.replace("_", " ")}</TraitName>
                  <TraitScore>{score}/10</TraitScore>
                </TraitItem>
              ))}
            </TraitsContainer>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <RestartButton
            onClick={onStartOver}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Take the Test Again ⚡
          </RestartButton>
        </motion.div>
      </motion.div>
    </ResultContainer>
  );
};

export default ResultScreen;
