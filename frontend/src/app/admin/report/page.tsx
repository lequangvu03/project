import { AreaCharts } from '~/components/area-chart'
import { DonusChart } from '~/components/donus-chart'
import { Button } from '~/components/ui/button'

export default function ReportPage() {
  return (
    <main>
      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Button className='bg-[#EA7C69] text-white'>Reservation report</Button>
          <Button className='bg-transparent text-white'>Reservation report</Button>
          <Button className='bg-transparent text-white'>Reservation report</Button>
        </div>
        <div className='flex items-center gap-1'>
          <Button className='flex items-center gap-3 bg-[#3D4142]'>
            <svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M1.70703 13.4596C1.70703 14.6638 2.62786 15.5846 3.83203 15.5846H13.7487C14.9529 15.5846 15.8737 14.6638 15.8737 13.4596V7.79297H1.70703V13.4596ZM13.7487 2.83464H12.332V2.1263C12.332 1.7013 12.0487 1.41797 11.6237 1.41797C11.1987 1.41797 10.9154 1.7013 10.9154 2.1263V2.83464H6.66536V2.1263C6.66536 1.7013 6.38203 1.41797 5.95703 1.41797C5.53203 1.41797 5.2487 1.7013 5.2487 2.1263V2.83464H3.83203C2.62786 2.83464 1.70703 3.75547 1.70703 4.95964V6.3763H15.8737V4.95964C15.8737 3.75547 14.9529 2.83464 13.7487 2.83464Z'
                fill='#EA7C69'
              />
            </svg>
            <span className='text-white'>01/04/2024</span>
            <span className='h-[1px] w-4 bg-white'></span>
            <span className='text-white'>01/04/2024</span>
          </Button>
          <Button className='bg-[#EA7C69] text-white'>Generate report</Button>
        </div>
      </section>

      <section className='flex items-center justify-between'>
        <div>
          <DonusChart />
        </div>
        <div>
          <AreaCharts />
        </div>
      </section>
    </main>
  )
}
