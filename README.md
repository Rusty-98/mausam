
# 🌤️ Mausam - Real-Time Weather Dashboard

Mausam is a sleek, modern web application providing real-time weather updates, detailed forecasts, and location-specific data to help you plan your day with confidence.

## 📖 Features

- 🗺️ **Location-Based Weather**: Get accurate weather details for your current location.
- 🌡️ **Hourly & Weekly Forecasts**: Detailed insights into upcoming weather conditions.
- 🌟 **Favorite Cities**: Save your preferred cities and view their weather at a glance.
- 🔄 **Refresh Data**: Easy-to-use refresh button for updated weather information.
- ⚡ **Fast & Responsive**: Built with a mobile-first approach for seamless experience.

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Data**: OpenWeatherApi (with APIs for weather data)
- **State Management**: React Query
- **Routing**: React Router
- **Icons**: Lucide React
- **Alerts & Notifications**: Sonner UI

## 📂 Project Structure

```
📦 src
 ┣ 📂components
 ┃ ┣ 📜CurrentWeather.jsx   # Displays current weather details
 ┃ ┣ 📜FavCities.jsx        # Favorite cities section
 ┃ ┣ 📜HourlyTemp.jsx       # Hourly temperature component
 ┃ ┗ 📜WeatherForecast.jsx  # Weekly forecast component
 ┣ 📂hooks
 ┃ ┣ 📜useGeolocation.js    # Hook for location access
 ┃ ┣ 📜useWeather.js        # Fetch weather and forecast data
 ┣ 📂pages
 ┃ ┣ 📜Dashboard.jsx        # Main dashboard page
 ┃ ┗ 📜City.jsx             # City-specific weather page
 ┣ 📂context
 ┃ ┗ 📜theme-provider.jsx   # Manages app themes (light/dark mode)
 ┣ 📂styles
 ┃ ┗ 📜index.css            # Global styles
 ┗ 📜App.jsx                # Root component
```

## 🛠️ Setup & Installation

### Clone the repository:

```bash
git clone https://github.com/Rusty-98/mausam.git
cd mausam
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm start
```

### Build for production:

```bash
npm run build
```

## 🌐 API Integration

This project uses a weather API to fetch real-time weather data. Replace the placeholder `API_KEY` in `useWeather.js` with your actual API key:

```javascript
const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.weatherapi.com/v1";
```

You can obtain your API key from [WeatherAPI.com](https://www.weatherapi.com).

## 🎨 Customizations

- **Theme Configuration**: Modify `theme-provider.jsx` to add or customize themes.
- **Styling**: Update Tailwind CSS styles in `index.css` or directly in component files.
- **Favicons**: Replace the default favicon in the `/public` directory with your own branding.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 🤝 Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository.
2. Create a new branch: `feature/my-feature`.
3. Commit your changes:

   ```bash
   git commit -m 'Add my feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/my-feature
   ```

5. Open a Pull Request for review.

## 🙌 Acknowledgments

- **Weather API**: [WeatherAPI.com](https://www.weatherapi.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Design Inspiration**: [Tailwind CSS](https://tailwindcss.com)

## 📞 Contact

Have questions or suggestions? Feel free to reach out!
- **LinkedIn**: [Sumit Singh](www.linkedin.com/in/sumit-singh-developer)

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/Rusty-98/mausam)!
