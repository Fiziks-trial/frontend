"use client";

import { useCallback, useRef } from "react";

/**
 * Hook for managing physics simulation
 * Handles projectile motion calculation and animation
 */
export const usePhysicsSimulation = () => {
  const animationFrameRef = useRef<number | null>(null);
  const trajectoryRef = useRef<Array<{ x: number; y: number }>>([]);

  const simulateProjectile = useCallback(
    (
      initialAngle: number,
      initialVelocity: number,
      gravity: number = 9.8,
      onUpdate: (time: number, x: number, y: number) => void,
      onComplete: (trajectory: Array<{ x: number; y: number }>) => void,
    ) => {
      const angleRad = (initialAngle * Math.PI) / 180;
      const vx = initialVelocity * Math.cos(angleRad);
      const vy = initialVelocity * Math.sin(angleRad);

      const timeOfFlight = (2 * vy) / gravity;
      const startTime = performance.now();
      trajectoryRef.current = [];

      const animate = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsed / timeOfFlight, 1);

        if (progress < 1) {
          // Calculate position using kinematic equations
          const x = vx * elapsed;
          const y = vy * elapsed - 0.5 * gravity * elapsed * elapsed;

          trajectoryRef.current.push({ x, y });
          onUpdate(elapsed, x, Math.max(0, y));

          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Simulation complete
          onComplete(trajectoryRef.current);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [],
  );

  const cancelSimulation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  return {
    simulateProjectile,
    cancelSimulation,
    getTrajectory: () => trajectoryRef.current,
  };
};

/**
 * Hook for managing game state and challenges
 */
export const useGameState = (
  initialChallenge: "time-to-distance" | "max-height" = "time-to-distance",
) => {
  const stateRef = useRef({
    currentChallenge: initialChallenge,
    attempts: 0,
    solved: 0,
    angle: 45,
    velocity: 25,
    maxDistance: 0,
    maxHeight: 0,
    userAnswer: 0,
    isSimulating: false,
  });

  const resetState = useCallback(() => {
    stateRef.current.maxDistance = 0;
    stateRef.current.maxHeight = 0;
    stateRef.current.isSimulating = false;
  }, []);

  const incrementAttempt = useCallback(() => {
    stateRef.current.attempts++;
  }, []);

  const incrementSolved = useCallback(() => {
    stateRef.current.solved++;
  }, []);

  return {
    ...stateRef.current,
    resetState,
    incrementAttempt,
    incrementSolved,
  };
};
