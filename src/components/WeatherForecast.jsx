import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

const WeatherForecast = ({ data }) => {

    const dailyForecast = data?.list?.reduce((acc, forcast) => {
        const date = format(new Date(forcast.dt * 1000), 'yyyy-MM-dd');

        if (!acc[date]) {
            acc[date] = {
                temp_min: forcast.main.temp_min,
                temp_max: forcast.main.temp_max,
                humidity: forcast.main.humidity,
                wind: forcast.wind.speed,
                weather: forcast.weather[0],
                date: forcast.dt
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forcast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forcast.main.temp_max);
        }

        return acc;
    }, {})

    const formatTemp = (temp) => {
        return `${Math.round(temp)}°`
    }

    const nextDays = Object.values(dailyForecast).slice(0, 6);

    return (
        <Card>
            <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-auto">
                <div className='grid gap-4'>
                    {
                        nextDays.map((day)=>{
                            return <div key={day.date} className='grid grid-cols-3 items-center gap-4 rounded-lg border p-4 px-0 md:px-4'>
                                <div>
                                    <p className='font-medium'>{format(new Date(day.date *1000), "EEE, MMM d" )}</p>
                                    <p className='text-sm text-muted-foreground capitalize'>{day.weather.description}</p>
                                </div>
                                <div className='flex justify-center gap-4'>
                                    <span className='flex items-center text-blue-500'>
                                        <ArrowDown className='mr-1 h-4 w-4' />
                                        {formatTemp(day.temp_min)}
                                    </span>
                                    <span className='flex items-center text-red-500'>
                                        <ArrowUp className='mr-1 h-4 w-4' />
                                        {formatTemp(day.temp_max)}
                                    </span>
                                </div>
                                <div className='flex justify-end gap-4'>
                                    <span className='flex items-center gap-1'>
                                        <Droplets className='h-4 w-4 text-blue-500' />
                                        <span className='text-sm'>{day.humidity}%</span>
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <Wind className='h-4 text-blue-500' />
                                        <span className='text-sm'>{day.wind} m/s</span>
                                    </span>

                                </div>
                            </div>
                        })
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherForecast