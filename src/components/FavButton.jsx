import { useFav } from '@/hooks/useFav'
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

const FavButton = ({ data }) => {

    const { isFav, addToFav, removeFav } = useFav();
    const isCurrentFav = isFav(data.coord.lat, data.coord.lon)

    const handleToggleFav = () => {
        if (isCurrentFav) {
            removeFav.mutate(data.coord.lat + '-' + data.coord.lon);
            toast.error(`Removed ${data.name} from favorites`);
        } else {
            addToFav.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success(`Added ${data.name} to favorites`);
        }
    }

    return (
        <Button variant={isCurrentFav ? "dafault" : "outline"}
            size={"icon"}
            className={isCurrentFav ? "bg-yellow-500 hover:bg-yellow-6" : ""}
            onClick={handleToggleFav}>
            <Star className={`h-4 w-4 ${isCurrentFav ? 'fill-current' : ''}`} />
        </Button>
    )
}

export default FavButton