import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, TrendingUp, Star } from 'lucide-react'
import Button from '@/components/Button'

export type NavProps = {
  title: string,
  inputVisible: boolean
  inputHandler: (string) => void
  inputPlaceholder: string
}

export default function Nav(
  {
    title,
    inputVisible = false,
    inputHandler = () => {},
    inputPlaceholder = ""
  }: NavProps) {
  const router = useRouter()
  const navTo = (path: string) => { router.push(path) }

  return (
    <nav className="Nav flex bg-background sticky top-0 w-full shadow-lg flex-row px-4 py-3 z-40">
      <h2 className="text-3xl font-bold hidden md:block">{title}</h2>
      <div className="flex-1 hidden md:block"></div>

      <div className="flex gap-4">
        { inputVisible
          ? <input
            type="text"
            id="search"
            className="
            m-auto p-2 block rounded-lg bg-background2 border text-foreground
            border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500
            dark:border-zinc-700 dark:focus:ring-zinc-700
          "
            placeholder={inputPlaceholder}
            onChange={(e) => {inputHandler(e.target.value)}}
            required
          />
          : null }
        <Button onClick={() => navTo('/')}><Home/> Coins</Button>
        <Button onClick={() => navTo('/favorite')}><Star/> Favorites</Button>
        <Button onClick={() => navTo('/trending')}><TrendingUp/> Trending</Button>
      </div>
    </nav>
  )
}
