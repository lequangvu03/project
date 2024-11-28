import React from 'react'
import { DatePickerWithRange } from '~/components/date-range-picker'
import { LinesChart } from '~/components/line-chart'
import { PiesChart } from '~/components/pie-chart'
import ReportItem from '~/components/report-item'
import { Button } from '~/components/ui/button'

function Page() {
  return (
    <div>
      <header className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Button>Reservation Report</Button>
          <Button>Revenue Report</Button>
          <Button>Staff Report</Button>
        </div>
        <div className='flex items-center'>
          <DatePickerWithRange />
          <Button>Generate Report</Button>
        </div>
      </header>
      <div className='flex gap-8'>
        <div className='h-full flex-1'>
          <PiesChart />
        </div>
        <div className='flex-1'>
          <LinesChart />
        </div>
      </div>
      <div>
        {[1, 2, 3].map(function () {
          return <ReportItem />
        })}
      </div>
    </div>
  )
}

export default Page
