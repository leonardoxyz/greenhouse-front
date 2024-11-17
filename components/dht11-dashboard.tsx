"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets } from 'lucide-react'

type SensorData = {
  id: number
  temperature: number
  humidity: number
}

const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return "bg-blue-100 text-blue-800"
  if (temp < 10) return "bg-cyan-100 text-cyan-800"
  if (temp < 20) return "bg-green-100 text-green-800"
  if (temp < 30) return "bg-yellow-100 text-yellow-800"
  if (temp < 40) return "bg-orange-100 text-orange-800"
  return "bg-red-100 text-red-800"
}

const SensorCard = ({ data }: { data: SensorData }) => {
  const colorClass = getTemperatureColor(data.temperature)
  
  return (
    <Card className={`w-full ${colorClass} transition-colors duration-500`}>
      <CardHeader>
        <CardTitle>Sensor {data.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Thermometer className="h-6 w-6" />
          <span className="text-2xl font-bold">{data.temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Droplets className="h-6 w-6" />
          <span className="text-2xl font-bold">{data.humidity.toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function Dht11Dashboard() {
  const [sensors, setSensors] = useState<SensorData[]>([
    { id: 1, temperature: 20, humidity: 50 },
    { id: 2, temperature: 22, humidity: 55 },
    { id: 3, temperature: 18, humidity: 45 },
    { id: 4, temperature: 25, humidity: 60 },
    { id: 5, temperature: 21, humidity: 52 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({
          ...sensor,
          temperature: Math.max(-10, Math.min(50, sensor.temperature + (Math.random() - 0.5) * 2)),
          humidity: Math.max(0, Math.min(100, sensor.humidity + (Math.random() - 0.5) * 5)),
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Arduino DHT11 Sensors Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map(sensor => (
          <SensorCard key={sensor.id} data={sensor} />
        ))}
      </div>
    </div>
  )
}