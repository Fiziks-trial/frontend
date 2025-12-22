'use client';

import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import styles from './projectile.module.css';
import { LearningCard } from '@/components/modals/LearningCard';
import { ResultModal } from '@/components/modals/ResultModal';
import { CHALLENGES, LEARNING_CARDS } from '@/utils/types';
import { calculateTheoretical, decomposeVelocity } from '@/utils/physics';
import { drawTrajectory, drawVelocityVector, drawMeasurements } from '@/components/animation';

declare const Matter: any;

interface GameStateType {
    currentChallenge: 'time-to-distance' | 'max-height';
    isLaunched: boolean;
    isSimulating: boolean;
    angle: number;
    velocity: number;
    maxDistance: number;
    maxHeight: number;
    attempts: number;
    solved: number;
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
    const [gameState, setGameState] = useState<GameStateType>({
        currentChallenge: 'time-to-distance',
        isLaunched: false,
        isSimulating: false,
        angle: 45,
        velocity: 25,
        maxDistance: 0,
        maxHeight: 0,
        attempts: 0,
        solved: 0,
    });

    const [uiState, setUiState] = useState<UIStateType>({
        showLearningCard: false,
        cardType: 'angle-hint',
        showResultModal: false,
        resultIcon: '🎉',
        resultTitle: 'Result',
        resultMessage: '',
    });

    const matterRef = useRef<any>(null);
    const trajectoryRef = useRef<Array<{ x: number; y: number }>>([]);

    useEffect(() => {
        initializeMatterJS();
        return () => {
            if (matterRef.current) {
                Matter.Render.stop(matterRef.current.render);
                Matter.Runner.stop(matterRef.current.runner);
            }
        };
    }, []);

