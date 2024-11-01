import React from "react";
import {useRouter} from "next/navigation";

export default function Nav({title}: {title: string}) {
  const router = useRouter()
  const navTo = (path: string) => { router.push(path) }

  return (
    <nav className="Nav">
      <div>
        <h2>{title}</h2>
        <div style={{background: 'red'}}></div>
        <div>
          <button onClick={() => navTo('/')}>Coins</button>
          <button onClick={() => navTo('favorite')}>Favorites</button>
          <button onClick={() => navTo('trending')}>Trending</button>
        </div>
      </div>
    </nav>
  )
}