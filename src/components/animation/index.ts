/**
 * Animation Drawing Utilities
 * Handles all canvas drawing operations for the projectile simulation
 */

interface Point {
  x: number;
  y: number;
}

interface GameState {
  userExpectedDistance: number;
  isLaunched: boolean;
  userAnswer: number;
  expectedDistance: number;
  isSimulating: boolean;
  maxDistance: number;
}

export const drawTrajectory = (
  ctx: CanvasRenderingContext2D,
  trajectory: Point[],
  groundY: number,
  launchX: number,
  scaleFactor: number,
  gameState: GameState,
) => {
  if (trajectory.length < 2) return;

  // Draw glowing trajectory path
  ctx.save();
  ctx.shadowColor = "rgba(253, 121, 168, 0.8)";
  ctx.shadowBlur = 10;

  // Draw main trajectory line with gradient
  ctx.beginPath();
  ctx.strokeStyle = "rgba(253, 121, 168, 0.8)";
  ctx.lineWidth = 3;

  ctx.moveTo(trajectory[0].x, trajectory[0].y);
  for (let i = 1; i < trajectory.length; i++) {
    ctx.lineTo(trajectory[i].x, trajectory[i].y);
  }
  ctx.stroke();
  ctx.restore();

  // Draw animated trajectory points with varying sizes
  const time = Date.now() / 200;
  trajectory.forEach((point: Point, index: number) => {
    if (index % 4 === 0) {
      const pulse = Math.sin(time + index * 0.3) * 2 + 6;
      const alpha = 0.5 + Math.sin(time + index * 0.2) * 0.3;

      ctx.beginPath();
      ctx.arc(point.x, point.y, pulse, 0, Math.PI * 2);

      const hue = 40 + (index / trajectory.length) * 20;
      ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(point.x, point.y, pulse * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha + 0.2})`;
      ctx.fill();
    }
  });

  // Draw user's expected landing marker (ORANGE)
  if (gameState.userExpectedDistance > 0 && gameState.isLaunched) {
    const userExpectedX =
      launchX + gameState.userExpectedDistance * scaleFactor;

    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.shadowColor = "rgba(251, 146, 60, 0.6)";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(userExpectedX, groundY - 5, 22, 0, Math.PI * 2);
    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(userExpectedX, groundY - 27);
    ctx.lineTo(userExpectedX, groundY - 80);
    ctx.strokeStyle = "rgba(251, 146, 60, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    ctx.save();
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";

    const userText = `Your guess (T=${gameState.userAnswer}s): ${gameState.userExpectedDistance.toFixed(1)} m`;
    const userTextWidth = ctx.measureText(userText).width;

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      userExpectedX - userTextWidth / 2 - 8,
      groundY - 105,
      userTextWidth + 16,
      22,
    );

    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      userExpectedX - userTextWidth / 2 - 8,
      groundY - 105,
      userTextWidth + 16,
      22,
    );

    ctx.fillStyle = "#fb923c";
    ctx.fillText(userText, userExpectedX, groundY - 89);
    ctx.restore();
  }

  // Draw actual/correct landing marker (GREEN)
  if (gameState.expectedDistance > 0 && gameState.isLaunched) {
    const correctX = launchX + gameState.expectedDistance * scaleFactor;

    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.shadowColor = "rgba(46, 204, 113, 0.6)";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(correctX, groundY - 5, 25, 0, Math.PI * 2);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(correctX, groundY - 30);
    ctx.lineTo(correctX, groundY - 130);
    ctx.strokeStyle = "rgba(46, 204, 113, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    ctx.save();
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";

    const correctText = `Correct landing: ${gameState.expectedDistance.toFixed(1)} m`;
    const textWidth = ctx.measureText(correctText).width;

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      correctX - textWidth / 2 - 8,
      groundY - 155,
      textWidth + 16,
      22,
    );

    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      correctX - textWidth / 2 - 8,
      groundY - 155,
      textWidth + 16,
      22,
    );

    ctx.fillStyle = "#2ecc71";
    ctx.fillText(correctText, correctX, groundY - 139);
    ctx.restore();
  }

  // Draw projectile final position marker after landing
  if (
    !gameState.isSimulating &&
    trajectory.length > 0 &&
    gameState.maxDistance > 0
  ) {
    const actualLandingX = launchX + gameState.maxDistance * scaleFactor;

    ctx.save();
    ctx.shadowColor = "rgba(46, 204, 113, 0.8)";
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.arc(actualLandingX, groundY - 5, 20, 0, Math.PI * 2);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "rgba(46, 204, 113, 0.3)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(actualLandingX - 10, groundY - 15);
    ctx.lineTo(actualLandingX + 10, groundY + 5);
    ctx.moveTo(actualLandingX + 10, groundY - 15);
    ctx.lineTo(actualLandingX - 10, groundY + 5);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    const landedText = `Landed: ${gameState.maxDistance.toFixed(1)} m`;

    const textWidth = ctx.measureText(landedText).width;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      actualLandingX - textWidth / 2 - 10,
      groundY + 15,
      textWidth + 20,
      26,
    );

    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      actualLandingX - textWidth / 2 - 10,
      groundY + 15,
      textWidth + 20,
      26,
    );

    ctx.fillStyle = "#2ecc71";
    ctx.fillText(landedText, actualLandingX, groundY + 33);
    ctx.restore();

    // Draw difference indicator
    if (gameState.userExpectedDistance > 0) {
      const userExpectedX =
        launchX + gameState.userExpectedDistance * scaleFactor;
      const difference = gameState.maxDistance - gameState.userExpectedDistance;
      const absDifference = Math.abs(difference);

      if (absDifference > 0.5) {
        ctx.save();

        const minX = Math.min(userExpectedX, actualLandingX);
        const maxX = Math.max(userExpectedX, actualLandingX);
        const lineY = groundY + 55;
        const diffColor = "#f87171";

        ctx.strokeStyle = diffColor;
        ctx.lineWidth = 3;
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.moveTo(minX, lineY - 10);
        ctx.lineTo(minX, lineY + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(minX, lineY);
        ctx.lineTo(maxX, lineY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(maxX, lineY - 10);
        ctx.lineTo(maxX, lineY + 10);
        ctx.stroke();

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

        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";

        const diffText =
          difference > 0
            ? `Δ ${absDifference.toFixed(1)} m (your guess was short)`
            : `Δ ${absDifference.toFixed(1)} m (your guess was far)`;
        const diffTextWidth = ctx.measureText(diffText).width;

        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(
          midX - diffTextWidth / 2 - 12,
          lineY + 18,
          diffTextWidth + 24,
          30,
        );

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

        ctx.fillStyle = diffColor;
        ctx.fillText(diffText, midX, lineY + 38);

        ctx.restore();
      }
    }
  }
};

interface Projectile {
  position: Point;
  velocity: Point;
}

export const drawVelocityVector = (
  ctx: CanvasRenderingContext2D,
  projectile: Projectile | null,
  isSimulating: boolean,
) => {
  if (!projectile || !isSimulating) return;

  const pos = projectile.position;
  const vel = projectile.velocity;

  const scale = 8;
  const endX = pos.x + vel.x * scale;
  const endY = pos.y + vel.y * scale;

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

  ctx.beginPath();
  ctx.strokeStyle = "rgba(231, 76, 60, 0.7)";
  ctx.lineWidth = 2;
  ctx.setLineDash([3, 3]);
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(pos.x + vel.x * scale, pos.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "rgba(52, 152, 219, 0.7)";
  ctx.moveTo(pos.x + vel.x * scale, pos.y);
  ctx.lineTo(pos.x + vel.x * scale, pos.y + vel.y * scale);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawMeasurements = (
  ctx: CanvasRenderingContext2D,
  gameState: any,
  renderWidth: number,
  gravity: number,
) => {
  const {
    launchX,
    groundY,
    scaleFactor,
    maxHeight,
    maxDistance,
    givenAngle,
    isSimulating,
  } = gameState;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;

  const gridSpacingMeters = 10;

  // Vertical grid lines
  for (let meters = 0; meters <= 200; meters += gridSpacingMeters) {
    const x = launchX + meters * scaleFactor;
    if (x > renderWidth) break;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, groundY);
    ctx.stroke();

    if (meters >= 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "11px Arial";
      ctx.fillText(`${meters}m`, x - 12, groundY + 18);
    }
  }

  // Horizontal grid lines
  for (let meters = 0; meters <= 100; meters += gridSpacingMeters) {
    const y = groundY - meters * scaleFactor;
    if (y < 20) break;

    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(renderWidth, y);
    ctx.stroke();

    if (meters > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "11px Arial";
      ctx.fillText(`${meters}m`, 10, y + 4);
    }
  }

  // Draw max height indicator
  if (maxHeight > 0) {
    const maxHeightY = groundY - maxHeight * scaleFactor;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(52, 152, 219, 0.8)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(launchX, maxHeightY);
    ctx.lineTo(launchX + maxDistance * scaleFactor, maxHeightY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#3498db";
    ctx.font = "bold 12px Arial";
    ctx.fillText(
      `Max H: ${maxHeight.toFixed(1)}m`,
      launchX + 10,
      maxHeightY - 5,
    );
  }

  // Draw max distance indicator
  if (maxDistance > 0 && !isSimulating) {
    const maxDistX = launchX + maxDistance * scaleFactor;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(231, 76, 60, 0.8)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(maxDistX, groundY);
    ctx.lineTo(maxDistX, groundY - 50);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#e74c3c";
    ctx.font = "bold 12px Arial";
    ctx.fillText(`R: ${maxDistance.toFixed(1)}m`, maxDistX - 30, groundY - 55);
  }

  // Draw angle indicator at cannon
  let angle = givenAngle || 45;
  const angleRad = (angle * Math.PI) / 180;
  const indicatorLength = 80;

  ctx.beginPath();
  ctx.strokeStyle = "#fdcb6e";
  ctx.lineWidth = 4;
  ctx.moveTo(launchX, groundY - 45);
  ctx.lineTo(
    launchX + indicatorLength * Math.cos(-angleRad),
    groundY - 45 + indicatorLength * Math.sin(-angleRad),
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "rgba(253, 203, 110, 0.5)";
  ctx.lineWidth = 2;
  ctx.arc(launchX, groundY - 45, 40, 0, -angleRad, true);
  ctx.stroke();

  ctx.fillStyle = "#fdcb6e";
  ctx.font = "bold 16px Arial";
  ctx.fillText(`${angle}°`, launchX + 45, groundY - 50);
};
