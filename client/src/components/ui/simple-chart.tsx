import * as React from "react"
import { cn } from "@/lib/utils"

interface SimpleChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  className?: string
}

export function SimpleBarChart({ data, className }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className={cn("space-y-2", className)}>
      {data.map((item, index) => (
        <div key={item.name} className="flex items-center space-x-2">
          <span className="text-sm font-medium w-20 truncate">{item.name}</span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="h-4 rounded-full transition-all duration-300"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#3b82f6'
              }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SimplePieChart({ data, className }: SimpleChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulative = 0
  
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="w-32 h-32 mx-auto relative">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const strokeDasharray = `${percentage} ${100 - percentage}`
            const strokeDashoffset = -cumulative
            cumulative += percentage
            
            return (
              <circle
                key={item.name}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={item.color || `hsl(${index * 45}, 70%, 50%)`}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
      </div>
      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color || `hsl(${index * 45}, 70%, 50%)` }}
            />
            <span>{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}