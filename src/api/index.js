export const fetchThemes = async () => {
  const res = await fetch('/themes');
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export const fetchPopularThemes = async () => {
  const res = await fetch('/themes?topCount=10&during=10');
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export const fetchAvailableTimes = async (date, themeId) => {
  const res = await fetch(`/times?themeId=${themeId}&date=${date}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export const createReservation = async (body) => {
  const res = await fetch('/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};
