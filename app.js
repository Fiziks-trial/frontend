// ============================================
// PHYSICS LEARNING APP - Projectile Motion
// Using Matter.js for physics simulation
// ============================================

// Matter.js modules
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  Events,
  Vector,
  Mouse,
  MouseConstraint,
} = Matter;

// ============================================
// GAME STATE & CONFIGURATION
// ============================================
const GameState = {
  currentChallenge: "time-to-distance", // 'time-to-distance' or 'max-height'
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
  scaleFactor: 5, // pixels per meter - will be adjusted dynamically
  baseScaleFactor: 5,
  groundY: 400,
  launchX: 100,
  launchY: 400,
  canvasWidth: 900,
  canvasHeight: 500,

  // Problem parameters
  givenVelocity: 0,
  givenAngle: 45,
  targetTime: 0,
  userAnswer: 0,
  pendingAnswerCheck: false,
  landingX: 0,

  // Simulation timing
  simStartTime: 0,
  launchVx: 0,
  launchVy: 0,
  expectedDistance: 0, // Theoretical range based on physics formula
  userExpectedDistance: 0, // Distance based on user's entered time
  maxNeededDistance: 0, // Max distance to fit in canvas

  // Challenge targets
  challenges: {
    "time-to-distance": {
      title: "⏱️ Time to Maximum Distance",
      description: "",
      targetInfo: "Calculate Time (T)",
      optimalAngle: 45,
      tolerance: 0.5, // seconds tolerance
      hint: "Use the formula: T = (2 × v₀ × sin(θ)) / g. For maximum distance, θ = 45°.",
      generateProblem: () => {
        // Generate random velocity between 15 and 40 m/s
        const velocity = Math.floor(Math.random() * 26) + 15;
        const angle = 45; // Optimal angle for max distance
        const angleRad = (angle * Math.PI) / 180;
        const time = (2 * velocity * Math.sin(angleRad)) / 9.8;
        return { velocity, angle, time: parseFloat(time.toFixed(2)) };
      },
      successCondition: (userTime, correctTime) => {
        return Math.abs(userTime - correctTime) <= 0.5;
      },
    },
    "max-height": {
      title: "📐 Maximum Height Challenge",
      description: "Find the angle to reach the maximum vertical height!",
      targetInfo: "Maximize Height (H)",
      optimalAngle: 90,
      tolerance: 5,
      minVelocity: 15,
      hint: "To go as high as possible, where should all your initial velocity be directed?",
      successCondition: (angle, velocity, result) => {
        // Check if angle is close to 90 degrees for max height
        return Math.abs(angle - 90) <= 5 && velocity >= 15;
      },
    },
  },
};

// ============================================
// MATTER.JS SETUP
// ============================================
let engine, render, runner, world;

function initMatterJS() {
  const container = document.getElementById("canvas-container");
  const width = container.clientWidth || 900;
  const height = 500;

  GameState.canvasWidth = width;
  GameState.canvasHeight = height;

  // Create engine
  engine = Engine.create({
    gravity: { x: 0, y: 0 }, // We'll manually apply gravity for better control
  });
  world = engine.world;

  // Create renderer
  render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: "#1a1a2e",
      pixelRatio: window.devicePixelRatio,
    },
  });

  // Create ground - extends beyond visible area
  const ground = Bodies.rectangle(
    width,
    GameState.groundY + 50,
    width * 4,
    100,
    {
      isStatic: true,
      render: {
        fillStyle: "#2d5a27",
      },
      label: "ground",
    },
  );

  // No walls - projectile should fly freely

  // Add grass texture effect (multiple small rectangles) - extends beyond visible
  const grassElements = [];
  for (let i = 0; i < width * 2; i += 15) {
    const grassHeight = 20 + Math.random() * 15;
    const grass = Bodies.rectangle(
      i,
      GameState.groundY - grassHeight / 2,
      4,
      grassHeight,
      {
        isStatic: true,
        render: { fillStyle: "#4a7c3f" },
        isSensor: true,
      },
    );
    grassElements.push(grass);
  }

  Composite.add(world, [ground, ...grassElements]);

  // Draw static elements
  drawCannon();
  drawGrid();
  drawTargetZone();

  // Run the renderer
  Render.run(render);

  // Create runner
  runner = Runner.create();
  Runner.run(runner, engine);

  // Setup collision detection
  setupCollisionEvents();

  // Custom rendering for trajectory
  Events.on(render, "afterRender", () => {
    drawTrajectory();
    drawVelocityVector();
    drawMeasurements();
    updateLiveData();
  });
}

// ============================================
// DRAWING FUNCTIONS
// ============================================
function drawCannon() {
  // Make cannon bigger and more visible
  const cannonBase = Bodies.rectangle(
    GameState.launchX,
    GameState.groundY - 25,
    80,
    50,
    {
      isStatic: true,
      render: {
        fillStyle: "#5a5a5a",
      },
      label: "cannon-base",
    },
  );

  // Add cannon barrel
  const cannonBarrel = Bodies.rectangle(
    GameState.launchX + 30,
    GameState.groundY - 45,
    60,
    20,
    {
      isStatic: true,
      render: {
        fillStyle: "#3a3a3a",
      },
      label: "cannon-barrel",
    },
  );

  Composite.add(world, [cannonBase, cannonBarrel]);
}

function drawGrid() {
  // Grid is drawn on afterRender
}

function drawTargetZone() {
  // Target zone visualization based on challenge
  if (GameState.currentChallenge === "max-distance") {
    // Draw distance markers
    const ctx = render.context;
    if (ctx) {
      // This will be drawn in afterRender
    }
  }
}

