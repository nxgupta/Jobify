import React from 'react'
import { AreaChartComponent, BarChartComponent } from './index'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer
