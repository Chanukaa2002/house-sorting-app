import React from "react";
import { motion } from "framer-motion";

const HouseCrestSVG = ({ house, size = 100 }) => {
  const renderGryffindorCrest = () => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <defs>
        <linearGradient
          id="gryffindorGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="50%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shield background */}
      <path
        d="M50 5 L80 20 L80 60 Q80 80 50 95 Q20 80 20 60 L20 20 Z"
        fill="url(#gryffindorGradient)"
        stroke="#ffd700"
        strokeWidth="2"
        filter="url(#goldGlow)"
      />

      {/* Lion head */}
      <circle cx="50" cy="40" r="15" fill="#ffd700" />
      <path
        d="M40 35 Q45 30 50 35 Q55 30 60 35"
        stroke="#8b0000"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="45" cy="38" r="2" fill="#8b0000" />
      <circle cx="55" cy="38" r="2" fill="#8b0000" />
      <path
        d="M45 45 Q50 48 55 45"
        stroke="#8b0000"
        strokeWidth="2"
        fill="none"
      />

      {/* Lion mane */}
      <path d="M35 35 Q30 30 35 25 Q40 30 45 28" fill="#ff6b35" />
      <path d="M65 35 Q70 30 65 25 Q60 30 55 28" fill="#ff6b35" />
      <path d="M40 55 Q35 60 40 65 Q45 60 50 62" fill="#ff6b35" />
      <path d="M60 55 Q65 60 60 65 Q55 60 50 62" fill="#ff6b35" />

      {/* Sword */}
      <rect x="48" y="60" width="4" height="20" fill="#c0c0c0" />
      <rect x="46" y="78" width="8" height="3" fill="#8b4513" />
      <circle cx="50" cy="85" r="2" fill="#ffd700" />
    </motion.svg>
  );

  const renderHufflepuffCrest = () => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <defs>
        <linearGradient
          id="hufflepuffGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>

      {/* Shield background */}
      <path
        d="M50 5 L80 20 L80 60 Q80 80 50 95 Q20 80 20 60 L20 20 Z"
        fill="url(#hufflepuffGradient)"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Badger body */}
      <ellipse cx="50" cy="45" rx="18" ry="12" fill="#8B4513" />
      <ellipse cx="50" cy="45" rx="14" ry="8" fill="#000" />
      <ellipse cx="50" cy="45" rx="10" ry="6" fill="#fff" />

      {/* Badger head */}
      <ellipse cx="50" cy="30" rx="12" ry="8" fill="#8B4513" />
      <ellipse cx="50" cy="30" rx="8" ry="5" fill="#000" />
      <ellipse cx="50" cy="30" rx="6" ry="3" fill="#fff" />

      {/* Eyes */}
      <circle cx="46" cy="28" r="2" fill="#000" />
      <circle cx="54" cy="28" r="2" fill="#000" />
      <circle cx="46" cy="27" r="1" fill="#fff" />
      <circle cx="54" cy="27" r="1" fill="#fff" />

      {/* Nose */}
      <ellipse cx="50" cy="32" rx="1.5" ry="1" fill="#000" />

      {/* Cups (Hufflepuff symbol) */}
      <path
        d="M35 65 L35 75 Q35 80 40 80 L45 80 Q50 80 50 75 L50 65"
        fill="#ffd700"
        stroke="#000"
        strokeWidth="1"
      />
      <path
        d="M50 65 L50 75 Q50 80 55 80 L60 80 Q65 80 65 75 L65 65"
        fill="#ffd700"
        stroke="#000"
        strokeWidth="1"
      />
    </motion.svg>
  );

  const renderRavenclawCrest = () => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <defs>
        <linearGradient
          id="ravenclawGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#003366" />
          <stop offset="50%" stopColor="#4169e1" />
          <stop offset="100%" stopColor="#cd7f32" />
        </linearGradient>
      </defs>

      {/* Shield background */}
      <path
        d="M50 5 L80 20 L80 60 Q80 80 50 95 Q20 80 20 60 L20 20 Z"
        fill="url(#ravenclawGradient)"
        stroke="#cd7f32"
        strokeWidth="2"
      />

      {/* Eagle body */}
      <ellipse cx="50" cy="50" rx="15" ry="20" fill="#4169e1" />

      {/* Eagle head */}
      <circle cx="50" cy="30" r="10" fill="#003366" />

      {/* Eagle beak */}
      <path d="M50 25 L45 22 L50 30 Z" fill="#ffd700" />

      {/* Eagle eye */}
      <circle cx="52" cy="28" r="2" fill="#fff" />
      <circle cx="52" cy="28" r="1" fill="#000" />

      {/* Wings */}
      <path d="M35 40 Q25 35 30 50 Q35 55 45 50" fill="#87ceeb" />
      <path d="M65 40 Q75 35 70 50 Q65 55 55 50" fill="#87ceeb" />

      {/* Wing details */}
      <path
        d="M35 42 Q30 40 32 48"
        stroke="#003366"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M65 42 Q70 40 68 48"
        stroke="#003366"
        strokeWidth="1"
        fill="none"
      />

      {/* Book (Ravenclaw symbol) */}
      <rect
        x="40"
        y="70"
        width="20"
        height="15"
        fill="#cd7f32"
        stroke="#000"
        strokeWidth="1"
      />
      <line x1="45" y1="74" x2="55" y2="74" stroke="#000" strokeWidth="0.5" />
      <line x1="45" y1="77" x2="55" y2="77" stroke="#000" strokeWidth="0.5" />
      <line x1="45" y1="80" x2="55" y2="80" stroke="#000" strokeWidth="0.5" />
    </motion.svg>
  );

  const renderSlytherinCrest = () => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: 90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <defs>
        <linearGradient
          id="slytherinGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#006400" />
          <stop offset="50%" stopColor="#32cd32" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
      </defs>

      {/* Shield background */}
      <path
        d="M50 5 L80 20 L80 60 Q80 80 50 95 Q20 80 20 60 L20 20 Z"
        fill="url(#slytherinGradient)"
        stroke="#c0c0c0"
        strokeWidth="2"
      />

      {/* Serpent body */}
      <path
        d="M30 30 Q40 25 50 35 Q60 45 70 40 Q75 50 65 60 Q55 65 45 55 Q35 45 30 55 Q25 65 35 75"
        fill="#228b22"
        stroke="#006400"
        strokeWidth="2"
      />

      {/* Serpent head */}
      <ellipse
        cx="35"
        cy="75"
        rx="8"
        ry="6"
        fill="#32cd32"
        stroke="#006400"
        strokeWidth="1"
      />

      {/* Eyes */}
      <circle cx="32" cy="73" r="2" fill="#ff0000" />
      <circle cx="38" cy="73" r="2" fill="#ff0000" />
      <circle cx="32" cy="72" r="1" fill="#fff" />
      <circle cx="38" cy="72" r="1" fill="#fff" />

      {/* Forked tongue */}
      <path d="M35 78 L34 82 M35 78 L36 82" stroke="#ff0000" strokeWidth="1" />

      {/* Serpent patterns */}
      <circle cx="45" cy="50" r="2" fill="#006400" />
      <circle cx="55" cy="42" r="2" fill="#006400" />
      <circle cx="65" cy="55" r="2" fill="#006400" />

      {/* Scales effect */}
      <path d="M40 35 Q42 33 44 35" fill="#c0c0c0" opacity="0.7" />
      <path d="M50 45 Q52 43 54 45" fill="#c0c0c0" opacity="0.7" />
      <path d="M60 50 Q62 48 64 50" fill="#c0c0c0" opacity="0.7" />
    </motion.svg>
  );

  const renderCrest = () => {
    switch (house) {
      case "Gryffindor":
        return renderGryffindorCrest();
      case "Hufflepuff":
        return renderHufflepuffCrest();
      case "Ravenclaw":
        return renderRavenclawCrest();
      case "Slytherin":
        return renderSlytherinCrest();
      default:
        return renderGryffindorCrest();
    }
  };

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {renderCrest()}
    </motion.div>
  );
};

export default HouseCrestSVG;
