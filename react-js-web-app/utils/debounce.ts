import { useState, useEffect } from 'react';

const useDebouncedValue = <T>(inputValue: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(inputValue), delay)
    return () => clearTimeout(handler)
  }, [inputValue, delay])

  return debouncedValue
}

export default useDebouncedValue
