"use client";

import styles from "./modals.module.css";

interface ResultModalProps {
  isVisible: boolean;
  icon: string;
  title: string;
  message: string;
  stats: string;
  onClose: () => void;
  onRetry: () => void;
  onNext: () => void;
  showNext: boolean;
}

export const ResultModal = ({
  isVisible,
  icon,
  title,
  message,
  stats,
  onClose,
  onRetry,
  onNext,
  showNext,
}: ResultModalProps) => {
  if (!isVisible) return null;

  return (
    <div className={styles.resultModal}>
      <div className={styles.modalContent}>
        <button type="button" className={styles.closeModal} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalIcon}>{icon}</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <div
          className={styles.modalStats}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: stats content is generated internally, not from user input
          dangerouslySetInnerHTML={{ __html: stats }}
        />
        <div className={styles.modalButtons}>
          <button type="button" className={styles.btn} onClick={onRetry}>
            🔄 Retry
          </button>
          {showNext && (
            <button type="button" className={styles.btn} onClick={onNext}>
              ➡️ Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
