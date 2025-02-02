export async function GET(request: Request, { location }: { location: string }) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY
  const FORECAST_URL = process.env.FORECAST_URL
  const url = `${FORECAST_URL}${WEATHER_API_KEY}&q=${location}&days=5&aqi=no&alerts=no`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching weather', error)
  }
}