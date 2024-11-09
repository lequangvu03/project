import Link from 'next/link'
import DashboardChart from '~/components/dashboard-chart'

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-10'>
      <section className='grid grid-cols-3 gap-10'>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            className='flex flex-col gap-8 rounded-xl bg-[var(--secondary-color)] p-4 shadow-lg hover:shadow-2xl'
            key={index}
          >
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px] leading-[16px] text-gray-300'>Daily Sales</div>
                <div className='text-[26px] font-medium leading-[36px] text-white'>$2K</div>
              </div>
              <div className='flex items-center justify-center rounded-full bg-[#EA7C69] p-1'>
                <svg
                  className='text-white'
                  width='19'
                  height='19'
                  viewBox='0 0 19 19'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.16016 11.3477H7.66016C7.66016 12.1577 8.68766 12.8477 9.91016 12.8477C11.1327 12.8477 12.1602 12.1577 12.1602 11.3477C12.1602 10.5227 11.3802 10.2227 9.73016 9.82516C8.14016 9.42766 6.16016 8.93266 6.16016 6.84766C6.16016 5.50516 7.26266 4.36516 8.78516 3.98266V2.34766H11.0352V3.98266C12.5577 4.36516 13.6602 5.50516 13.6602 6.84766H12.1602C12.1602 6.03766 11.1327 5.34766 9.91016 5.34766C8.68766 5.34766 7.66016 6.03766 7.66016 6.84766C7.66016 7.67266 8.44016 7.97266 10.0902 8.37016C11.6802 8.76766 13.6602 9.26266 13.6602 11.3477C13.6602 12.6902 12.5577 13.8302 11.0352 14.2127V15.8477H8.78516V14.2127C7.26266 13.8302 6.16016 12.6902 6.16016 11.3477Z'
                    fill='#333333'
                  />
                </svg>
              </div>
            </div>

            <div className='flex items-end justify-between gap-4'>
              <h3 className='text-[18px] text-gray-400'>9 Feburary 2024</h3>

              <div>
                <svg width='240' height='100' viewBox='0 0 155 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clip-path='url(#clip0_158_7264)'>
                    <g clip-path='url(#clip1_158_7264)'>
                      <rect x='0.984375' y='22.3789' width='6.34111' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='22.1211' width='6.34111' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='43.2578' y='5.59375' width='6.34111' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='64.3945' y='16.7852' width='6.34111' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='85.5312' y='27.9727' width='6.34112' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='106.668' y='11.1875' width='6.34112' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='127.805' y='2.23828' width='6.34111' height='62.6619' rx='2.97167' fill='#50CD89' />
                      <rect x='148.855' width='6.42918' height='76.5206' rx='2.97167' fill='#50CD89' />
                    </g>
                  </g>
                  <defs>
                    <clipPath id='clip0_158_7264'>
                      <rect width='154' height='52' fill='white' transform='translate(0.984375)' />
                    </clipPath>
                    <clipPath id='clip1_158_7264'>
                      <rect width='154.3' height='90.636' fill='white' transform='translate(0.984375)' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className='grid grid-cols-2 gap-10'>
        {Array.from({ length: 2 }, (_, index) => {
          return (
            <div className='flex flex-col gap-4 rounded-xl bg-[var(--secondary-color)] p-6' key={index}>
              <header className='flex items-center justify-between'>
                <h3 className='text-[20px] font-medium leading-[36px] text-white'>Popular Dishes</h3>
                <Link className='text-[16px] font-normal leading-6 text-[#EA7C69] underline' href={'/'}>
                  See All
                </Link>
              </header>

              <aside className='flex h-[300px] flex-col gap-4 overflow-x-hidden overflow-y-hidden'>
                {Array.from({ length: 4 }, (_, index) => {
                  return (
                    <div className='flex items-center justify-between rounded-xl bg-[#262728] p-1' key={index}>
                      <div className='flex items-start gap-4'>
                        <div className='h-[60px] w-[90px] rounded-md bg-slate-400'>
                          <></>
                        </div>
                        <div className='flex flex-col gap-1 p-1'>
                          <h2 className='text-[16px] text-white'>Chicken Parmesan</h2>
                          <p className='text-[14px] font-normal leading-[21px] text-gray-600'>Serving : 01 person</p>
                        </div>
                      </div>

                      <div className='mr-2 flex flex-col gap-2'>
                        <h2 className='text-[14px] text-[#EA7C69]'>In Stock</h2>
                        <p className='text-[14px] font-medium text-gray-300'>$55.00</p>
                      </div>
                    </div>
                  )
                })}
              </aside>
            </div>
          )
        })}
      </section>

      <section>
        <DashboardChart />
      </section>
    </div>
  )
}
