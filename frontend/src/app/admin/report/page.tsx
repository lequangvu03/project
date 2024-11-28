import React from 'react'
import { LinesChart } from '~/components/line-chart'
import { PiesChart } from '~/components/pie-chart'
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
        <div>
          <Button>08/04/2024 --- 08/04/2024</Button>
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
    </div>
  )
}

export default Page
