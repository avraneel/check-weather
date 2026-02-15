export function getBeaufortFromMetric(windSpeed) {
  if (windSpeed < 1) return 0;
  else if (windSpeed < 6) return 1;
  else if (windSpeed < 12) return 2;
  else if (windSpeed < 20) return 3;
  else if (windSpeed < 29) return 4;
  else if (windSpeed < 38) return 5;
  else if (windSpeed < 50) return 6;
  else if (windSpeed < 62) return 7;
  else if (windSpeed < 75) return 8;
  else if (windSpeed < 89) return 9;
  else if (windSpeed < 103) return 10;
  else if (windSpeed < 118) return 11;
  else return 12;
}
