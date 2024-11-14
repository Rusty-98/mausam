import { useFav } from '@/hooks/useFav'
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeatherQuery } from '@/hooks/useWeather';
import { Loader2, X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';


function FavCityTab({ id, name, lat, lon, onRemove }) {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

    return <div onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)} role='button' tabIndex={0}
        className='relative flex min-w-[250px] items-center gap-3 border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md rounded-lg cursor-pointer'>
        <Button size="icon" variant="ghost" className='absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100'
            onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
                toast.error(`Removed ${name} from favorites`)
            }}>
            <X className='h-4 w-4' />
        </Button>

        {
            isLoading ? (
                <div className='flex h-8 items-center justify-center'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                </div>
            ) : weather ? <>
                <div className='flex items-center gap-2'>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} className='h-8 w-8' />
                    <div className='ml-auto text-right'>
                        <p className='font-medium'>{name}</p>
                        <p className='text-xs text-muted-foreground'>
                            {weather.sys.country}
                        </p>
                    </div>
                </div>
                <div className='ml-auto text-right'>
                    <p className='text-lg font-bold'>
                        {Math.round(weather.main.temp)}°
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        {weather.weather[0].description}
                    </p>
                </div>
            </> : null
        }
    </div>
}

const FavCities = () => {

    const { fav, removeFav } = useFav();

    if (!fav.length) {
        return null;
    }

    return (
        <>
            <h1 className='text-xl font-bold tracking-tight'>Favorites</h1>
            <ScrollArea className="w-full pb-4">
                <div className='flex gap-4'>
                    {fav.map((city) => (
                        <FavCityTab
                            key={city.id}
                            {...city}
                            onRemove={() => removeFav.mutate(city.id)}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
        </>
    )
}



export default FavCities