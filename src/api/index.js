const MOCK_THEMES = [
  { themeId: 1, themeName: '공포' },
  { themeId: 2, themeName: '추리' },
  { themeId: 3, themeName: '판타지' },
  { themeId: 4, themeName: '스파이' },
  { themeId: 5, themeName: '좀비' },
];

const MOCK_POPULAR = [
  { themeId: 1, themeName: '공포' },
  { themeId: 5, themeName: '좀비' },
  { themeId: 3, themeName: '판타지' },
];

const MOCK_TIMES = [
  { id: 1, startAt: '10:00' },
  { id: 2, startAt: '11:00' },
  { id: 3, startAt: '13:00' },
  { id: 4, startAt: '15:00' },
  { id: 5, startAt: '17:00' },
];

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const fetchThemes = async () => {
  await delay();
  return MOCK_THEMES;
};

export const fetchPopularThemes = async () => {
  await delay();
  return MOCK_POPULAR;
};

export const fetchAvailableTimes = async (date, themeId) => {
  await delay();
  return {
    themeId: Number(themeId),
    date,
    'available-times': MOCK_TIMES,
  };
};

export const createReservation = async (body) => {
  await delay(500);
  const theme = MOCK_THEMES.find((t) => t.themeId === body.themeId);
  const time = MOCK_TIMES.find((t) => t.id === body.timeId);
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    themeName: theme?.themeName ?? '',
    date: body.date,
    name: body.name,
    time,
  };
};
