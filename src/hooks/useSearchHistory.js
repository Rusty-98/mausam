import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage("SearchHistory", []);

    const queryClient = useQueryClient();

    const historyQuery = useQuery({
        queryKey: ["SearchHistory"],
        queryFn: () => history,
        initialData: history
    })

    const addToHistory = useMutation({
        mutationFn: async (search) => {
            const newHistory = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchAt: new Date()
            };

            const filteredHistory = history.filter((item) => !(item.lat === search.lat && item.lon === search.lon));
            const updatedHistory = [newHistory, ...filteredHistory].slice(0, 10);
            setHistory(updatedHistory);
            return updatedHistory;
        },

        onSuccess: (updatedHistory) => {
            queryClient.setQueryData(["SearchHistory"], updatedHistory);
        }
    })

    const clearHistory = useMutation({
        mutationFn: async () => {
            setHistory([]);
            return [];
        },

        onSuccess: () => {
            queryClient.setQueryData(["SearchHistory"], []);
        }
    })

    return { history: historyQuery.data, addToHistory, clearHistory };
}