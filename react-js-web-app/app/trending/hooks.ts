import { useStore } from '@/data/store'
export function useFavorites(): {
  favorites: Set<string>,
  updateFavorites: (Set) => void,
  isFavorite: (string) => boolean,
  toggleFavorite: (string) => void,
} {
  const favorites = useStore((state) => state.favorites)
  const updateFavorites = useStore((state) => state.updateFavorites)
  const isFavorite = (id: string) => favorites.has(id)
  const toggleFavorite = (id: string) => {
    const favs = new Set([...favorites])
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    favs.has(id) ? favs.delete(id) : favs.add(id)
    updateFavorites(favs)
  }
  return {
    favorites: favorites,
    updateFavorites: updateFavorites,
    isFavorite: isFavorite,
    toggleFavorite: toggleFavorite
  }
}