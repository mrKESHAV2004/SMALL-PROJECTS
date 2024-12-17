const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const city = req.body.city;
    const apiKey = 'b76f2a6e991b546ee2826c5776305ed8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    https.get(url, function(response) {
        let data = '';

        response.on('data', function(chunk) {
            data += chunk;
        });

        response.on('end', function() {
            try {
                if (response.statusCode === 200) {
                    const weatherData = JSON.parse(data);
                    const temp = Math.round(weatherData.main.temp);
                    const description = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const feelsLike = Math.round(weatherData.main.feels_like);
                    const humidity = weatherData.main.humidity;
                    const windSpeed = weatherData.wind.speed;
                    const cityName = weatherData.name;
                    const country = weatherData.sys.country;
                    const pressure = weatherData.main.pressure;
                    const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                    const html = `
                    <script src="https://cdn.tailwindcss.com"></script>
                        <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
                            <div class="text-center mb-6">
                                <h2 class="text-2xl font-bold text-gray-800">${cityName}, ${country}</h2>
                                <p class="text-gray-500">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            
                            <div class="flex items-center justify-center mb-6">
                                <div class="text-center">
                                    <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather icon" class="w-32 h-32 mx-auto">
                                    <p class="text-6xl font-bold text-gray-800 mb-2">${temp}°C</p>
                                    <p class="text-xl text-gray-600 capitalize">${description}</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="bg-blue-50 rounded-lg p-4 text-center">
                                    <div class="text-blue-500 mb-2">
                                        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-500">Feels Like</div>
                                    <div class="text-lg font-semibold text-gray-800">${feelsLike}°C</div>
                                </div>
                                
                                <div class="bg-blue-50 rounded-lg p-4 text-center">
                                    <div class="text-blue-500 mb-2">
                                        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-500">Humidity</div>
                                    <div class="text-lg font-semibold text-gray-800">${humidity}%</div>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4 text-center">
                                    <div class="text-blue-500 mb-2">
                                        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-500">Wind Speed</div>
                                    <div class="text-lg font-semibold text-gray-800">${windSpeed} m/s</div>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4 text-center">
                                    <div class="text-blue-500 mb-2">
                                        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-500">Pressure</div>
                                    <div class="text-lg font-semibold text-gray-800">${pressure} hPa</div>
                                </div>
                            </div>

                            <div class="border-t border-gray-200 pt-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="text-center">
                                        <div class="text-sm text-gray-500 mb-1">Sunrise</div>
                                        <div class="text-lg font-semibold text-gray-800">${sunrise}</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-sm text-gray-500 mb-1">Sunset</div>
                                        <div class="text-lg font-semibold text-gray-800">${sunset}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    res.send(html);
                } else {
                    const errorData = JSON.parse(data);
                    res.status(response.statusCode).send(`
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-6" role="alert">
                            <p class="font-bold">Error</p>
                            <p>${errorData.message || 'City not found'}</p>
                        </div>
                    `);
                }
            } catch (error) {
                res.status(500).send(`
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-6" role="alert">
                        <p class="font-bold">Error</p>
                        <p>Error processing weather data. Please try again.</p>
                    </div>
                `);
            }
        });
    }).on('error', function(error) {
        res.status(500).send(`
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-6" role="alert">
                <p class="font-bold">Error</p>
                <p>Error connecting to weather service. Please try again later.</p>
            </div>
        `);
    });
});

app.listen(3000, function() {
    console.log('Server running on port 3000');
});