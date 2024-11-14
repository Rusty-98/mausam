import { useFav } from '@/hooks/useFav'
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeatherQuery } from '@/hooks/useWeather';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const FavCities = () => {

    const { fav, removeFav } = useFav();

    if (!fav.length) return null;

    return (
        <>
            <h1 className='text-xl font-bold tracking-tight'>Favorites</h1>
            <ScrollArea className="w-full pb-4">
                <div className='flex gap-4'>
                    {fav.map((city) => {
                        return <favCityTab key={city.id} {...city} onRemove={() => removeFav.mutate(city.id)} />
                    })}
                </div>
            </ScrollArea>
        </>
    )
}

function favCityTab({ id, name, lat, lon, onRemove }) {
    const navigate = useNavigate();
    const { data } = useWeatherQuery({ lat, lon });

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
        
        }
    </div>
}

export default FavCities