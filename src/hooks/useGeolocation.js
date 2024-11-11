import { useEffect, useState } from "react";

export function useGeolocation() {
    const [locationData, setLocationData] = useState({
        coordinates: null,
        error: null,
        isLoading: true
    });

    const getLocation = () => {
        setLocationData((prev) => ({
            ...prev,
            isLoading: true,
            error: null
        }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                isLoading: false,
                error: 'Geolocation is not supported'
            });
            return;
        }

        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                isLoading: false,
                error: null 
            })
        },(error)=>{
            let errorMessage = 'Unknown error at error one in get location';

            setLocationData({
                coordinates: null,
                isLoading: false,
                error: errorMessage
            })
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,

    }
}