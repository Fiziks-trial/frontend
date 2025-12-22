/**
 * Game State Types and Configuration
 */

export type ChallengeType = 'time-to-distance' | 'max-height';

export interface GameState {
    currentChallenge: ChallengeType;
    isLaunched: boolean;
    isSimulating: boolean;
    projectile: any;
    trajectory: Array<{ x: number; y: number }>;
    startTime: number;
    maxHeight: number;
    maxDistance: number;
    attempts: number;
    solved: number;
    gravity: number;
    scaleFactor: number;
    baseScaleFactor: number;
    groundY: number;
    launchX: number;
    launchY: number;
    canvasWidth: number;
    canvasHeight: number;
    givenVelocity: number;
    givenAngle: number;
    targetTime: number;
    userAnswer: number;
    pendingAnswerCheck: boolean;
    landingX: number;
    simStartTime: number;
    launchVx: number;
    launchVy: number;
    expectedDistance: number;
    userExpectedDistance: number;
    maxNeededDistance: number;
}

export const INITIAL_GAME_STATE: GameState = {
    currentChallenge: 'time-to-distance',
    isLaunched: false,
    isSimulating: false,
    projectile: null,
    trajectory: [],
    startTime: 0,
    maxHeight: 0,
    maxDistance: 0,
    attempts: 0,
    solved: 0,
    gravity: 9.8,
    scaleFactor: 5,
    baseScaleFactor: 5,
    groundY: 400,
    launchX: 100,
    launchY: 400,
    canvasWidth: 900,
    canvasHeight: 500,
    givenVelocity: 0,
    givenAngle: 45,
    targetTime: 0,
    userAnswer: 0,
    pendingAnswerCheck: false,
    landingX: 0,
    simStartTime: 0,
    launchVx: 0,
    launchVy: 0,
    expectedDistance: 0,
    userExpectedDistance: 0,
    maxNeededDistance: 0,
};

export const LEARNING_CARDS = {
    'invalid-input': {
        icon: '⚠️',
        title: 'Invalid Input',
        text: 'Please enter valid numbers for angle and velocity.',
        formula: '',
        tip: 'Angle should be 0-90° and velocity should be 1-50 m/s'
    },
    'angle-range': {
        icon: '📐',
        title: 'Angle Out of Range',
        text: 'The launch angle must be between 0° and 90°. Angles below 0° would shoot into the ground, and angles above 90° would shoot backwards!',
        formula: '0° ≤ θ ≤ 90°',
        tip: '45° is a special angle for projectile motion - can you figure out why?'
    },
    'velocity-range': {
        icon: '💨',
        title: 'Velocity Out of Range',
        text: 'Keep the velocity between 1 and 50 m/s for this simulation. Real projectiles can go faster, but we need to keep things visible!',
        formula: '1 m/s ≤ v₀ ≤ 50 m/s',
        tip: 'Higher velocity means greater range AND height!'
    },
    'angle-hint': {
        icon: '📐',
        title: 'Understanding Launch Angle',
        text: 'The launch angle (θ) determines how the initial velocity is split between horizontal and vertical components.',
        formula: 'vₓ = v₀ × cos(θ)\nvᵧ = v₀ × sin(θ)',
        tip: 'Low angles (< 45°) favor distance over height. High angles (> 45°) favor height over distance.'
    },
    'velocity-hint': {
        icon: '💨',
        title: 'Understanding Initial Velocity',
        text: 'The initial velocity (v₀) is how fast the projectile leaves the launcher. It affects both range and height quadratically!',
        formula: 'R ∝ v₀² (Range)\nH ∝ v₀² (Max Height)',
        tip: 'Doubling the velocity quadruples both the range and maximum height!'
    },
} as Record<string, any>;

export const CHALLENGES = {
    'time-to-distance': {
        title: '⏱️ Time to Maximum Distance',
        description: '',
        targetInfo: 'Calculate Time (T)',
        optimalAngle: 45,
        tolerance: 0.5,
        hint: 'Use the formula: T = (2 × v₀ × sin(θ)) / g. For maximum distance, θ = 45°.',
    },
    'max-height': {
        title: '📐 Maximum Height Challenge',
        description: 'Find the angle to reach the maximum vertical height!',
        targetInfo: 'Maximize Height (H)',
        optimalAngle: 90,
        tolerance: 5,
        minVelocity: 15,
        hint: 'To go as high as possible, where should all your initial velocity be directed?',
    },
};