    const initializeMatterJS = () => {
        if (!canvasRef.current) return;

        const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

        const container = canvasRef.current;
        const width = container.clientWidth || 900;
        const height = 500;

        const engine = Engine.create({ gravity: { x: 0, y: 0 } });
        const world = engine.world;

        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: '#1a1a2e',
                pixelRatio: window.devicePixelRatio,
            },
        });

        // Create ground
        const ground = Bodies.rectangle(width, 450, width * 4, 100, {
            isStatic: true,
            render: { fillStyle: '#2d5a27' },
            label: 'ground',
        } as any);

        Composite.add(world, [ground]);

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        matterRef.current = { engine, render, runner, world };
    };

    const handleLaunch = () => {
        if (gameState.isSimulating) return;

        setGameState((prev: GameStateType) => ({
            ...prev,
            isSimulating: true,
            isLaunched: true,
            attempts: prev.attempts + 1,
        }));

        // Simulate projectile motion
        simulateProjectile();
    };

    const simulateProjectile = () => {
        const result = calculateTheoretical(gameState.angle, gameState.velocity);
        const { vx, vy } = decomposeVelocity(gameState.velocity, gameState.angle);

        setGameState((prev: GameStateType) => ({
            ...prev,
            maxDistance: result.range,
            maxHeight: result.maxHeight,
        }));

        setTimeout(() => {
            setGameState((prev: GameStateType) => ({ ...prev, isSimulating: false }));

            // Show result modal
            setUiState((prev: UIStateType) => ({
                ...prev,
                showResultModal: true,
                resultIcon: '🎉',
                resultTitle: 'Simulation Complete!',
                resultMessage: `Distance: ${result.range.toFixed(2)}m\nHeight: ${result.maxHeight.toFixed(2)}m`,
            }));
        }, 2000);
    };

    const handleReset = () => {
        setGameState((prev: GameStateType) => ({
            ...prev,
            maxDistance: 0,
            maxHeight: 0,
            isLaunched: false,
        }));
        trajectoryRef.current = [];
    };

    const handleChallengeSwitch = (challenge: 'time-to-distance' | 'max-height') => {
        setGameState((prev: GameStateType) => ({ ...prev, currentChallenge: challenge }));
        handleReset();
    };

    const challenge = CHALLENGES[gameState.currentChallenge as 'time-to-distance' | 'max-height'];

    return (
        <div className={styles.appContainer}>
            {/* Header */}
            <header className={styles.header}>
                <h1>🚀 Projectile Motion Lab</h1>
                <p className={styles.subtitle}>Learn physics by doing!</p>
            </header>

            {/* Challenge Tabs */}
            <div className={styles.challengeTabs}>
                <button
                    className={`${styles.tabBtn} ${gameState.currentChallenge === 'time-to-distance' ? styles.active : ''}`}
                    onClick={() => handleChallengeSwitch('time-to-distance')}
                >
                    ⏱️ Time Problem
                </button>
                <button
                    className={`${styles.tabBtn} ${gameState.currentChallenge === 'max-height' ? styles.active : ''}`}
                    onClick={() => handleChallengeSwitch('max-height')}
                >
                    📐 Maximum Height
                </button>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Left Panel - Controls */}
                <div className={styles.controlPanel}>
                    {/* Challenge Info */}
                    <div className={styles.challengeInfo}>
                        <h2>🎯 Challenge</h2>
                        <p>{challenge.description || 'Explore projectile motion physics!'}</p>
                        <div className={styles.targetInfo}>
                            <span className={styles.targetLabel}>Target:</span>
                            <span className={styles.targetValue}>{challenge.targetInfo}</span>
                        </div>
                    </div>

                    {/* Input Controls */}
                    <div className={styles.inputSection}>
                        <h3>⚙️ Launch Parameters</h3>

                        <div className={styles.inputGroup}>
                            <label>
                                Launch Angle (θ)
                                <span
                                    className={styles.hintIcon}
                                    onClick={() =>
                                        setUiState((prev: UIStateType) => ({
                                            ...prev,
                                            showLearningCard: true,
                                            cardType: 'angle-hint',
                                        }))
                                    }
                                >
                                    💡
                                </span>
                            </label>
                            <div className={styles.inputWithUnit}>
                                <input
                                    type="number"
                                    min="0"
                                    max="90"
                                    value={gameState.angle}
                                    onChange={(e) =>
                                        setGameState((prev) => ({
                                            ...prev,
                                            angle: parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                                <span className={styles.unit}>degrees</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="90"
                                value={gameState.angle}
                                onChange={(e) =>
                                    setGameState((prev) => ({
                                        ...prev,
                                        angle: parseInt(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>
                                Initial Velocity (v₀)
                                <span
                                    className={styles.hintIcon}
                                    onClick={() =>
                                        setUiState((prev: UIStateType) => ({
                                            ...prev,
                                            showLearningCard: true,
                                            cardType: 'velocity-hint',
                                        }))
                                    }
                                >
                                    💡
                                </span>
                            </label>
                            <div className={styles.inputWithUnit}>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={gameState.velocity}
                                    onChange={(e) =>
                                        setGameState((prev) => ({
                                            ...prev,
                                            velocity: parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                                <span className={styles.unit}>m/s</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={gameState.velocity}
                                onChange={(e) =>
                                    setGameState((prev) => ({
                                        ...prev,
                                        velocity: parseInt(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>

                        <div className={styles.gravityDisplay}>
                            <span>Gravity (g):</span>
                            <span className={styles.gravityValue}>9.8 m/s²</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionButtons}>
                        <button
                            className={styles.btn + ' ' + styles.btnLaunch}
                            onClick={handleLaunch}
                            disabled={gameState.isSimulating}
                        >
                            🚀 Launch Projectile
                        </button>
                        <button className={styles.btn + ' ' + styles.btnReset} onClick={handleReset}>
                            🔄 Reset
                        </button>
                    </div>

                    {/* Live Data */}
                    <div className={styles.liveData}>
                        <h3>📊 Live Data</h3>
                        <div className={styles.dataGrid}>
                            <div className={styles.dataItem}>
                                <span className={styles.dataLabel}>Time</span>
                                <span className={styles.dataValue}>0.00 s</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span className={styles.dataLabel}>Distance (x)</span>
                                <span className={styles.dataValue}>{gameState.maxDistance.toFixed(2)} m</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span className={styles.dataLabel}>Height (y)</span>
                                <span className={styles.dataValue}>{gameState.maxHeight.toFixed(2)} m</span>
                            </div>
                            <div className={styles.dataItem}>
                                <span className={styles.dataLabel}>Current Speed</span>
                                <span className={styles.dataValue}>0.00 m/s</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className={styles.resultsPanel}>
                        <h3>📈 Results</h3>
                        <div className={styles.resultItem}>
                            <span>Max Distance:</span>
                            <span>{gameState.maxDistance.toFixed(2)} m</span>
                        </div>
                        <div className={styles.resultItem}>
                            <span>Max Height:</span>
                            <span>{gameState.maxHeight.toFixed(2)} m</span>
                        </div>
                        <div className={styles.resultItem}>
                            <span>Total Time:</span>
                            <span>{((2 * gameState.velocity * Math.sin((gameState.angle * Math.PI) / 180)) / 9.8).toFixed(2)} s</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Canvas */}
                <div className={styles.canvasSection} ref={canvasRef} id="canvas-container" />
            </div>

            {/* Tips Panel */}
            <div className={styles.tipsPanel}>
                <h3>💡 Tips & Formulas</h3>
                <div className={styles.tipsContent}>
                    <div className={styles.formulaCard}>
                        <h4>Key Formulas</h4>
                        <p>
                            <strong>Horizontal Distance:</strong> R = (v₀² × sin(2θ)) / g
                        </p>
                        <p>
                            <strong>Maximum Height:</strong> H = (v₀² × sin²(θ)) / (2g)
                        </p>
                        <p>
                            <strong>Time of Flight:</strong> T = (2 × v₀ × sin(θ)) / g
                        </p>
                    </div>
                    <div className={styles.tipCard}>
                        <h4>💡 Current Tip</h4>
                        <p>{challenge.hint}</p>
                    </div>
                </div>
            </div>

            {/* Score Panel */}
            <div className={styles.scorePanel}>
                <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Attempts</span>
                    <span className={styles.scoreValue}>{gameState.attempts}</span>
                </div>
                <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Solved</span>
                    <span className={styles.scoreValue}>{gameState.solved}</span>
                </div>
                <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Accuracy</span>
                    <span className={styles.scoreValue}>
                        {gameState.attempts > 0 ? Math.round((gameState.solved / gameState.attempts) * 100) : 0}%
                    </span>
                </div>
            </div>

            {/* Learning Card Modal */}
            <LearningCard
                isVisible={uiState.showLearningCard}
                icon={LEARNING_CARDS[uiState.cardType]?.icon || ''}
                title={LEARNING_CARDS[uiState.cardType]?.title || ''}
                text={LEARNING_CARDS[uiState.cardType]?.text || ''}
                formula={LEARNING_CARDS[uiState.cardType]?.formula || ''}
                tip={LEARNING_CARDS[uiState.cardType]?.tip || ''}
                onClose={() =>
                    setUiState((prev: UIStateType) => ({
                        ...prev,
                        showLearningCard: false,
                    }))
                }
                onUnderstand={() =>
                    setUiState((prev: UIStateType) => ({
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
                stats=""
                onClose={() =>
                    setUiState((prev: UIStateType) => ({
                        ...prev,
                        showResultModal: false,
                    }))
                }
                onRetry={handleReset}
                onNext={() => {
                    setUiState((prev: UIStateType) => ({
                        ...prev,
                        showResultModal: false,
                    }));
                    handleChallengeSwitch(gameState.currentChallenge === 'time-to-distance' ? 'max-height' : 'time-to-distance');
                }}
                showNext={true}
            />
        </div>
    );
}