function drawTrajectory() {
  if (GameState.trajectory.length < 2) return;

  const ctx = render.context;

  // Draw glowing trajectory path
  ctx.save();
  ctx.shadowColor = "rgba(253, 121, 168, 0.8)";
  ctx.shadowBlur = 10;

  // Draw main trajectory line with gradient
  ctx.beginPath();
  ctx.strokeStyle = "rgba(253, 121, 168, 0.8)";
  ctx.lineWidth = 3;

  ctx.moveTo(GameState.trajectory[0].x, GameState.trajectory[0].y);
  for (let i = 1; i < GameState.trajectory.length; i++) {
    ctx.lineTo(GameState.trajectory[i].x, GameState.trajectory[i].y);
  }
  ctx.stroke();
  ctx.restore();

  // Draw animated trajectory points with varying sizes
  const time = Date.now() / 200;
  GameState.trajectory.forEach((point, index) => {
    if (index % 4 === 0) {
      // Pulsing effect
      const pulse = Math.sin(time + index * 0.3) * 2 + 6;
      const alpha = 0.5 + Math.sin(time + index * 0.2) * 0.3;

      ctx.beginPath();
      ctx.arc(point.x, point.y, pulse, 0, Math.PI * 2);

      // Color gradient from yellow to orange based on position
      const hue = 40 + (index / GameState.trajectory.length) * 20;
      ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
      ctx.fill();

      // Inner bright core
      ctx.beginPath();
      ctx.arc(point.x, point.y, pulse * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha + 0.2})`;
      ctx.fill();
    }
  });

  // Draw user's expected landing marker (based on their entered time) - ORANGE
  // This shows where the user THINKS the projectile will land based on their time answer
  if (GameState.userExpectedDistance > 0 && GameState.isLaunched) {
    const userExpectedX =
      GameState.launchX +
      GameState.userExpectedDistance * GameState.scaleFactor;

    // Draw user's expected landing zone - dotted orange circle
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.shadowColor = "rgba(251, 146, 60, 0.6)";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(userExpectedX, GameState.groundY - 5, 22, 0, Math.PI * 2);
    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw vertical dotted line
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(userExpectedX, GameState.groundY - 27);
    ctx.lineTo(userExpectedX, GameState.groundY - 80);
    ctx.strokeStyle = "rgba(251, 146, 60, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Draw "Your guess" label
    ctx.save();
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";

    const userText = `Your guess (T=${GameState.userAnswer}s): ${GameState.userExpectedDistance.toFixed(1)} m`;
    const userTextWidth = ctx.measureText(userText).width;

    // Background for text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      userExpectedX - userTextWidth / 2 - 8,
      GameState.groundY - 105,
      userTextWidth + 16,
      22,
    );

    // Border
    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      userExpectedX - userTextWidth / 2 - 8,
      GameState.groundY - 105,
      userTextWidth + 16,
      22,
    );

    // Text
    ctx.fillStyle = "#fb923c";
    ctx.fillText(userText, userExpectedX, GameState.groundY - 89);
    ctx.restore();
  }

  // Draw actual/correct landing marker - GREEN (shows where projectile ACTUALLY lands)
  // This appears during simulation to show the correct target, and stays after landing
  if (GameState.expectedDistance > 0 && GameState.isLaunched) {
    const correctX =
      GameState.launchX + GameState.expectedDistance * GameState.scaleFactor;

    // Draw correct landing zone - dashed green circle
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.shadowColor = "rgba(46, 204, 113, 0.6)";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(correctX, GameState.groundY - 5, 25, 0, Math.PI * 2);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw vertical dashed line from correct landing point
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(correctX, GameState.groundY - 30);
    ctx.lineTo(correctX, GameState.groundY - 130);
    ctx.strokeStyle = "rgba(46, 204, 113, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Draw "Correct landing" label
    ctx.save();
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";

    const correctText = `Correct landing: ${GameState.expectedDistance.toFixed(1)} m`;
    const textWidth = ctx.measureText(correctText).width;

    // Background for text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      correctX - textWidth / 2 - 8,
      GameState.groundY - 155,
      textWidth + 16,
      22,
    );

    // Border
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      correctX - textWidth / 2 - 8,
      GameState.groundY - 155,
      textWidth + 16,
      22,
    );

    // Text
    ctx.fillStyle = "#2ecc71";
    ctx.fillText(correctText, correctX, GameState.groundY - 139);
    ctx.restore();
  }

  // Draw projectile final position marker after landing
  if (
    !GameState.isSimulating &&
    GameState.trajectory.length > 0 &&
    GameState.maxDistance > 0
  ) {
    // Calculate actual landing X position from distance in meters (consistent calculation)
    const actualLandingX =
      GameState.launchX + GameState.maxDistance * GameState.scaleFactor;

    // Draw actual landing zone circle - solid green
    ctx.save();
    ctx.shadowColor = "rgba(46, 204, 113, 0.8)";
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.arc(actualLandingX, GameState.groundY - 5, 20, 0, Math.PI * 2);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Fill with semi-transparent green
    ctx.fillStyle = "rgba(46, 204, 113, 0.3)";
    ctx.fill();

    // Draw X mark
    ctx.beginPath();
    ctx.moveTo(actualLandingX - 10, GameState.groundY - 15);
    ctx.lineTo(actualLandingX + 10, GameState.groundY + 5);
    ctx.moveTo(actualLandingX + 10, GameState.groundY - 15);
    ctx.lineTo(actualLandingX - 10, GameState.groundY + 5);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Draw "Landed" label at actual landing point
    ctx.save();
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    const landedText = `Landed: ${GameState.maxDistance.toFixed(1)} m`;

    // Background for text
    const textWidth = ctx.measureText(landedText).width;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      actualLandingX - textWidth / 2 - 10,
      GameState.groundY + 15,
      textWidth + 20,
      26,
    );

    // Border
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      actualLandingX - textWidth / 2 - 10,
      GameState.groundY + 15,
      textWidth + 20,
      26,
    );

    // Text
    ctx.fillStyle = "#2ecc71";
    ctx.fillText(landedText, actualLandingX, GameState.groundY + 33);
    ctx.restore();

    // Draw difference indicator between USER's expected distance and actual landing
    if (GameState.userExpectedDistance > 0) {
      const userExpectedX =
        GameState.launchX +
        GameState.userExpectedDistance * GameState.scaleFactor;
      const difference = GameState.maxDistance - GameState.userExpectedDistance;
      const absDifference = Math.abs(difference);

      // Only show if there's a meaningful difference (more than 0.5m)
      if (absDifference > 0.5) {
        ctx.save();

        // Draw connecting line between user's expected and actual
        const minX = Math.min(userExpectedX, actualLandingX);
        const maxX = Math.max(userExpectedX, actualLandingX);
        const lineY = GameState.groundY + 55;

        // Determine color based on difference direction
        const diffColor = "#f87171"; // Red for wrong answer difference

        // Draw horizontal bracket line
        ctx.strokeStyle = diffColor;
        ctx.lineWidth = 3;
        ctx.setLineDash([]);

        // Left vertical tick
        ctx.beginPath();
        ctx.moveTo(minX, lineY - 10);
        ctx.lineTo(minX, lineY + 10);
        ctx.stroke();

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(minX, lineY);
        ctx.lineTo(maxX, lineY);
        ctx.stroke();

        // Right vertical tick
        ctx.beginPath();
        ctx.moveTo(maxX, lineY - 10);
        ctx.lineTo(maxX, lineY + 10);
        ctx.stroke();

        // Draw arrows on the line
        const midX = (minX + maxX) / 2;
        ctx.beginPath();
        ctx.moveTo(midX - 8, lineY - 6);
        ctx.lineTo(midX, lineY);
        ctx.lineTo(midX - 8, lineY + 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(midX + 8, lineY - 6);
        ctx.lineTo(midX, lineY);
        ctx.lineTo(midX + 8, lineY + 6);
        ctx.stroke();

        // Draw difference label
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";

        const diffText =
          difference > 0
            ? `Δ ${absDifference.toFixed(1)} m (your guess was short)`
            : `Δ ${absDifference.toFixed(1)} m (your guess was far)`;
        const diffTextWidth = ctx.measureText(diffText).width;

        // Background for difference text
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(
          midX - diffTextWidth / 2 - 12,
          lineY + 18,
          diffTextWidth + 24,
          30,
        );

        // Border with glow
        ctx.shadowColor = diffColor;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = diffColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          midX - diffTextWidth / 2 - 12,
          lineY + 18,
          diffTextWidth + 24,
          30,
        );
        ctx.shadowBlur = 0;

        // Difference text
        ctx.fillStyle = diffColor;
        ctx.fillText(diffText, midX, lineY + 38);

        ctx.restore();
      }
    }
  }
}

function drawVelocityVector() {
  if (!GameState.projectile || !GameState.isSimulating) return;

  const ctx = render.context;
  const pos = GameState.projectile.position;
  const vel = GameState.projectile.velocity;

  // Scale velocity for visualization (bigger arrows)
  const scale = 8;
  const endX = pos.x + vel.x * scale;
  const endY = pos.y + vel.y * scale;

  // Draw glowing velocity vector
  ctx.save();
  ctx.shadowColor = "rgba(0, 184, 148, 0.8)";
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.strokeStyle = "#00b894";
  ctx.lineWidth = 4;
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();

  // Draw arrowhead
  const angle = Math.atan2(vel.y, vel.x);
  const arrowSize = 14;
  ctx.beginPath();
  ctx.fillStyle = "#00b894";
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle - Math.PI / 6),
    endY - arrowSize * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle + Math.PI / 6),
    endY - arrowSize * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();

  // Draw component vectors
  // Horizontal component (red)
  ctx.beginPath();
  ctx.strokeStyle = "rgba(231, 76, 60, 0.7)";
  ctx.lineWidth = 2;
  ctx.setLineDash([3, 3]);
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(pos.x + vel.x * scale, pos.y);
  ctx.stroke();

  // Vertical component (blue)
  ctx.beginPath();
  ctx.strokeStyle = "rgba(52, 152, 219, 0.7)";
  ctx.moveTo(pos.x + vel.x * scale, pos.y);
  ctx.lineTo(pos.x + vel.x * scale, pos.y + vel.y * scale);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawMeasurements() {
  const ctx = render.context;

  // Draw grid lines and measurements
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;

  // Draw grid based on dynamic scale
  const gridSpacingMeters = 10; // Grid every 10 meters

  // Vertical grid lines
  for (let meters = 0; meters <= 200; meters += gridSpacingMeters) {
    const x = GameState.launchX + meters * GameState.scaleFactor;
    if (x > render.options.width) break;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GameState.groundY);
    ctx.stroke();

    // Distance labels
    if (meters >= 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "11px Arial";
      ctx.fillText(`${meters}m`, x - 12, GameState.groundY + 18);
    }
  }

  // Horizontal grid lines
  for (let meters = 0; meters <= 100; meters += gridSpacingMeters) {
    const y = GameState.groundY - meters * GameState.scaleFactor;
    if (y < 20) break;

    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(render.options.width, y);
    ctx.stroke();

    // Height labels
    if (meters > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "11px Arial";
      ctx.fillText(`${meters}m`, 10, y + 4);
    }
  }

  // Draw max height indicator
  if (GameState.maxHeight > 0) {
    const maxHeightY =
      GameState.groundY - GameState.maxHeight * GameState.scaleFactor;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(52, 152, 219, 0.8)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(GameState.launchX, maxHeightY);
    ctx.lineTo(
      GameState.launchX + GameState.maxDistance * GameState.scaleFactor,
      maxHeightY,
    );
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#3498db";
    ctx.font = "bold 12px Arial";
    ctx.fillText(
      `Max H: ${GameState.maxHeight.toFixed(1)}m`,
      GameState.launchX + 10,
      maxHeightY - 5,
    );
  }

  // Draw max distance indicator
  if (GameState.maxDistance > 0 && !GameState.isSimulating) {
    const maxDistX =
      GameState.launchX + GameState.maxDistance * GameState.scaleFactor;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(231, 76, 60, 0.8)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(maxDistX, GameState.groundY);
    ctx.lineTo(maxDistX, GameState.groundY - 50);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#e74c3c";
    ctx.font = "bold 12px Arial";
    ctx.fillText(
      `R: ${GameState.maxDistance.toFixed(1)}m`,
      maxDistX - 30,
      GameState.groundY - 55,
    );
  }

  // Draw angle indicator at cannon - use dynamic angle from problem
  let angle = GameState.givenAngle || 45;
  if (GameState.currentChallenge !== "time-to-distance") {
    angle = parseFloat(document.getElementById("angle-input").value) || 45;
  }
  const angleRad = (angle * Math.PI) / 180;
  const indicatorLength = 80;

  ctx.beginPath();
  ctx.strokeStyle = "#fdcb6e";
  ctx.lineWidth = 4;
  ctx.moveTo(GameState.launchX, GameState.groundY - 45);
  ctx.lineTo(
    GameState.launchX + indicatorLength * Math.cos(-angleRad),
    GameState.groundY - 45 + indicatorLength * Math.sin(-angleRad),
  );
  ctx.stroke();

  // Angle arc
  ctx.beginPath();
  ctx.strokeStyle = "rgba(253, 203, 110, 0.5)";
  ctx.lineWidth = 2;
  ctx.arc(GameState.launchX, GameState.groundY - 45, 40, 0, -angleRad, true);
  ctx.stroke();

  // Angle text
  ctx.fillStyle = "#fdcb6e";
  ctx.font = "bold 16px Arial";
  ctx.fillText(`${angle}°`, GameState.launchX + 45, GameState.groundY - 50);
}

// ============================================
// PROJECTILE FUNCTIONS
// ============================================
function createProjectile() {
  // Remove existing projectile
  if (GameState.projectile) {
    Composite.remove(world, GameState.projectile);
  }

  const projectile = Bodies.circle(
    GameState.launchX,
    GameState.groundY - 40,
    25,
    {
      restitution: 0.3,
      friction: 0.1,
      frictionAir: 0,
      render: {
        fillStyle: "#ff6b6b",
        strokeStyle: "#ee5a5a",
        lineWidth: 4,
      },
      label: "projectile",
    },
  );

  GameState.projectile = projectile;
  Composite.add(world, projectile);

  return projectile;
}

function launchProjectile() {
  if (GameState.isSimulating) return;

  let angle, velocity;

  if (GameState.currentChallenge === "time-to-distance") {
    // For time problem, use the given velocity and user-selected angle
    angle = GameState.givenAngle || 45;
    velocity = GameState.givenVelocity;

    // If velocity not set yet, generate a problem first
    if (!velocity || velocity <= 0) {
      generateNewProblem();
      velocity = GameState.givenVelocity;
      angle = GameState.givenAngle;
    }
  } else {
    angle = parseFloat(document.getElementById("angle-input").value);
    velocity = parseFloat(document.getElementById("velocity-input").value);
  }

  // Calculate predicted range and max height for this launch
  const angleRad = (angle * Math.PI) / 180;
  const g = GameState.gravity;
  const predictedRange = (velocity * velocity * Math.sin(2 * angleRad)) / g;
  const predictedMaxHeight =
    (velocity * velocity * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);

  // Store expected/theoretical range
  GameState.expectedDistance = predictedRange;

  // Calculate scale factor to fit trajectory in canvas
  // Leave margin for cannon (100px) and right edge (80px)
  const availableWidth = GameState.canvasWidth - GameState.launchX - 80;
  const availableHeight = GameState.groundY - 80;

  // Use the maximum distance needed (either correct distance or user's expected distance)
  const maxDistanceToShow =
    GameState.maxNeededDistance > 0
      ? Math.max(predictedRange, GameState.maxNeededDistance)
      : predictedRange;

  // Calculate scale to fit both width and height
  const scaleForWidth = availableWidth / maxDistanceToShow;
  const scaleForHeight = availableHeight / predictedMaxHeight;

  // Use the smaller scale to ensure everything fits
  GameState.scaleFactor = Math.min(scaleForWidth, scaleForHeight, 15); // Max scale of 15
  GameState.scaleFactor = Math.max(GameState.scaleFactor, 1); // Min scale of 1

  console.log(
    "Predicted range:",
    predictedRange.toFixed(1),
    "m, maxToShow:",
    maxDistanceToShow.toFixed(1),
    "m, height:",
    predictedMaxHeight.toFixed(1),
    "m, scale:",
    GameState.scaleFactor.toFixed(2),
  );

  // Validate inputs
  if (isNaN(angle) || isNaN(velocity)) {
    showLearningCard("invalid-input");
    return;
  }

  if (angle < 0 || angle > 90) {
    showLearningCard("angle-range");
    return;
  }

  if (velocity < 1 || velocity > 50) {
    showLearningCard("velocity-range");
    return;
  }

  // Pre-launch tips based on user input
  checkPreLaunchTips(angle, velocity);

  // Create projectile
  const projectile = createProjectile();

  // Store launch parameters for kinematic simulation
  // Real-world velocity components (m/s)
  GameState.launchVx = velocity * Math.cos(angleRad); // horizontal velocity
  GameState.launchVy = velocity * Math.sin(angleRad); // vertical velocity (positive = up)
  GameState.simStartTime = performance.now();

  console.log(
    "Launch: angle=" +
      angle +
      "°, velocity=" +
      velocity +
      "m/s, vx=" +
      GameState.launchVx.toFixed(2) +
      " m/s, vy=" +
      GameState.launchVy.toFixed(2) +
      " m/s",
  );

  // Reset tracking
  GameState.trajectory = [];
  GameState.maxHeight = 0;
  GameState.maxDistance = 0;
  GameState.startTime = Date.now();
  GameState.isSimulating = true;
  GameState.isLaunched = true;

  // Only increment attempts for non-time-to-distance challenges
  if (GameState.currentChallenge !== "time-to-distance") {
    GameState.attempts++;
    document.getElementById("attempts-count").textContent = GameState.attempts;
    updateAccuracy();
  }

  // Update UI
  document.getElementById("launch-btn").disabled = true;

  // Show results panel
  document.getElementById("results-panel").classList.remove("hidden");

  // Start physics simulation with manual gravity
  simulateWithGravity();
}

function simulateWithGravity() {
  if (!GameState.isSimulating) return;

  const projectile = GameState.projectile;
  if (!projectile) return;

  // Calculate elapsed time in seconds (use a time multiplier for faster animation)
  const timeMultiplier = 1.5; // Speed up animation
  const elapsedMs = performance.now() - GameState.simStartTime;
  const t = (elapsedMs / 1000) * timeMultiplier; // simulation time in seconds

  const g = GameState.gravity;
  const vx = GameState.launchVx;
  const vy = GameState.launchVy;

  // Determine the flight time based on user's answer or correct physics
  let flightTime;
  let landingDistance;

  if (GameState.userAnswer > 0 && GameState.userExpectedDistance > 0) {
    // User entered a time - projectile flies for that duration
    flightTime = GameState.userAnswer;
    landingDistance = GameState.userExpectedDistance; // vx * userAnswer
  } else {
    // No user input - use correct physics
    flightTime = (2 * vy) / g;
    landingDistance = vx * flightTime;
  }

  // Create a parabolic trajectory that:
  // - Starts at (0, 0) relative to launch point
  // - Peaks at t = flightTime/2
  // - Lands at t = flightTime at distance = landingDistance

  // Normalized time (0 to 1 over the flight)
  const tNorm = Math.min(t / flightTime, 1.0);

  // X position: linear from 0 to landingDistance
  const xMeters = tNorm * landingDistance;

  // Y position: parabola peaking at tNorm = 0.5
  // y = 4 * h * tNorm * (1 - tNorm), where h is max height
  // Calculate max height based on the initial velocity and flight time
  // For the user's entered time, we scale the height proportionally
  const correctFlightTime = (2 * vy) / g;
  const correctMaxHeight = (vy * vy) / (2 * g);

  // Scale height based on flight time ratio (longer flight = higher arc)
  const heightScale = flightTime / correctFlightTime;
  const maxHeight = correctMaxHeight * heightScale;

  // Parabolic Y position
  const yMeters = 4 * maxHeight * tNorm * (1 - tNorm);

  // Convert to pixels
  const pixelsPerMeter = GameState.scaleFactor;
  const startX = GameState.launchX;
  const startY = GameState.groundY - 40; // Launch position

  const pixelX = startX + xMeters * pixelsPerMeter;
  const pixelY = startY - yMeters * pixelsPerMeter; // Subtract because canvas Y is inverted

  // Update projectile position
  Body.setPosition(projectile, { x: pixelX, y: pixelY });

  // Track trajectory
  GameState.trajectory.push({ x: pixelX, y: pixelY });

  // Update max height and distance
  if (yMeters > GameState.maxHeight) {
    GameState.maxHeight = yMeters;
  }
  GameState.maxDistance = xMeters;

  // Check if projectile has completed its flight
  if (t >= flightTime) {
    // Land at the calculated distance
    GameState.maxDistance = landingDistance;

    // Calculate pixel position for landing
    const landingPixelX = startX + landingDistance * pixelsPerMeter;
    GameState.landingX = landingPixelX;

    console.log(
      "Landed at: " +
        landingDistance.toFixed(1) +
        "m after " +
        flightTime.toFixed(2) +
        "s",
    );

    // Snap projectile to ground level
    Body.setPosition(projectile, {
      x: landingPixelX,
      y: GameState.groundY - 25,
    });
    GameState.trajectory.push({ x: landingPixelX, y: GameState.groundY - 25 });

    endSimulation();
    return;
  }

  // Safety timeout - max 20 seconds of real time
  if (elapsedMs > 20000) {
    GameState.landingX = pixelX;
    Body.setPosition(projectile, { x: pixelX, y: GameState.groundY - 25 });
    endSimulation();
    return;
  }

  // Continue simulation
  requestAnimationFrame(simulateWithGravity);
}

function endSimulation() {
  GameState.isSimulating = false;
  // Keep launch button disabled until user resets - they need to see the landed state
  // document.getElementById('launch-btn').disabled = false;

  // Show post-landing action buttons
  document.getElementById("post-landing-actions").classList.remove("hidden");

  // Calculate actual flight time
  const actualTime = (Date.now() - GameState.startTime) / 1000;

  // Update results
  document.getElementById("result-distance").textContent =
    `${GameState.maxDistance.toFixed(2)} m`;
  document.getElementById("result-height").textContent =
    `${GameState.maxHeight.toFixed(2)} m`;
  document.getElementById("result-time").textContent =
    `${actualTime.toFixed(2)} s`;

  // For time-to-distance challenge, check the answer after landing
  if (
    GameState.currentChallenge === "time-to-distance" &&
    GameState.pendingAnswerCheck
  ) {
    GameState.pendingAnswerCheck = false;
    GameState.attempts++;
    document.getElementById("attempts-count").textContent = GameState.attempts;

    const challenge = GameState.challenges["time-to-distance"];
    const isCorrect = challenge.successCondition(
      GameState.userAnswer,
      GameState.targetTime,
    );

    if (isCorrect) {
      GameState.solved++;
      document.getElementById("solved-count").textContent = GameState.solved;
    }

    updateAccuracy();

    // Show result after a longer delay so user can see the landed projectile and markers
    setTimeout(() => {
      showTimeResultModal(
        isCorrect,
        GameState.userAnswer,
        GameState.targetTime,
        actualTime,
      );
    }, 1500);
  } else if (GameState.currentChallenge !== "time-to-distance") {
    // For other challenges
    const angle = parseFloat(document.getElementById("angle-input").value);
    const velocity = parseFloat(
      document.getElementById("velocity-input").value,
    );
    checkChallengeCompletion(angle, velocity);
  }
}

function resetSimulation() {
  // Stop simulation
  GameState.isSimulating = false;
  GameState.isLaunched = false;
  GameState.pendingAnswerCheck = false;

  // Remove projectile
  if (GameState.projectile) {
    Composite.remove(world, GameState.projectile);
    GameState.projectile = null;
  }

  // Reset tracking
  GameState.trajectory = [];
  GameState.maxHeight = 0;
  GameState.maxDistance = 0;
  GameState.landingX = 0;
  GameState.expectedDistance = 0;
  GameState.userExpectedDistance = 0;
  GameState.maxNeededDistance = 0;

  // Reset UI
  document.getElementById("launch-btn").disabled = false;
  document.getElementById("results-panel").classList.add("hidden");
  document.getElementById("post-landing-actions").classList.add("hidden");
  document.getElementById("time-display").textContent = "0.00 s";
  document.getElementById("distance-display").textContent = "0.00 m";
  document.getElementById("height-display").textContent = "0.00 m";
  document.getElementById("speed-display").textContent = "0.00 m/s";
  document.getElementById("result-distance").textContent = "--";
  document.getElementById("result-height").textContent = "--";
  document.getElementById("result-time").textContent = "--";
}

// ============================================
// COLLISION EVENTS
// ============================================
function setupCollisionEvents() {
  Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const labels = [pair.bodyA.label, pair.bodyB.label];

      if (labels.includes("projectile") && labels.includes("ground")) {
        // Projectile hit ground
        if (GameState.isSimulating) {
          // Small delay to show final position
          setTimeout(() => {
            if (GameState.isSimulating) {
              endSimulation();
            }
          }, 100);
        }
      }
    });
  });
}

// ============================================
// LIVE DATA UPDATES
// ============================================
function updateLiveData() {
  if (!GameState.isSimulating || !GameState.projectile) return;

  const projectile = GameState.projectile;

  // Time
  const elapsed = (Date.now() - GameState.startTime) / 1000;
  document.getElementById("time-display").textContent =
    `${elapsed.toFixed(2)} s`;

  // Distance
  const distance =
    (projectile.position.x - GameState.launchX) / GameState.scaleFactor;
  document.getElementById("distance-display").textContent =
    `${Math.max(0, distance).toFixed(2)} m`;

  // Height
  const height =
    (GameState.groundY - 40 - projectile.position.y) / GameState.scaleFactor;
  document.getElementById("height-display").textContent =
    `${Math.max(0, height).toFixed(2)} m`;

  // Speed
  const speed = Math.sqrt(
    ((projectile.velocity.x * 60) / GameState.scaleFactor) ** 2 +
      ((projectile.velocity.y * 60) / GameState.scaleFactor) ** 2,
  );
  document.getElementById("speed-display").textContent =
    `${speed.toFixed(2)} m/s`;
}

// ============================================
// CHALLENGE SYSTEM
// ============================================
function switchChallenge(challengeType) {
  GameState.currentChallenge = challengeType;
  const challenge = GameState.challenges[challengeType];

  // Generate new problem if it's the time challenge
  if (challengeType === "time-to-distance") {
    generateNewProblem();
  } else {
    // Update UI for other challenges
    document.getElementById("challenge-description").textContent =
      challenge.description;
    document.getElementById("target-value").textContent = challenge.targetInfo;

    // Show normal input controls
    document.querySelector(".input-section").style.display = "block";
    const answerSection = document.getElementById("answer-section");
    if (answerSection) answerSection.style.display = "none";
  }

  // Update tips
  updateCurrentTip();

  // Reset simulation
  resetSimulation();

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.challenge === challengeType);
  });
}

function generateNewProblem() {
  // Generate random velocity between 20 and 35 m/s
  const velocity = Math.floor(Math.random() * 16) + 20;
  // Generate random angle between 30 and 60 degrees
  const angle = Math.floor(Math.random() * 31) + 30;

  // Calculate the correct time of flight
  const angleRad = (angle * Math.PI) / 180;
  const time = (2 * velocity * Math.sin(angleRad)) / 9.8;

  GameState.givenVelocity = velocity;
  GameState.givenAngle = angle;
  GameState.targetTime = parseFloat(time.toFixed(2));

  // Update problem description
  const description = `A projectile is launched at ${velocity} m/s. Use the slider to set the launch angle, then calculate the time of flight.`;
  document.getElementById("challenge-description").textContent = description;
  document.getElementById("target-value").textContent = `v₀ = ${velocity} m/s`;

  // Hide normal input controls and show answer input
  document.querySelector(".input-section").style.display = "none";

  let answerSection = document.getElementById("answer-section");
  if (!answerSection) {
    answerSection = document.createElement("div");
    answerSection.id = "answer-section";
    answerSection.className = "input-section";
    answerSection.innerHTML = `
            <h3>⚙️ Set Launch Angle</h3>
            <div class="input-group">
                <label for="problem-angle-slider">
                    Launch Angle (θ): <span id="angle-display-value">${angle}</span>°
                </label>
                <input type="range" id="problem-angle-slider" min="10" max="80" value="${angle}" class="angle-slider">
            </div>
            <hr style="border-color: #333; margin: 15px 0;">
            <h3>✏️ Your Answer</h3>
            <div class="input-group">
                <label for="time-answer">Time of Flight (T)</label>
                <div class="input-with-unit">
                    <input type="number" id="time-answer" min="0" max="20" value="" step="0.01" placeholder="Enter time...">
                    <span class="unit">seconds</span>
                </div>
            </div>
            <div class="problem-info">
                <p><strong>Given:</strong></p>
                <p>• Initial velocity (v₀) = <span id="given-velocity">${velocity}</span> m/s</p>
                <p>• Launch angle (θ) = <span id="given-angle">${angle}</span>°</p>
                <p>• Gravity (g) = 9.8 m/s²</p>
                <p><strong>Formula:</strong> T = (2 × v₀ × sin(θ)) / g</p>
            </div>
            <button id="submit-answer-btn" class="btn btn-launch">📝 Submit Answer</button>
            <button id="see-animation-btn" class="btn btn-reset" style="margin-top: 10px;">👁️ See Animation First</button>
        `;
    document
      .querySelector(".control-panel")
      .insertBefore(answerSection, document.querySelector(".action-buttons"));

    // Add event listeners
    document
      .getElementById("submit-answer-btn")
      .addEventListener("click", checkTimeAnswer);
    document
      .getElementById("see-animation-btn")
      .addEventListener("click", () => {
        launchProjectile();
      });
  } else {
    answerSection.style.display = "block";
    document.getElementById("given-velocity").textContent = velocity;
    document.getElementById("given-angle").textContent = angle;
    document.getElementById("problem-angle-slider").value = angle;
    document.getElementById("angle-display-value").textContent = angle;
    document.getElementById("time-answer").value = "";
  }

  // Add slider event listener to update angle dynamically
  const slider = document.getElementById("problem-angle-slider");
  slider.oninput = function () {
    const newAngle = parseInt(this.value);
    GameState.givenAngle = newAngle;
    document.getElementById("angle-display-value").textContent = newAngle;
    document.getElementById("given-angle").textContent = newAngle;

    // Recalculate correct time for new angle
    const newAngleRad = (newAngle * Math.PI) / 180;
    const newTime = (2 * GameState.givenVelocity * Math.sin(newAngleRad)) / 9.8;
    GameState.targetTime = parseFloat(newTime.toFixed(2));
  };

  // Hide the normal launch button for this challenge
  document.querySelector(".action-buttons").style.display = "none";
}

function checkTimeAnswer() {
  const userAnswer = parseFloat(document.getElementById("time-answer").value);

  if (isNaN(userAnswer) || userAnswer <= 0) {
    showLearningCard("invalid-input");
    return;
  }

  // Store the answer - we'll check it after the projectile lands
  GameState.userAnswer = userAnswer;
  GameState.pendingAnswerCheck = true;

  // Calculate the distance the projectile would cover in the user's entered time
  // Distance = vx * t = v₀ * cos(θ) * t
  const angleRad = (GameState.givenAngle * Math.PI) / 180;
  const vx = GameState.givenVelocity * Math.cos(angleRad);
  GameState.userExpectedDistance = vx * userAnswer;

  // Also pre-calculate the correct distance for scale factor calculation
  const g = GameState.gravity;
  const vy = GameState.givenVelocity * Math.sin(angleRad);
  const correctTime = (2 * vy) / g;
  const correctDistance = vx * correctTime;

  // Store the max distance needed (whichever is larger) for proper scaling
  GameState.maxNeededDistance = Math.max(
    GameState.userExpectedDistance,
    correctDistance,
  );

  console.log("User entered time:", userAnswer, "s");
  console.log("Correct time:", correctTime.toFixed(2), "s");
  console.log(
    "User expected distance:",
    GameState.userExpectedDistance.toFixed(1),
    "m",
  );
  console.log("Correct distance:", correctDistance.toFixed(1), "m");
  console.log(
    "Difference:",
    (correctDistance - GameState.userExpectedDistance).toFixed(1),
    "m",
  );

  // Launch the projectile to show the animation first
  launchProjectile();
}

function showTimeResultModal(isCorrect, userAnswer, correctAnswer, actualTime) {
  const modal = document.getElementById("result-modal");
  const angle = GameState.givenAngle;
  const velocity = GameState.givenVelocity;
  const angleRad = (angle * Math.PI) / 180;
  const sinValue = Math.sin(angleRad).toFixed(3);
  const g = GameState.gravity;

  // Calculate the correct/theoretical range using the formula: R = (v₀² × sin(2θ)) / g
  const correctRange = (velocity * velocity * Math.sin(2 * angleRad)) / g;

  // Calculate what distance would be covered in the user's entered time
  // Distance at time t: x = vx * t = v₀ * cos(θ) * t
  const vx = velocity * Math.cos(angleRad);
  const userTimeDistance = vx * userAnswer;

  // Actual distance covered in the simulation
  const actualDistance = GameState.maxDistance;

  document.getElementById("modal-icon").textContent = isCorrect ? "🎉" : "🔄";
  document.getElementById("modal-title").textContent = isCorrect
    ? "Correct!"
    : "Not Quite!";
  document.getElementById("modal-title").className = isCorrect
    ? "success"
    : "warning";

  let message = "";
  if (isCorrect) {
    message = `Excellent! You correctly calculated the time of flight!\n\nUsing T = (2 × v₀ × sin(θ)) / g\nT = (2 × ${velocity} × sin(${angle}°)) / 9.8\nT = (2 × ${velocity} × ${sinValue}) / 9.8\nT = ${correctAnswer} seconds`;
  } else {
    message = `Your answer: ${userAnswer} s\nCorrect answer: ${correctAnswer} s\n\nRemember: T = (2 × v₀ × sin(θ)) / g\nT = (2 × ${velocity} × sin(${angle}°)) / 9.8\nT = (2 × ${velocity} × ${sinValue}) / 9.8\nT ≈ ${correctAnswer} seconds`;
  }

  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal-message").style.whiteSpace = "pre-line";

  // Calculate difference for color coding
  const distanceDiff = Math.abs(userTimeDistance - correctRange);
  const isDistanceClose = distanceDiff < 5; // Within 5 meters

  const statsHTML = `
        <p><strong>Problem:</strong> v₀ = ${velocity} m/s, θ = ${angle}°</p>
        <p><strong>Your Answer:</strong> ${userAnswer} s</p>
        <p><strong>Correct Answer:</strong> ${correctAnswer} s</p>
        <hr style="border-color: #444; margin: 10px 0;">
        <p><strong>📏 Distance Analysis:</strong></p>
        <p style="color: #4ade80;">✓ Correct Range (at T=${correctAnswer}s): <strong>${correctRange.toFixed(2)} m</strong></p>
        <p style="color: ${isCorrect ? "#4ade80" : "#f87171"};">${isCorrect ? "✓" : "✗"} Distance at your time (${userAnswer}s): <strong>${userTimeDistance.toFixed(2)} m</strong></p>
        <p style="color: #60a5fa;">📍 Actual Distance Covered: <strong>${actualDistance.toFixed(2)} m</strong></p>
        ${!isCorrect ? `<p style="color: #fbbf24; margin-top: 8px;">⚠️ Difference: ${Math.abs(correctRange - userTimeDistance).toFixed(2)} m ${userTimeDistance < correctRange ? "(too short - less time)" : "(too far - more time)"}</p>` : ""}
    `;
  document.getElementById("modal-stats").innerHTML = statsHTML;

  document.getElementById("next-btn").style.display = "block";
  document.getElementById("next-btn").textContent = "New Problem";

  modal.classList.remove("hidden");
}

function checkChallengeCompletion(angle, velocity) {
  const challenge = GameState.challenges[GameState.currentChallenge];
  const isSuccess = challenge.successCondition(angle, velocity, {
    maxHeight: GameState.maxHeight,
    maxDistance: GameState.maxDistance,
  });

  if (isSuccess) {
    GameState.solved++;
    document.getElementById("solved-count").textContent = GameState.solved;
    updateAccuracy();
    showResultModal(true, angle, velocity);
  } else {
    showResultModal(false, angle, velocity);
    showFeedbackTip(angle, velocity);
  }
}

function showResultModal(isSuccess, angle, velocity) {
  const modal = document.getElementById("result-modal");
  const challenge = GameState.challenges[GameState.currentChallenge];

  document.getElementById("modal-icon").textContent = isSuccess ? "🎉" : "🔄";
  document.getElementById("modal-title").textContent = isSuccess
    ? "Excellent Work!"
    : "Try Again!";
  document.getElementById("modal-title").className = isSuccess
    ? "success"
    : "warning";

  let message = "";
  if (isSuccess) {
    if (GameState.currentChallenge === "max-distance") {
      message = `Perfect! You discovered that 45° gives maximum range! At this angle, the horizontal and vertical components of velocity are equal, maximizing the product that determines range.`;
    } else {
      message = `Excellent! You found that 90° (straight up) gives maximum height! When all the initial velocity is vertical, the projectile reaches its highest point.`;
    }
  } else {
    if (GameState.currentChallenge === "max-distance") {
      if (angle < 40) {
        message = `Your angle of ${angle}° is too low. The projectile doesn't stay in the air long enough. Try increasing the angle toward 45°.`;
      } else if (angle > 50) {
        message = `Your angle of ${angle}° is too high. The projectile goes up more than forward. Try decreasing the angle toward 45°.`;
      } else {
        message = `Close! Your angle is good, but make sure your velocity is at least 20 m/s to see the effect clearly.`;
      }
    } else {
      if (angle < 85) {
        message = `Your angle of ${angle}° still has horizontal velocity. To maximize height, try aiming more vertically - closer to 90°.`;
      } else {
        message = `Very close! Make sure your velocity is at least 15 m/s to see a significant height.`;
      }
    }
  }

  document.getElementById("modal-message").textContent = message;

  // Stats
  const statsHTML = `
        <p><strong>Your Input:</strong></p>
        <p>Angle: ${angle}° | Velocity: ${velocity} m/s</p>
        <p><strong>Results:</strong></p>
        <p>Distance: ${GameState.maxDistance.toFixed(2)} m | Height: ${GameState.maxHeight.toFixed(2)} m</p>
        ${!isSuccess ? `<p><strong>Optimal for this challenge:</strong> ${challenge.optimalAngle}°</p>` : ""}
    `;
  document.getElementById("modal-stats").innerHTML = statsHTML;

  // Show/hide next button
  document.getElementById("next-btn").style.display = isSuccess
    ? "block"
    : "none";

  modal.classList.remove("hidden");
}

