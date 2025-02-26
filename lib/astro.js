import ZODIAC_SIGNS from '../constants/zodiac.js';

export const getZodiacSign = (longitude) => {
  const zodiacIndex = Math.floor(longitude / 30);
  const degree = Math.floor(longitude % 30);

  return {
    sign: ZODIAC_SIGNS[zodiacIndex],
    degree,
  };
};

export const getChart = (ephemeris) => {
  const chart = Object.entries(ephemeris).map(([name, longitude]) => ({
    [name]: getZodiacSign(longitude),
  }));

  return chart;
};
