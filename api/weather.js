
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  var lat = req.query.lat || '-25.4284';
  var lon = req.query.lon || '-49.2733';

  var url = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + encodeURIComponent(lat) +
    '&longitude=' + encodeURIComponent(lon) +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code' +
    '&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
    '&timezone=America%2FSao_Paulo' +
    '&forecast_days=1';

  try {
    var response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: 'Open-Meteo error: ' + response.status
      });
    }

    var data = await response.json();
    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
};
