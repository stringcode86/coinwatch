import React from 'react'

export default function Button(props) {
  return (
    <button
      className="
        bg-gray-200 hover:bg-gray-100 rounded-md px-4 py-2 border-1 flex gap-4
        border-gray-200 items-center
        dark:bg-background2 dark:hover:bg-zinc-800
      "
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}