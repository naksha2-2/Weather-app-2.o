// 

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  const cityName = req.body.Cityname;
  const apiKey = 'f6040f4ca4698b670988bb067184d299'; // Replace with your valid OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  console.log(`Fetching weather for: ${cityName}`); // Debug log to confirm city name is passed

  // Make the HTTP request to the OpenWeather API
  https.get(url, (apiResponse) => {
    let data = '';

    // Collect the data as it comes in
    apiResponse.on('data', (chunk) => {
      data += chunk;
    });

    // Once the response is complete, process the data
    apiResponse.on('end', () => {
      try {
        const weatherData = JSON.parse(data);

        // Log the raw weather data
        console.log('Weather Data:', weatherData);

        // Check if the response is valid (status code 200 and city found)
        if (weatherData.cod === 200) {
          const temp = weatherData.main.temp;
          const city = weatherData.name;
          const description = weatherData.weather[0].description;

          // Send a response with weather details
          res.send(`
            <h1>Weather in ${city}</h1>
            <p>Temperature: ${temp}°C</p>
            <p>Description: ${description}</p>
          `);
        } else {
          // If the city is not found, send an error message
          res.send(`<h1>City not found. Please try again!</h1>`);
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        res.send(`<h1>Sorry, there was an error fetching weather data.</h1>`);
      }
    });
  }).on('error', (err) => {
    console.error('API Request Error:', err);
    res.send(`<h1>Error connecting to the weather service.</h1>`);
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
