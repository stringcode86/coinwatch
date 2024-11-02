import { useMemo } from 'react'
import { Line, LineChart, YAxis } from 'recharts'

export type ChartProps = {
  chartData: number[],
  color: string,
  width: number,
  height: number,
}

export default function Chart({chartData, color, width, height}: ChartProps) {
  const internalRep = useMemo(() => chartData.map(x => ({pv: x})), [chartData])

  return (
    <LineChart data={internalRep} width={width} height={height}>
      <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
      <Line type="monotone" dataKey="pv" stroke={color} dot={false} strokeWidth={2}/>
    </LineChart>
  )
}
