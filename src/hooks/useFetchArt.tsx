import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

type requestConfig = {
  id?: number;
  queryParams?: string;
}

function useFetchArt(config: requestConfig) {
    const { data, error } = useSWR(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ARTWORKS_V1}${config.id ?? config.queryParams}`, fetcher)
  
    return {
      payload: data,
      isLoading: !error && !data,
      isError: error
    }
}

export default useFetchArt