// Calculate UTC
export const calculateUTC = (year, month, day, hours, minutes, timezoneOffset) => {
  const UTC = Date.UTC(
    year,
    month,
    day,
    hours,
    minutes,
  ) - timezoneOffset * 60000;

  return new Date(UTC);
};

// Calculate Julian Date
export const calculateJD = (UTC) => {
  const day = UTC.getUTCDate();
  const hour = UTC.getUTCHours();
  const minute = UTC.getUTCMinutes();
  const second = UTC.getUTCSeconds();

  let year = UTC.getUTCFullYear();
  let month = UTC.getUTCMonth() + 1; // getUTCMonth() returns 0-11
  
  // Adjust January and February to be months 13 and 14 of the previous year
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  // Compute Leap Century Adjustment (Gregorian Calendar Fix)
  const century = Math.floor(year / 100);
  const leapCenturyAdjustment = 2 - century + Math.floor(century / 4);

  // Compute Julian Day Number (Integer Part)
  const julianDayNumber = Math.floor(365.25 * (year + 4716)) + 
    Math.floor(30.6001 * (month + 1)) + 
    day + leapCenturyAdjustment - 1524.5;

  // Compute Fractional Day Contribution
  const fractionalDay = (hour + minute / 60 + second / 3600) / 24;

  const JD = julianDayNumber + fractionalDay;

  return JD;
};

// Calculate Greenwich Sidereal Time
export const calculateGST = (julianDate) => {
  const JD2000 = 2451545;
  const T = (julianDate - JD2000) / 36525;
  const GST = 280.46061837 + 360.98564736629 * (julianDate - JD2000) + T * T * (0.000387933 - T / 38710000);
  return GST % 360; // Normalize to [0, 360)
};

// Calculate Local Sidereal Time
export const calculateLST = (utcDate, longitude) => {
  const JD = calculateJD(utcDate);
  const GST = calculateGST(JD);

  // Add the observer's longitude (converted to hours)
  const LST = (GST + longitude / 15) % 360;
  return LST;
}