function hideResultModal() {
  document.getElementById("result-modal").classList.add("hidden");
}

// ============================================
// LEARNING CARDS SYSTEM
// ============================================
const learningCards = {
  "invalid-input": {
    icon: "⚠️",
    title: "Invalid Input",
    text: "Please enter valid numbers for angle and velocity.",
    formula: "",
    tip: "Angle should be 0-90° and velocity should be 1-50 m/s",
  },
  "angle-range": {
    icon: "📐",
    title: "Angle Out of Range",
    text: "The launch angle must be between 0° and 90°. Angles below 0° would shoot into the ground, and angles above 90° would shoot backwards!",
    formula: "0° ≤ θ ≤ 90°",
    tip: "45° is a special angle for projectile motion - can you figure out why?",
  },
  "velocity-range": {
    icon: "💨",
    title: "Velocity Out of Range",
    text: "Keep the velocity between 1 and 50 m/s for this simulation. Real projectiles can go faster, but we need to keep things visible!",
    formula: "1 m/s ≤ v₀ ≤ 50 m/s",
    tip: "Higher velocity means greater range AND height!",
  },
  "angle-hint": {
    icon: "📐",
    title: "Understanding Launch Angle",
    text: "The launch angle (θ) determines how the initial velocity is split between horizontal and vertical components.",
    formula: "vₓ = v₀ × cos(θ)\nvᵧ = v₀ × sin(θ)",
    tip: "Low angles (< 45°) favor distance over height. High angles (> 45°) favor height over distance.",
  },
  "velocity-hint": {
    icon: "💨",
    title: "Understanding Initial Velocity",
    text: "The initial velocity (v₀) is how fast the projectile leaves the launcher. It affects both range and height quadratically!",
    formula: "R ∝ v₀² (Range)\nH ∝ v₀² (Max Height)",
    tip: "Doubling the velocity quadruples both the range and maximum height!",
  },
  "low-angle-feedback": {
    icon: "📉",
    title: "Angle Too Low",
    text: "Your launch angle is quite low. While low angles give high horizontal velocity, the projectile doesn't stay in the air long enough.",
    formula: "Time of flight: T = (2 × v₀ × sin(θ)) / g",
    tip: "With a very low angle, sin(θ) is small, so the flight time is short!",
  },
  "high-angle-feedback": {
    icon: "📈",
    title: "Angle Too High",
    text: "Your launch angle is quite high. While this gives great height, the horizontal velocity component is reduced.",
    formula: "Horizontal velocity: vₓ = v₀ × cos(θ)",
    tip: "At very high angles, cos(θ) is small, so horizontal distance is limited!",
  },
  "optimal-distance": {
    icon: "🎯",
    title: "Maximum Range Achieved!",
    text: "At 45°, the range formula R = (v₀² × sin(2θ))/g is maximized because sin(2×45°) = sin(90°) = 1!",
    formula: "R_max = v₀² / g (when θ = 45°)",
    tip: "This is why artillery and sports often use 45° for maximum distance!",
  },
  "optimal-height": {
    icon: "🏔️",
    title: "Maximum Height Achieved!",
    text: "At 90°, all initial velocity is directed upward, giving maximum height!",
    formula: "H_max = v₀² / (2g) (when θ = 90°)",
    tip: "At 90°, there's no horizontal motion - the projectile goes straight up and down!",
  },
};

