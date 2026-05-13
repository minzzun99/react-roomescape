// api/index.js

const parseResponse = async (response) => {
  if (!response.ok) {
    let errorMsg = `${response.status} ${response.statusText}`;
    try {
      // 백엔드에서 보낸 {"message": "..."} JSON 파싱 시도
      const errorData = await response.json();
      if (errorData.message) {
        errorMsg = errorData.message;
      }
    } catch (e) {
      // JSON이 아니면 기존 HTTP 에러 메시지 유지
    }
    throw new Error(errorMsg);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  return parseResponse(response);
};

// --- Theme API ---
export const fetchThemes = () => fetchJson('/themes');
export const fetchTheme = (id) => fetchJson(`/themes/${id}`);
export const createTheme = (body) => fetchJson('/themes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
export const deleteTheme = (id) => fetchJson(`/themes/${id}`, { method: 'DELETE' });

// 🔥 내다 버렸던 인기 테마 API 복구 (파라미터가 없으면 기본값 10을 사용하도록 유연하게 작성)
export const fetchPopularThemes = (topCount = 10, during = 10) =>
    fetchJson(`/themes?topCount=${topCount}&during=${during}`);

export const updateTheme = (id, body) => fetchJson(`/themes/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

// --- Time API ---
export const fetchTimes = () => fetchJson('/times');
export const fetchAvailableTimes = (date, themeId) => fetchJson(`/times?themeId=${themeId}&date=${date}`);
export const createTime = (body) => fetchJson('/times', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
export const deleteTime = (id) => fetchJson(`/times/${id}`, { method: 'DELETE' });

export const updateTime = (id, body) => fetchJson(`/times/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});


// --- Reservation API (User Domain) ---
export const getReservationsByName = (userName) => fetchJson(`/reservations?userName=${userName}`);
export const createReservation = (body) => fetchJson('/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
export const deleteReservation = (id, userName) => fetchJson(`/reservations/${id}?userName=${userName}`, { method: 'DELETE' });
export const putReservation = (id, userName, body) => fetchJson(`/reservations/${id}?userName=${userName}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
