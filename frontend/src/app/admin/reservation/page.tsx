'use client'

import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from '~/components/ui/button'

const localizer = momentLocalizer(moment)

interface Event {
  id?: number
  title: string
  start: Date
  end: Date
  allDay?: boolean
}

const DragAndDrop: React.FC = () => {
  const [myEvents, setMyEvents] = useState<Event[]>([])

  useEffect(() => {
    setMyEvents(() => {
      return Array(10)
        .fill(0)
        .map(() => ({
          start: moment().toDate(),
          end: moment().add(1, 'hours').toDate(),
          title: 'Some title'
        }))
    })
  }, [])
  return (
    <div className='flex flex-col gap-8'>
      <header className='flex items-center justify-between'>
        <div>
          <Button className='bg-[#EA7C69]'>1st Floor</Button>
          <Button className='bg-transparent text-white'>2st Floor</Button>
          <Button className='bg-transparent text-white'>3st Floor</Button>
        </div>
        <div className='flex items-center gap-2'>
          <Button className='bg-[#3D4142] text-white'>2st Floor</Button>
          <Button className='bg-[#EA7C69]'>Add new reservation</Button>
        </div>
      </header>
      <Calendar
        defaultDate={new Date()}
        startAccessor='start'
        defaultView={Views.DAY}
        events={myEvents}
        localizer={localizer}
        popup
      />
    </div>
  )
}

export default DragAndDrop