function showLearningCard(cardType) {
  const card = learningCards[cardType];
  if (!card) return;

  document.getElementById("card-icon").textContent = card.icon;
  document.getElementById("card-title").textContent = card.title;
  document.getElementById("card-text").textContent = card.text;
  document.getElementById("card-formula").textContent = card.formula;
  document.getElementById("card-tip").textContent = card.tip
    ? `💡 ${card.tip}`
    : "";
  document.getElementById("card-tip").style.display = card.tip
    ? "block"
    : "none";
  document.getElementById("card-formula").style.display = card.formula
    ? "block"
    : "none";

  document.getElementById("learning-card").classList.remove("hidden");
}

function hideLearningCard() {
  document.getElementById("learning-card").classList.add("hidden");
}

function checkPreLaunchTips(angle, velocity) {
  // Give contextual tips before launch
  if (GameState.currentChallenge === "time-to-distance") {
    // For time problem, no pre-launch tips needed
    updateCurrentTip(
      "Watch the projectile fly! The time of flight depends on velocity and angle.",
    );
  } else if (GameState.currentChallenge === "max-height") {
    if (angle < 70) {
      updateCurrentTip(
        "⚠️ For maximum height, you want most of the velocity going upward. Try a higher angle!",
      );
    } else if (angle >= 85) {
      updateCurrentTip("👍 Excellent! Near-vertical angles maximize height.");
    }
  }
}

