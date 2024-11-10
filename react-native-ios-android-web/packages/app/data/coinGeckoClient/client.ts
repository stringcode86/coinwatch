import { ENV } from "app/utils/envVars";

const BASE_URL = 'https://api.coingecko.com/api/v3'
const DEFAULT_HEADERS = {
  'accept': 'application/json',
  'x-cg-demo-api-key': ENV.coinGeckoApiKey
}

const DEBUG = false

export function get<T>(
  path: string,
  params?: Record<string, string | Array<string> | number | boolean | undefined | null>
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
