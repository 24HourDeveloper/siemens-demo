import { useState } from 'react'

export default function useWeatherSearch() {
  const [search, setSearch] = useState("30331")

  const searchWeather = (text: string) => {
    setSearch(text)
  }

  return { search, searchWeather }
}