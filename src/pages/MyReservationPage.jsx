import { useState } from 'react';
import { getReservationsByName, deleteReservation } from '../api/index.js';
import styles from './MyReservationPage.module.css';

export default function MyReservationPage({ onBack, showToast }) {
    const [userName, setUserName] = useState('');
    const [reservations, setReservations] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null); // 삭제 확인용 타겟 상태

    const handleSearch = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지 (엔터 키 지원)
        if (!userName.trim()) return;

        getReservationsByName(userName)
            .then((data) => {
                setReservations(data);
                setHasSearched(true);
            })
            .catch((e) => showToast(e.message));
    };

    const confirmDelete = () => {
        deleteReservation(deleteTarget.id, userName)
            .then(() => {
                showToast('예약이 성공적으로 삭제되었습니다.');
                setDeleteTarget(null);
                handleSearch(new Event('submit')); // 삭제 후 목록 리로드
            })
            .catch((e) => {
                showToast(e.message);
                setDeleteTarget(null);
            });
    };

    return (
        <div className={styles.page}>
            <button className={styles.back} onClick={onBack}>← 돌아가기</button>
            <h2>내 예약 조회</h2>

            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="예약자 이름을 입력하세요"
                    required
                />
                <button type="submit" className={styles.searchBtn}>조회</button>
            </form>

            {hasSearched && (
                <div className={styles.list}>
                    {reservations.length === 0 ? (
                        <p className={styles.empty}>조회된 예약이 없습니다.</p>
                    ) : (
                        reservations.map(item => (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.info}>
                                    <p className={styles.themeName}>{item.theme.name}</p>
                                    <p className={styles.dateTime}>{item.date} | {item.time.startAt.slice(0, 5)}</p>
                                </div>
                                <button className={styles.deleteBtn} onClick={() => setDeleteTarget(item)}>취소</button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* 삭제 확인 모달 */}
            {deleteTarget && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>정말 예약을 취소하시겠습니까?</h3>
                        <div className={styles.modalInfo}>
                            <p><strong>테마:</strong> {deleteTarget.theme.name}</p>
                            <p><strong>날짜:</strong> {deleteTarget.date}</p>
                            <p><strong>시간:</strong> {deleteTarget.time.startAt.slice(0, 5)}</p>
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>닫기</button>
                            <button className={styles.confirmDeleteBtn} onClick={confirmDelete}>예약 취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
