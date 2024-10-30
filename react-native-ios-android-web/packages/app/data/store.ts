import { create } from 'zustand'

type State = {
  favorites: Set<string>
}

type Action = {
  updateFavorites: (favorites: State['favorites']) => void
}

export const useStore = create<State & Action>((set) => ({
  favorites: new Set<string>,
  updateFavorites: (favorites) => set(() => ({ favorites: favorites })),
}))