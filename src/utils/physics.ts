/**
 * Physics Calculations Utility
 * Theoretical calculations for projectile motion
 */

export interface PhysicsResult {
  maxHeight: number;
  range: number;
  timeOfFlight: number;
}

export const calculateTheoretical = (
  angle: number,
  velocity: number,
  gravity: number = 9.8,
): PhysicsResult => {
  const angleRad = (angle * Math.PI) / 180;

  // Maximum height: H = (v₀² × sin²θ) / (2g)
  const maxHeight =
    (velocity * velocity * Math.sin(angleRad) * Math.sin(angleRad)) /
    (2 * gravity);

  // Range: R = (v₀² × sin(2θ)) / g
  const range = (velocity * velocity * Math.sin(2 * angleRad)) / gravity;

  // Time of flight: T = (2 × v₀ × sinθ) / g
  const timeOfFlight = (2 * velocity * Math.sin(angleRad)) / gravity;

  return {
    maxHeight,
    range,
    timeOfFlight,
  };
};

export const decomposeVelocity = (velocity: number, angle: number) => {
  const angleRad = (angle * Math.PI) / 180;
  return {
    vx: velocity * Math.cos(angleRad),
    vy: velocity * Math.sin(angleRad),
  };
};