function showFeedbackTip(angle, velocity) {
  // Show specific feedback based on what went wrong
  // No feedback tips for time-to-distance challenge
}

function updateCurrentTip(tipText = null) {
  const tipElement = document.getElementById("current-tip").querySelector("p");
  if (tipText) {
    tipElement.textContent = tipText;
  } else {
    // Default tips based on challenge
    const challenge = GameState.challenges[GameState.currentChallenge];
    tipElement.textContent = challenge.hint;
  }
}

// ============================================
// UI HELPERS
// ============================================
function updateAccuracy() {
  const accuracy =
    GameState.attempts > 0
      ? Math.round((GameState.solved / GameState.attempts) * 100)
      : 0;
  document.getElementById("accuracy-display").textContent = `${accuracy}%`;
}

function syncSliderAndInput(sliderId, inputId) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);

  slider.addEventListener("input", () => {
    input.value = slider.value;
  });

  input.addEventListener("input", () => {
    slider.value = input.value;
  });
}

// ============================================
// INITIALIZATION & EVENT LISTENERS
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Matter.js
  initMatterJS();

  // Sync sliders with inputs
  syncSliderAndInput("angle-slider", "angle-input");
  syncSliderAndInput("velocity-slider", "velocity-input");

  // Launch button
  document
    .getElementById("launch-btn")
    .addEventListener("click", launchProjectile);

  // Reset button
  document
    .getElementById("reset-btn")
    .addEventListener("click", resetSimulation);

  // Challenge tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchChallenge(btn.dataset.challenge);
    });
  });

  // Learning card close
  document
    .getElementById("close-card")
    .addEventListener("click", hideLearningCard);
  document
    .getElementById("understand-btn")
    .addEventListener("click", hideLearningCard);

  // Result modal close button (just closes modal, keeps state)
  document.getElementById("close-modal-btn").addEventListener("click", () => {
    hideResultModal();
  });

  // Result modal buttons
  document.getElementById("retry-btn").addEventListener("click", () => {
    hideResultModal();
    resetSimulation();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    hideResultModal();
    if (GameState.currentChallenge === "time-to-distance") {
      // Generate a new problem
      generateNewProblem();
      resetSimulation();
    } else {
      // Switch to next challenge
      const nextChallenge =
        GameState.currentChallenge === "time-to-distance"
          ? "max-height"
          : "time-to-distance";
      switchChallenge(nextChallenge);
    }
  });

  // Post-landing action buttons (same functionality as modal buttons)
  document.getElementById("post-retry-btn").addEventListener("click", () => {
    hideResultModal();
    resetSimulation();
  });

  document.getElementById("post-next-btn").addEventListener("click", () => {
    hideResultModal();
    if (GameState.currentChallenge === "time-to-distance") {
      generateNewProblem();
      resetSimulation();
    } else {
      const nextChallenge =
        GameState.currentChallenge === "time-to-distance"
          ? "max-height"
          : "time-to-distance";
      switchChallenge(nextChallenge);
    }
  });

  // Hint icons
  document.querySelectorAll(".hint-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const hintType = icon.dataset.hint;
      if (hintType === "angle") {
        showLearningCard("angle-hint");
      } else if (hintType === "velocity") {
        showLearningCard("velocity-hint");
      }
    });
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (
      e.code === "Space" &&
      !GameState.isSimulating &&
      !GameState.isLaunched
    ) {
      e.preventDefault();
      launchProjectile();
    }
    if (e.code === "KeyR") {
      // Only reset if modal is visible (user has seen the result)
      const modalVisible = !document
        .getElementById("result-modal")
        .classList.contains("hidden");
      if (modalVisible) {
        hideResultModal();
        resetSimulation();
      }
    }
    if (e.code === "Escape") {
      hideLearningCard();
      // Don't reset on Escape - just hide modal but keep state
      const modalVisible = !document
        .getElementById("result-modal")
        .classList.contains("hidden");
      if (modalVisible) {
        hideResultModal();
      }
    }
  });

  // Initialize first challenge
  switchChallenge("time-to-distance");

  // Handle window resize
  window.addEventListener("resize", () => {
    // Resize canvas if needed
    if (render && render.canvas) {
      const container = document.getElementById("canvas-container");
      render.canvas.width = container.clientWidth;
      render.options.width = container.clientWidth;
    }
  });
});

// ============================================
// THEORETICAL CALCULATIONS (for verification)
// ============================================
function calculateTheoretical(angle, velocity) {
  const g = GameState.gravity;
  const angleRad = (angle * Math.PI) / 180;

  // Maximum height: H = (v₀² × sin²θ) / (2g)
  const maxHeight =
    (velocity * velocity * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);

  // Range: R = (v₀² × sin(2θ)) / g
  const range = (velocity * velocity * Math.sin(2 * angleRad)) / g;

  // Time of flight: T = (2 × v₀ × sinθ) / g
  const timeOfFlight = (2 * velocity * Math.sin(angleRad)) / g;

  return {
    maxHeight: maxHeight,
    range: range,
    timeOfFlight: timeOfFlight,
  };
}
