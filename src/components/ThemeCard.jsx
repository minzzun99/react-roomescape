import styles from './ThemeCard.module.css';

export default function ThemeCard({ theme, rank }) {
  return (
    <div className={styles.card}>
      {rank && <span className={styles.rank}>#{rank}</span>}
      <p className={styles.name}>{theme.themeName}</p>
    </div>
  );
}
