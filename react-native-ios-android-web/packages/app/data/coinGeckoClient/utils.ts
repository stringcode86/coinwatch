export const DEFAULT_STALE_TIME =  60000

export const defaultGetMarketsParams = {
  ids: null,
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 50,
  page: 1,
  sparkline: true,
  price_change_percentage: '24h',
  locale: 'en',
  precision: 'full',
}