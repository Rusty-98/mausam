import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { MapPin, RefreshCcw, Terminal } from 'lucide-react'
const Dashboard = () => {

  const { coordinates, error, getLocation, isLoading } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }


  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <Alert variant={"destructive"}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        {error}
        <Button onClick={getLocation} variant={"ouline"} className="w-fit" >
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (!coordinates) {
    return <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant={"ouline"} className="w-fit" >
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return <Alert variant={"destructive"}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data plz try again</p>
        <Button onClick={handleRefresh} variant={"ouline"} className="w-fit" >
          <RefreshCcw className="mr-2 h-4 w-4" />
          retry
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />
  }

  return (
    <div className='space-y-4'>
      {/* fav citi */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button variant={"outline"} size={"icon"}
          onClick={handleRefresh}
          dissable={ weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw className={`h-4 w-""4 ${weatherQuery.isFetching? "animate-spin" : ""}`} />
        </Button>
      </div>
      <div className='grid gap-6'>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard