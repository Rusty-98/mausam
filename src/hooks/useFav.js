import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

export function useFav() {
    const [fav, setFav] = useLocalStorage("fav", []);

    const queryClient = useQueryClient();

    const favQuery = useQuery({
        queryKey: ["fav"],
        queryFn: () => fav,
        initialData: fav,
        staleTime: Infinity
    })

    const addToFav = useMutation({
        mutationFn: async (city) => {
            const newFav = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: new Date()
            };

            const exists = fav.some((fav) => fav.id === newFav.id);
            if (exists) {
                return fav;
            }

            const newFavs = [...fav, newFav].slice(0, 10);
            setFav(newFavs);
            return newFavs;
        },

        onSuccess: (newFav) => {
            queryClient.invalidateQueries({
                queryKey: ["fav"]
            });
        }
    })

    const removeFav = useMutation({
        mutationFn: async (cityId) => {
            const newFavs = fav.filter((fav) => fav.id !== cityId);
            setFav(newFavs);
            return newFavs;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fav"]
            });
        }
    })

    return {
        fav: favQuery.data, addToFav, removeFav, isFav: (lat, lon) => fav.some((city) => city.lat === lat && city.lon === lon),
    };
}