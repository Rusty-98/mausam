import { weatherApi } from "@/apis/weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS={
    weather:(cords)=> ["weather",cords],
    forecast:(cords)=> ["forecast",cords],
    location:(cords)=> ["location",cords],
}


export function useWeatherQuery(coordinates){
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}


export function useForecastQuery(coordinates){
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates? weatherApi.getForecast(coordinates) : null,
        enabled: !!coordinates,
    })
}


export function useReverseGeocodeQuery(coordinates){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates? weatherApi.getReverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    })
}