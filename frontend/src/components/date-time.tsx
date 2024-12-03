import React, { useEffect, useState } from 'react'

function DateTime() {
  const [dateTime, setDateTime] = useState<{
    date: string
    time: string
  }>({
    date: '',
    time: ''
  })
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
      setDateTime({ date: formattedDate, time: formattedTime })
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className='flex items-center justify-between'>
        <span>{dateTime.date}</span>
        <span>{dateTime.time}</span>
      </p>
    </div>
  )
}

export default DateTime
