import { Button } from './ui/button'
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useLocationSearch } from '@/hooks/useWeather';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { format } from 'date-fns';
import { useFav } from '@/hooks/useFav';

const CitySearch = () => {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { fav } = useFav();

    const { data: locations, isLoading } = useLocationSearch(query);
    const { history, addToHistory, clearHistory } = useSearchHistory();

    const handleSearch = (cityData) => {
        const [lat, lon, name, country] = cityData.split('|');

        addToHistory.mutate({ query, name, lat: parseFloat(lat), lon: parseFloat(lon), country });
        setOpen(false);
        setQuery('');
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    }

    return (
        <>
            <Button
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search City...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search City..." value={query} onValueChange={setQuery} />
                <CommandList>
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>No City found.</CommandEmpty>

                    )}

                    {fav.length > 0 && (
                            <CommandGroup heading="Favorites">
                                {fav.map((location) => {
                                    return <CommandItem
                                        key={location.id}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSearch}
                                    >
                                        <Star className='mr-2 h-4 w-4 text-yellow-500' />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                    </CommandItem>
                                })}

                            </CommandGroup>
                    )}

                    {history.length > 0 && (
                        <>
                            {/* {console.log(history)} */}
                            <CommandSeparator />
                            <CommandGroup>
                                <div className='flex items-center justify-between px-2 my-2'>
                                    <p className='text-xs text-muted-foreground'>
                                        Recent Searches
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => clearHistory.mutate()}
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                </div>
                                {history.map((location) => {
                                    return <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSearch}
                                    >
                                        <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                        <span className='text-sm text-muted-foreground'>, {format(location.searchAt, "MMM d, h:mm: a")}</span>
                                    </CommandItem>
                                })}

                            </CommandGroup>
                        </>
                    )}
                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {
                                isLoading && (
                                    <div className='flex items-center justify-center p-4'>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                )
                            }
                            {
                                locations.map((location) => {
                                    return <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSearch}
                                    >
                                        <Search className='mr-2 h-4 w-4' />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                    </CommandItem>
                                })}
                        </CommandGroup>
                    )}

                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch