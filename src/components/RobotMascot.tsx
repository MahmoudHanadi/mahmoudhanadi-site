"use client";
import * as React from "react";
import { motion, useCycle } from "framer-motion";

/**
 * RobotMascot – animated SVG robot (idle float, blink, wave on hover, smile on click)
 * Usage: <RobotMascot className="h-72 w-72" accent="#2eb69b" />
 */
export default function RobotMascot({
  className = "h-56 w-56",
  accent = "#38b2a6",
  shell = "#ffffff",
  joint = "#2b2f36",
  trim = "#e8eef2",
  shadow = "rgba(0,0,0,.18)",
}: {
  className?: string;
  accent?: string;
  shell?: string;
  joint?: string;
  trim?: string;
  shadow?: string;
}) {
  const [blink, cycleBlink] = useCycle(1, 0.12); // 1=open, 0.12=closed
  const [smile, setSmile] = React.useState(true); // reserved for future mouth variants
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => cycleBlink(), rand(1800, 3200));
    return () => clearInterval(id);
  }, [cycleBlink]);

  const onClick = () => {
    setSmile(true);
    setTimeout(() => setSmile(false), 1400);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.svg
        viewBox="0 0 240 280"
        initial={false}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onClick}
        role="img"
        aria-label="Friendly website robot assistant"
        style={{ cursor: "pointer", filter: "drop-shadow(0 12px 24px rgba(0,0,0,.25))" }}
      >
        <defs>
          <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="chest" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={accent} stopOpacity=".25" />
          </radialGradient>
        </defs>

        <motion.ellipse
          cx="120"
          cy="264"
          rx="58"
          ry="12"
          fill={shadow}
          animate={{ opacity: hovered ? 0.28 : [0.18, 0.24, 0.18] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        />

        <motion.g
          animate={{ y: hovered ? -4 : [0, -3, 0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Leg joint={joint} shell={shell} trim={trim} accent={accent} x={82} />
          <Leg joint={joint} shell={shell} trim={trim} accent={accent} x={158} />

          <g>
            <ellipse cx="120" cy="164" rx="46" ry="20" fill={joint} opacity=".9" />
            <path
              d="M78 120c8-18 27-28 42-28s34 10 42 28c6 14 8 30-2 40-10 10-28 14-40 14s-30-4-40-14c-10-10-8-26-2-40z"
              fill={shell}
              stroke={trim}
              strokeWidth="2"
            />
            <motion.circle
              cx="120"
              cy="150"
              r="20"
              fill="url(#chest)"
              stroke={accent}
              strokeOpacity=".25"
              strokeWidth="2"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </g>

          <Arm side="L" base={{ x: 78, y: 134 }} joint={joint} shell={shell} trim={trim} accent={accent} animateWave={false} />
          <Arm side="R" base={{ x: 162, y: 134 }} joint={joint} shell={shell} trim={trim} accent={accent} animateWave={true} />

          <motion.g
            transform="translate(120 90)"
            animate={{ rotate: hovered ? -6 : [0, 2.5, 0, -2.5, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          >
            <ellipse cx="0" cy="22" rx="20" ry="8" fill={joint} />
            <g transform="translate(-48,-36)">
              <rect x="0" y="0" width="96" height="72" rx="22" fill={shell} stroke={trim} strokeWidth="2" />
              <circle cx="-6" cy="36" r="10" fill={joint} />
              <circle cx="102" cy="36" r="10" fill={joint} />
              <rect x="12" y="14" width="72" height="44" rx="14" fill="url(#visor)" />
              <motion.circle cx="32" cy="36" r={6 * blink} fill="#d9f6ff" />
              <motion.circle cx="64" cy="36" r={6 * blink} fill="#d9f6ff" />
              {smile ? (
                <path d="M30 48 Q48 58 66 48" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : (
                <path d="M32 50 Q48 44 64 50" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
              )}
              <motion.rect
                x="12"
                y="18"
                width="72"
                height="2"
                fill={accent}
                style={{ opacity: 0.6 }}
                animate={{ y: [18, 54, 18] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              />
            </g>
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
}

function Arm({
  side,
  base,
  joint,
  shell,
  trim,
  accent,
  animateWave,
}: {
  side: "L" | "R";
  base: { x: number; y: number };
  joint: string;
  shell: string;
  trim: string;
  accent: string;
  animateWave: boolean;
}) {
  const dir = side === "L" ? -1 : 1;
  return (
    <motion.g
      transform={`translate(${base.x} ${base.y})`}
      animate={
        animateWave
          ? { rotate: [0, -16 * dir, 10 * dir, -12 * dir, 0] }
          : { rotate: [0, 4 * dir, 0, -4 * dir, 0] }
      }
      transition={{ repeat: Infinity, duration: animateWave ? 1.4 : 4.8, ease: "easeInOut" }}
    >
      <circle cx="0" cy="0" r="10" fill={joint} />
      <rect x="0" y="-6" width="38" height="12" rx="6" fill={shell} stroke={trim} strokeWidth="2" />
      <circle cx="38" cy="0" r="8" fill={joint} />
      <motion.g
        transform="translate(38 0)"
        animate={animateWave ? { rotate: [18 * dir, -10 * dir, 14 * dir] } : { rotate: [6, -6, 6] }}
        transition={{ repeat: Infinity, duration: animateWave ? 1.4 : 3.2, ease: "easeInOut" }}
      >
        <rect x="0" y="-5" width="34" height="10" rx="5" fill={shell} stroke={trim} strokeWidth="2" />
        <rect x="24" y="-6" width="4" height="12" rx="2" fill={accent} />
        <g transform="translate(34 0)">
          <circle cx="0" cy="0" r="7" fill={joint} />
          <rect x="3" y="-3" width="8" height="6" rx="3" fill={joint} />
          <circle cx="0" cy="-6.5" r="3" fill={joint} />
          <circle cx="0" cy="6.5" r="3" fill={joint} />
        </g>
      </motion.g>
    </motion.g>
  );
}

function Leg({
  x,
  joint,
  shell,
  trim,
  accent,
}: {
  x: number;
  joint: string;
  shell: string;
  trim: string;
  accent: string;
}) {
  return (
    <g transform={`translate(${x} 200)`}>
      <circle cx="0" cy="0" r="10" fill={joint} />
      <rect x="-8" y="0" width="16" height="34" rx="8" fill={shell} stroke={trim} strokeWidth="2" />
      <circle cx="0" cy="36" r="9" fill={joint} />
      <rect x="-9" y="36" width="18" height="32" rx="9" fill={shell} stroke={trim} strokeWidth="2" />
      <rect x="-10" y="66" width="20" height="6" rx="3" fill={accent} opacity=".7" />
      <path d="M-18 72 h36 a6 6 0 0 1 6 6 v6 h-48 v-6 a6 6 0 0 1 6-6 z" fill={shell} stroke={trim} strokeWidth="2" />
      <rect x="-14" y="84" width="28" height="4" rx="2" fill={joint} opacity=".5" />
    </g>
  );
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


