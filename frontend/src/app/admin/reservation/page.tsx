'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment'
import { Button } from '~/components/ui/button'

const localizer = momentLocalizer(moment) // Khởi tạo localizer với moment
const DragAndDropCalendar = withDragAndDrop(Calendar)

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  allDay?: boolean
}

const DragAndDrop: React.FC = () => {
  const [myEvents, setMyEvents] = useState<Event[]>([
    {
      id: 0,
      title: 'Sự kiện 1',
      start: new Date(2023, 10, 1, 10, 0),
      end: new Date(2023, 10, 1, 12, 0)
    },
    {
      id: 1,
      title: 'Sự kiện 2',
      start: new Date(2023, 10, 2, 14, 0),
      end: new Date(2023, 10, 2, 15, 0)
    }
  ])

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay = false }: { event: Event; start: Date; end: Date; isAllDay?: boolean }) => {
      const updatedEvent = { ...event, start, end, allDay: isAllDay }
      setMyEvents((prevEvents) => prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev)))
    },
    []
  )

  const resizeEvent = useCallback(({ event, start, end }: { event: Event; start: Date; end: Date }) => {
    const updatedEvent = { ...event, start, end }
    setMyEvents((prevEvents) => prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev)))
  }, [])

  const defaultDate = useMemo(() => new Date(), [])

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
      <DragAndDropCalendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer} // Truyền localizer vào Calendar
        // onEventDrop={moveEvent}
        // onEventResize={resizeEvent}
        resizable
        popup
      />
    </div>
  )
}

export default DragAndDrop
