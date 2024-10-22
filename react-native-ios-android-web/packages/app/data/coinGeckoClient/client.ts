import { ENV } from "app/utils/envVars";

const BASE_URL = 'https://api.coingecko.com/api/v3'
const DEFAULT_HEADERS = {
  'accept': 'application/json',
  'x-cg-demo-api-key': ENV.coinGeckoApiKey
}
const DEBUG = true

export function get<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  if (params) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    }
    path += '?' + searchParams.toString()
  }
  DEBUG ? console.log(`[GET] ${BASE_URL}${path}`) : null
  return fetch(`${BASE_URL}${path}`, {headers: {...DEFAULT_HEADERS} })
    .then((value) => value.json() as T)
}


// curl --request GET \
//      --url 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h&locale=en&precision=full' \
//      --header 'accept: application/json' \
//      --header 'x-cg-demo-api-key: CG-8PHcXt7eskXbF21EUvRcJDmC' > markets.json

// @ts-ignore

// export const fetchMarkets = async ({ queryKey, pageParam }): Promise<Market[]> => {
//     const defaultsParams = ''
//     let url = pageParam ? pageParam : `${API_BASE_URL}/api/character`;
//
//     if (!pageParam && queryKey.length > 1 && queryKey[1].length > 0) {
//         url += `?name=${queryKey[1]}`;
//     }
//
//     const response = await fetch(url);
//
//     const response = fetch(`${BASE_URL}${'/coins/markets'}`, {
//         ...options,
//         headers: {
//             ...DEFAULT_HEADERS,
//         },
//     return await response.json();
// };

// export function get<T>(path: string, params )