"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./projectile.module.css";
import { LearningCard } from "@/components/modals/LearningCard";
import { ResultModal } from "@/components/modals/ResultModal";
import { CHALLENGES, LEARNING_CARDS } from "@/utils/types";
import { calculateTheoretical, decomposeVelocity } from "@/utils/physics";

interface GameStateType {
  currentChallenge: "time-to-distance" | "max-height";
  isLaunched: boolean;
  isSimulating: boolean;
  angle: number;
  velocity: number;
  maxDistance: number;
  maxHeight: number;
  attempts: number;
  solved: number;
  trajectory: Array<{ x: number; y: number }>;
  userTrajectory: Array<{ x: number; y: number }>;
  expectedDistance: number;
  actualDistance: number;
  timeToUserDistance: number;
}

interface UIStateType {
  showLearningCard: boolean;
  cardType: string;
  showResultModal: boolean;
  resultIcon: string;
  resultTitle: string;
  resultMessage: string;
}

export default function ProjectileApp() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [gameState, setGameState] = useState<GameStateType>({
    currentChallenge: "time-to-distance",
    isLaunched: false,
    isSimulating: false,
    angle: 45,
    velocity: 30,
    maxDistance: 0,
    maxHeight: 0,
    attempts: 0,
    solved: 0,
    trajectory: [],
    userTrajectory: [],
    expectedDistance: 0,
    actualDistance: 0,
    timeToUserDistance: 0,
  });

  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const [uiState, setUiState] = useState<UIStateType>({
    showLearningCard: false,
    cardType: "angle-hint",
    showResultModal: false,
    resultIcon: "🎉",
    resultTitle: "Result",
    resultMessage: "",
  });

  useEffect(() => {
    initializeCanvas();
    generateProblem();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const generateProblem = () => {
    // Generate a random problem
    const velocity = Math.floor(Math.random() * 15) + 20; // 20-35 m/s
    const angle = gameState.currentChallenge === "time-to-distance" ? 45 : 90;

    const result = calculateTheoretical(angle, velocity);

    setGameState((prev) => ({
      ...prev,
      angle,
      velocity,
      expectedDistance: result.range,
      attempts: prev.attempts + 1,
    }));
    setUserInput("");
    setFeedback(null);
  };

  const initializeCanvas = () => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth || 900;
    const height = 500;

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "block";
    canvas.style.borderRadius = "16px";

    container.innerHTML = "";
    container.appendChild(canvas);

    canvasElementRef.current = canvas;
    drawInitialCanvas(canvas);
  };

  const drawInitialCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const groundY = canvas.height * 0.8;
    const launchX = 80;

    // Draw background
    ctx.fillStyle = "#0f1419";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas, groundY, launchX);

    // Draw ground
    ctx.fillStyle = "#2d4a2b";
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Draw cannon
    drawCannon(ctx, launchX, groundY, gameState.angle);

    // Draw help text
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Read the problem and enter your answer to launch!",
      canvas.width / 2,
      40,
    );
  };

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    groundY: number,
    launchX: number,
  ) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = launchX; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, groundY);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y < groundY; y += 50) {
      ctx.beginPath();
      ctx.moveTo(launchX, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const drawCannon = (
    ctx: CanvasRenderingContext2D,
    launchX: number,
    groundY: number,
    angle: number,
  ) => {
    const angleRad = (angle * Math.PI) / 180;

    // Cannon base
    ctx.fillStyle = "#4a5568";
    ctx.fillRect(launchX - 35, groundY - 35, 70, 35);

    // Cannon wheels
    ctx.strokeStyle = "#2d3748";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(launchX - 20, groundY, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(launchX + 20, groundY, 8, 0, Math.PI * 2);
    ctx.stroke();

    // Cannon barrel
    ctx.strokeStyle = "#718096";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(launchX, groundY - 35);
    ctx.lineTo(
      launchX + 45 * Math.cos(-angleRad),
      groundY - 35 + 45 * Math.sin(-angleRad),
    );
    ctx.stroke();

    // Angle indicator
    ctx.fillStyle = "#f6ad55";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${angle}°`, launchX + 35, groundY - 50);
  };

  const handleLaunch = () => {
    if (gameState.isSimulating || !userInput.trim()) {
      setFeedback({
        type: "error",
        message: "Please enter your answer first!",
      });
      return;
    }

    const userValue = parseFloat(userInput);
    if (isNaN(userValue)) {
      setFeedback({ type: "error", message: "Please enter a valid number!" });
      return;
    }

    setGameState((prev) => ({
      ...prev,
      isSimulating: true,
      isLaunched: true,
      actualDistance: userValue,
    }));

    const result = calculateTheoretical(gameState.angle, gameState.velocity);
    simulateProjectile(result, userValue);
  };

  const simulateProjectile = (result: any, userValue: number) => {
    const { vx, vy } = decomposeVelocity(gameState.velocity, gameState.angle);

    // Calculate trajectory points for the expected projectile
    const g = 9.8;
    const timeOfFlight = result.timeOfFlight;
    const trajectory: Array<{ x: number; y: number }> = [];
    const steps = 120;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * timeOfFlight;
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;

      if (y >= 0) {
        trajectory.push({ x, y });
      }
    }

    // Calculate user's projectile trajectory that lands at userValue distance
    // Using the range formula: Range = (v² × sin(2θ)) / g
    // Solve for v: v = sqrt(Range × g / sin(2θ))
    const userTrajectory: Array<{ x: number; y: number }> = [];

    const angleRad = (gameState.angle * Math.PI) / 180;
    const sin2Angle = Math.sin(2 * angleRad);

    // Calculate the velocity needed to land at userValue distance with the current angle
    let userVelocity = gameState.velocity;
    if (sin2Angle > 0) {
      userVelocity = Math.sqrt((userValue * g) / sin2Angle);
    }

    // Decompose the velocity with the user's velocity
    const userVx = userVelocity * Math.cos(angleRad);
    const userVy = userVelocity * Math.sin(angleRad);

    // Calculate the time of flight for user's trajectory
    const userTimeOfFlight = userVy > 0 ? (2 * userVy) / g : 0;

    // Calculate points along the proper physics-based trajectory
    const userSteps = 120;
    for (let i = 0; i <= userSteps; i++) {
      const t = (i / userSteps) * userTimeOfFlight;
      const x = userVx * t;
      const y = userVy * t - 0.5 * g * t * t;

      // Only include points at or above ground, or the final landing point
      if (y >= -0.1 || i === userSteps) {
        userTrajectory.push({ x, y: Math.max(0, y) });
      }
    }

    // Ensure the trajectory ends exactly at userValue distance on ground
    if (
      userTrajectory.length === 0 ||
      userTrajectory[userTrajectory.length - 1].x < userValue - 1
    ) {
      userTrajectory.push({ x: userValue, y: 0 });
    }

    setGameState((prev) => ({
      ...prev,
      trajectory,
      maxDistance: result.range,
      maxHeight: result.maxHeight,
      userTrajectory,
      timeToUserDistance: userValue / vx,
    }));

    animateTrajectory(
      trajectory,
      result,
      userValue,
      userTrajectory,
      userValue / vx,
      userValue / vx,
    );
  };

  const animateTrajectory = (
    trajectory: Array<{ x: number; y: number }>,
    result: any,
    userValue: number,
    userTrajectory: Array<{ x: number; y: number }>,
    timeToUserDistance: number,
    userLandingTime: number,
  ) => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const groundY = canvas.height * 0.8;
    const launchX = 80;
    const launchY = groundY;

    let step = 0;
    const totalSteps = trajectory.length;

    // Use the passed-in parameters directly
    const userTrajectoryData = userTrajectory;
    const timeToUserDistanceData = timeToUserDistance;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#0f1419";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, canvas, groundY, launchX);

      // Draw ground
      ctx.fillStyle = "#2d4a2b";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Draw cannon
      drawCannon(ctx, launchX, groundY, gameState.angle);

      // Calculate scale factor
      const availableWidth = canvas.width - launchX - 50;
      const availableHeight = groundY - 50;
      const scaleX = availableWidth / (result.range + 20);
      const scaleY = availableHeight / (Math.max(result.maxHeight, 1) + 20);
      const scaleFactor = Math.min(scaleX, scaleY);

      // Draw expected distance marker
      const expectedX = launchX + result.range * scaleFactor;
      ctx.strokeStyle = "rgba(76, 175, 80, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(expectedX, groundY - 10);
      ctx.lineTo(expectedX, groundY + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#4caf50";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Expected", expectedX, groundY + 55);
      ctx.fillText(`${result.range.toFixed(1)}m`, expectedX, groundY + 70);

      // Draw user's expected marker
      const userX = launchX + gameState.actualDistance * scaleFactor;
      ctx.strokeStyle = "rgba(33, 150, 243, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(userX, groundY - 10);
      ctx.lineTo(userX, groundY + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#2196f3";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Your Answer", userX, groundY + 55);
      ctx.fillText(
        `${gameState.actualDistance.toFixed(1)}m`,
        userX,
        groundY + 70,
      );

      // Show current user input while typing (before launch)
      if (userInput && !gameState.isSimulating && !gameState.isLaunched) {
        const userInputValue = parseFloat(userInput);
        if (!isNaN(userInputValue) && userInputValue > 0) {
          const enteredX = launchX + userInputValue * scaleFactor;
          ctx.strokeStyle = "rgba(255, 159, 64, 0.7)";
          ctx.setLineDash([3, 3]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(enteredX, groundY - 10);
          ctx.lineTo(enteredX, groundY + 40);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = "#ff9f40";
          ctx.font = "bold 12px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Entered", enteredX, groundY + 55);
          ctx.fillText(`${userInputValue.toFixed(1)}m`, enteredX, groundY + 70);
        }
      }

      // Draw trajectory line
      if (step > 1) {
        ctx.strokeStyle = "rgba(255, 193, 7, 0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();

        const startPoint = trajectory[0];
        ctx.moveTo(
          launchX + startPoint.x * scaleFactor,
          launchY - startPoint.y * scaleFactor,
        );

        for (let i = 1; i <= step && i < trajectory.length; i++) {
          const point = trajectory[i];
          const screenX = launchX + point.x * scaleFactor;
          const screenY = launchY - point.y * scaleFactor;
          ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();

        // Draw glowing trajectory points
        ctx.shadowColor = "rgba(255, 193, 7, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "rgba(255, 193, 7, 0.8)";
        const pointInterval = Math.max(1, Math.floor(step / 20));
        for (
          let i = 0;
          i <= step && i < trajectory.length;
          i += pointInterval
        ) {
          const point = trajectory[i];
          const screenX = launchX + point.x * scaleFactor;
          const screenY = launchY - point.y * scaleFactor;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowColor = "transparent";
      }

      // Draw user trajectory (entered distance path)
      if (userTrajectoryData && userTrajectoryData.length > 0) {
        ctx.strokeStyle = "rgba(255, 159, 64, 0.8)";
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();

        const startPoint = userTrajectoryData[0];
        const startY = Math.max(0, startPoint.y); // Clamp to ground
        ctx.moveTo(
          launchX + startPoint.x * scaleFactor,
          launchY - startY * scaleFactor,
        );

        for (let i = 1; i < userTrajectoryData.length; i++) {
          const point = userTrajectoryData[i];
          const screenX = launchX + point.x * scaleFactor;
          const pointY = Math.max(0, point.y); // Clamp to ground
          const screenY = launchY - pointY * scaleFactor;
          ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw launch point
      ctx.fillStyle = "#4caf50";
      ctx.beginPath();
      ctx.arc(launchX, launchY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw main projectile (following expected trajectory)
      if (step > 0 && step < trajectory.length) {
        const projectile = trajectory[step];
        const projectileX = launchX + projectile.x * scaleFactor;
        const projectileY = launchY - projectile.y * scaleFactor;

        ctx.fillStyle = "rgba(255, 193, 7, 1)";
        ctx.shadowColor = "rgba(255, 193, 7, 0.8)";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(projectileX, projectileY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
      }

      // Draw user projectile (following user entered distance trajectory)
      if (userTrajectoryData && userTrajectoryData.length > 0 && step > 0) {
        // Animate through the user trajectory based on current step
        // The user trajectory extends from entered distance to landing
        // We want to animate it similarly to how the main projectile animates
        const userStep = Math.min(
          Math.floor((step / trajectory.length) * userTrajectoryData.length),
          userTrajectoryData.length - 1,
        );

        if (userStep >= 0 && userStep < userTrajectoryData.length) {
          const userProjectile = userTrajectoryData[userStep];
          const userProjectileX = launchX + userProjectile.x * scaleFactor;
          const projY = Math.max(0, userProjectile.y); // Clamp to ground
          const userProjectileY = launchY - projY * scaleFactor;

          // Only draw if projectile hasn't landed yet or is landing
          if (projY >= -2) {
            ctx.fillStyle = "rgba(255, 159, 64, 1)";
            ctx.shadowColor = "rgba(255, 159, 64, 0.8)";
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(userProjectileX, userProjectileY, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "transparent";
          }
        }
      }

      // Draw landing marker for orange projectile (where it actually lands)
      if (gameState.userTrajectory.length > 0 && gameState.isLaunched) {
        // Get the last point of the user trajectory (landing position)
        const lastPoint =
          gameState.userTrajectory[gameState.userTrajectory.length - 1];
        const userLandingX = launchX + lastPoint.x * scaleFactor;

        ctx.fillStyle = "rgba(255, 159, 64, 0.6)";
        ctx.beginPath();
        ctx.arc(userLandingX, groundY, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 159, 64, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(userLandingX, groundY, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Increment step
      step = Math.min(step + 2, totalSteps);

      if (step < totalSteps) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        const tolerance =
          gameState.currentChallenge === "time-to-distance" ? 1 : 5;
        const isCorrect = Math.abs(userValue - result.range) <= tolerance;

        setTimeout(() => {
          setGameState((prev) => ({ ...prev, isSimulating: false }));
          setFeedback({
            type: isCorrect ? "success" : "error",
            message: isCorrect
              ? `Excellent! Your answer was correct! Expected: ${result.range.toFixed(2)}m, You entered: ${userValue.toFixed(2)}m`
              : `Not quite! Expected: ${result.range.toFixed(2)}m, You entered: ${userValue.toFixed(2)}m. Try again!`,
          });

          if (isCorrect) {
            setGameState((prev) => ({
              ...prev,
              solved: prev.solved + 1,
            }));
          }
        }, 500);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleNextProblem = () => {
    setGameState((prev) => ({
      ...prev,
      maxDistance: 0,
      maxHeight: 0,
      isLaunched: false,
      trajectory: [],
      userTrajectory: [],
      actualDistance: 0,
      timeToUserDistance: 0,
    }));
    generateProblem();
  };

  const challenge = CHALLENGES[gameState.currentChallenge];
  const problemText =
    gameState.currentChallenge === "time-to-distance"
      ? `A projectile is launched at an angle of ${gameState.angle}° with an initial velocity of ${gameState.velocity} m/s. Calculate the horizontal distance it will travel. (Ignore air resistance)`
      : `A projectile is launched straight up with an initial velocity of ${gameState.velocity} m/s. Calculate the maximum height it will reach. (Ignore air resistance)`;

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1>🚀 Projectile Motion Physics</h1>
        <p className={styles.subtitle}>
          Solve real-world problems with physics
        </p>
      </header>

      {/* Challenge Selector */}
      <div className={styles.challengeTabs}>
        <button
          className={`${styles.tabBtn} ${gameState.currentChallenge === "time-to-distance" ? styles.active : ""}`}
          onClick={() => {
            setGameState((prev) => ({
              ...prev,
              currentChallenge: "time-to-distance",
            }));
            generateProblem();
          }}
        >
          ⏱️ Horizontal Distance
        </button>
        <button
          className={`${styles.tabBtn} ${gameState.currentChallenge === "max-height" ? styles.active : ""}`}
          onClick={() => {
            setGameState((prev) => ({
              ...prev,
              currentChallenge: "max-height",
            }));
            generateProblem();
          }}
        >
          📈 Maximum Height
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Problem Panel */}
        <div className={styles.controlPanel}>
          {/* Problem Statement */}
          <div className={styles.problemPanel}>
            <h2>📋 Problem</h2>
            <div className={styles.problemStatement}>{problemText}</div>

            {/* Input Section */}
            <div className={styles.answerSection}>
              <label htmlFor="answer-input">
                {gameState.currentChallenge === "time-to-distance"
                  ? "Calculate the horizontal distance (in meters):"
                  : "Calculate the maximum height (in meters):"}
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="answer-input"
                  type="number"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleLaunch();
                  }}
                  placeholder="Enter your answer..."
                  disabled={gameState.isSimulating}
                  className={styles.answerInput}
                  step="0.1"
                  min="0"
                />
                <span className={styles.unit}>m</span>
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`${styles.feedback} ${styles[feedback.type]}`}>
                {feedback.type === "success" && "✓ "}
                {feedback.type === "error" && "✗ "}
                {feedback.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={`${styles.btn} ${styles.btnLaunch}`}
                onClick={handleLaunch}
                disabled={gameState.isSimulating}
              >
                🚀 Launch & Check
              </button>
              {!gameState.isSimulating && gameState.isLaunched && (
                <button
                  className={`${styles.btn} ${styles.btnNext}`}
                  onClick={handleNextProblem}
                >
                  ➡️ Next Problem
                </button>
              )}
            </div>

            {/* Tips */}
            <div className={styles.tipsBox}>
              <h3>💡 Formula Hint</h3>
              {gameState.currentChallenge === "time-to-distance" ? (
                <>
                  <p>
                    <strong>Horizontal Distance:</strong>
                  </p>
                  <code>R = (v₀² × sin(2θ)) / g</code>
                  <p className={styles.tipText}>where g = 9.8 m/s²</p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Maximum Height:</strong>
                  </p>
                  <code>H = (v₀² × sin²(θ)) / (2g)</code>
                  <p className={styles.tipText}>where g = 9.8 m/s²</p>
                </>
              )}
            </div>

            {/* Score */}
            <div className={styles.scoreBox}>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>Problems Solved</span>
                <span className={styles.scoreValue}>{gameState.solved}</span>
              </div>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>Attempts</span>
                <span className={styles.scoreValue}>{gameState.attempts}</span>
              </div>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>Success Rate</span>
                <span className={styles.scoreValue}>
                  {gameState.attempts > 0
                    ? Math.round((gameState.solved / gameState.attempts) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className={styles.canvasSection} ref={canvasRef} />
      </div>

      {/* Footer Info */}
      <div className={styles.infoBox}>
        <h3>📚 How it works</h3>
        <ol>
          <li>Read the physics problem carefully</li>
          <li>Calculate your answer using the formula hint</li>
          <li>Enter your answer and click "Launch & Check"</li>
          <li>See the projectile animation showing expected vs. your answer</li>
          <li>Get the next problem or try again!</li>
        </ol>
      </div>

      {/* Learning Card Modal */}
      <LearningCard
        isVisible={uiState.showLearningCard}
        icon={LEARNING_CARDS[uiState.cardType]?.icon || ""}
        title={LEARNING_CARDS[uiState.cardType]?.title || ""}
        text={LEARNING_CARDS[uiState.cardType]?.text || ""}
        formula={LEARNING_CARDS[uiState.cardType]?.formula || ""}
        tip={LEARNING_CARDS[uiState.cardType]?.tip || ""}
        onClose={() =>
          setUiState((prev) => ({
            ...prev,
            showLearningCard: false,
          }))
        }
        onUnderstand={() =>
          setUiState((prev) => ({
            ...prev,
            showLearningCard: false,
          }))
        }
      />

      {/* Result Modal */}
      <ResultModal
        isVisible={uiState.showResultModal}
        icon={uiState.resultIcon}
        title={uiState.resultTitle}
        message={uiState.resultMessage}
        stats={uiState.resultMessage}
        onClose={() =>
          setUiState((prev) => ({
            ...prev,
            showResultModal: false,
          }))
        }
        onRetry={() => {
          setUiState((prev) => ({
            ...prev,
            showResultModal: false,
          }));
          handleNextProblem();
        }}
        onNext={handleNextProblem}
        showNext={true}
      />
    </div>
  );
}
