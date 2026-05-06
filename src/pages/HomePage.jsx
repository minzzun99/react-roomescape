import { useEffect, useState } from 'react';
import { fetchThemes, fetchPopularThemes } from '../api/index.js';
import ThemeCard from '../components/ThemeCard.jsx';
import styles from './HomePage.module.css';

export default function HomePage({ onReserve }) {
  const [themes, setThemes] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchThemes(), fetchPopularThemes()])
      .then(([all, pop]) => {
        setThemes(all);
        setPopular(pop);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.message}>불러오는 중...</p>;
  if (error) return <p className={styles.error}>오류: {error}</p>;

  return (
    <div>
      <section className={styles.hero}>
        <h2>방탈출 예약</h2>
        <p>테마를 선택하고 날짜와 시간을 골라 예약하세요.</p>
        <button className={styles.reserveBtn} onClick={onReserve}>
          지금 예약하기
        </button>
      </section>

      {popular.length > 0 && (
        <section className={styles.section}>
          <h3>🔥 인기 테마 TOP {popular.length}</h3>
          <div className={styles.grid}>
            {popular.map((t, i) => (
              <ThemeCard key={t.id} theme={t} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h3>전체 테마</h3>
        <div className={styles.grid}>
          {themes.map((t) => (
            <ThemeCard key={t.id} theme={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
