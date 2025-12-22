'use client';

import styles from './modals.module.css';

interface LearningCardProps {
    isVisible: boolean;
    icon: string;
    title: string;
    text: string;
    formula: string;
    tip: string;
    onClose: () => void;
    onUnderstand: () => void;
}

export const LearningCard = ({
    isVisible,
    icon,
    title,
    text,
    formula,
    tip,
    onClose,
    onUnderstand,
}: LearningCardProps) => {
    if (!isVisible) return null;

    return (
        <div className={styles.learningCard}>
            <div className={styles.cardContent}>
                <button className={styles.closeCard} onClick={onClose}>
                    ×
                </button>
                <div className={styles.cardIcon}>{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                {formula && <div className={styles.cardFormula}>{formula}</div>}
                {tip && <div className={styles.cardTip}>💡 {tip}</div>}
                <button className={`${styles.btn} ${styles.btnUnderstand}`} onClick={onUnderstand}>
                    Got it! 👍
                </button>
            </div>
        </div>
    );
};
