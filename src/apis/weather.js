import { API_CONFIG } from "./config"


class WeatherApi {
    createUrl(endpoint, params) {

        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        })
        return `${endpoint}?${searchParams.toString()}`
    }

    async fetchData(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Failed to fetch data in weather api');
        }

        return res.json();
    }

    async getCurrentWeather({ lat, lon }) {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        return this.fetchData(url);
    }

    async getForecast({lat, lon}) {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        return this.fetchData(url);
    }

    async getReverseGeocode({lat, lon}) {
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        });

        return this.fetchData(url);
    }
}

export const weatherApi = new WeatherApi();