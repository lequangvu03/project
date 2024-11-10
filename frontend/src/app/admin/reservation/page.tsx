'use client'

import 'moment-timezone' // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

// Set the IANA time zone you want to use
moment.tz.setDefault('Europe/Paris')
function ReservationPage() {

  const events = [
    {
      title: 'My Event',
      start: '2015-04-12T13:45:00-05:00',
      end: '2015-04-12T14:00:00-05:00'
    }
  ]


  return (
    <div className='myCustomHeight'>
      <Calendar localizer={localizer} events={events} startAccessor='start' endAccessor='end' />
    </div>
  )
}

export default ReservationPage
