import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const WeatherDets = ({ data }) => {

    const { wind, main, sys } = data;

    const getWindDir = (degree) => {
        if (degree > 337.5) return 'N';
        if (degree > 292.5) return 'NW';
        if (degree > 247.5) return 'W';
        if (degree > 202.5) return 'SW';
        if (degree > 157.5) return 'S';
        if (degree > 122.5) return 'SE';
        if (degree > 67.5) return 'E';
        if (degree > 22.5) return 'NE';
    }

    const formatTime = (time) => {
        return format(new Date(time * 1000), 'h:mm a')
    }

    const details = [
        {
            title: 'Sunrise',
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: 'text-yellow-500'
        },
        {
            title: 'Sunset',
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: 'text-blue-500'
        },
        {
            title: 'Wind',
            value: `${getWindDir(wind.deg)} m/s`,
            icon: Compass,
            color: 'text-green-500'
        },
        {
            title: 'Pressure',
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: 'text-purple-500'
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((detail) => {
                            return <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        {detail.title}
                                    </p>
                                    <p className="text-sm font-medium leading-none">
                                        {detail.value}
                                    </p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherDets