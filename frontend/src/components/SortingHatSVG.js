import React from "react";
import { motion } from "framer-motion";

const SortingHatSVG = ({ size = 200 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="30%" stopColor="#A0522D" />
          <stop offset="70%" stopColor="#654321" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        <linearGradient id="brimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#654321" />
          <stop offset="50%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="3"
            dy="6"
            stdDeviation="4"
            floodColor="#000"
            floodOpacity="0.3"
          />
        </filter>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feMorphology operator="dilate" radius="2" />
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hat brim */}
      <motion.ellipse
        cx="100"
        cy="150"
        rx="90"
        ry="20"
        fill="url(#brimGradient)"
        filter="url(#shadow)"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      {/* Hat main body */}
      <motion.path
        d="M 100 150 
           Q 80 140, 70 120
           Q 60 100, 65 80
           Q 70 60, 80 45
           Q 90 30, 105 20
           Q 120 15, 130 25
           Q 140 35, 135 50
           Q 130 65, 125 80
           Q 120 95, 115 110
           Q 112 125, 115 140
           Q 118 150, 100 150 Z"
        fill="url(#hatGradient)"
        filter="url(#shadow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Hat wrinkles and details */}
      <motion.path
        d="M 75 120 Q 85 115, 95 120"
        stroke="#654321"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />

      <motion.path
        d="M 80 100 Q 90 95, 100 100"
        stroke="#654321"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />

      <motion.path
        d="M 85 80 Q 95 75, 105 80"
        stroke="#654321"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      />

      {/* Magical eyes */}
      <motion.circle
        cx="90"
        cy="90"
        r="3"
        fill="#FFD700"
        filter="url(#glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.circle>

      <motion.circle
        cx="110"
        cy="85"
        r="3"
        fill="#FFD700"
        filter="url(#glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.7, duration: 0.3 }}
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </motion.circle>

      {/* Magical mouth */}
      <motion.path
        d="M 95 105 Q 100 110, 105 105"
        stroke="#FFD700"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      />

      {/* Floating magical sparkles */}
      <motion.g>
        <motion.circle
          cx="150"
          cy="60"
          r="2"
          fill="#FFD700"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -10, -20],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2,
          }}
        />

        <motion.circle
          cx="50"
          cy="80"
          r="1.5"
          fill="#FFF"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -15, -30],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 3,
          }}
        />

        <motion.circle
          cx="160"
          cy="120"
          r="1"
          fill="#FFD700"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -8, -16],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 4,
          }}
        />
      </motion.g>
    </motion.svg>
  );
};

export default SortingHatSVG;
