import { FC, useRef } from 'react'
import styled from '@emotion/styled'
import Week from './Week'
import DayOfWeek from './DayOfWeek'

const WeekHeader: FC = () => {
  const { current: daysOfWeek } = useRef([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ])
  return (
    <Thead>
      <Week>
        {daysOfWeek.map((day) => (
          <DayOfWeek key={day} day={day} />
        ))}
      </Week>
    </Thead>
  )
}

const Thead = styled.thead``

export default WeekHeader
