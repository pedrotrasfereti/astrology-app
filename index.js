import api from './lib/api.js';

import { calculateJD, calculateUTC } from './lib/time.js';

// Will eventually get this data from a form
import { YEAR, MONTH_INDEX, DAY, HOURS, MINUTES } from './constants/birth-data.js';
import { getChart } from './lib/astro.js';

const getGeoLocation = async (location) => {
  const data = await api.geo(location);

  return {
    timezoneOffset: {
      sec: data.results[0].annotations.timezone.offset_sec,
    },
    geo: data.results[0].geometry,
  };
};

const getAstroChart = async (julianDate) => {
  const data = await api.ephemeris(julianDate);
  return getChart(data);
}

const locationData = await getGeoLocation('Campinas, SP, Brazil');

const TIMEZONE_OFFSET = locationData.timezoneOffset.sec / 60;
const date = calculateUTC(YEAR, MONTH_INDEX, DAY, HOURS, MINUTES, TIMEZONE_OFFSET);
const JD = calculateJD(date);

const chart = await getAstroChart(JD);

console.log(chart);
