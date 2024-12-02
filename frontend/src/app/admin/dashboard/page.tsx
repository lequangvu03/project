'use client'

import { formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import DashboardChart from '~/components/dashboard-chart'
import { RecentOrder, TopSellingItem } from '~/definitions/types'
import { useGetDashboardOverview } from '~/hooks/data/dashboard.data'
import { formatDateTime } from '~/utils/format-datetime'

export default function DashboardPage() {
  const { data: dashboard } = useGetDashboardOverview()
  console.log(dashboard?.result)
  if (dashboard?.result) {
    return (
      <div className='flex flex-col gap-10'>
        <section className='grid grid-cols-3 gap-10'>
          <div className='flex flex-col gap-8 rounded-xl bg-[var(--secondary-color)] p-4 shadow-lg hover:shadow-2xl'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px] leading-[16px] text-gray-300'>Daily Sales</div>
                <div className='text-[26px] font-medium leading-[36px] text-white'>
                  $ {dashboard?.result?.daily_sales}
                </div>
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
              <h3 className='text-[18px] text-gray-400'>{formatDateTime(new Date().getTime())}</h3>

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
          <div className='flex flex-col gap-8 rounded-xl bg-[var(--secondary-color)] p-4 shadow-lg hover:shadow-2xl'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px] leading-[16px] text-gray-300'>Month Profit</div>
                <div className='text-[26px] font-medium leading-[36px] text-white'>
                  $ {dashboard?.result?.monthly_profit}
                </div>
              </div>
              <div className='flex items-center justify-center rounded-full bg-[#EA7C69] p-1'>
                <svg width='16' height='13' viewBox='0 0 16 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.76953 1.59766C3.76953 0.772656 4.44453 0.0976562 5.26953 0.0976562H13.5195C13.9174 0.0976563 14.2989 0.255691 14.5802 0.536996C14.8615 0.818301 15.0195 1.19983 15.0195 1.59766V6.84766C15.0195 7.24548 14.8615 7.62701 14.5802 7.90832C14.2989 8.18962 13.9174 8.34766 13.5195 8.34766H12.0195V5.34766C12.0195 4.75092 11.7825 4.17862 11.3605 3.75667C10.9386 3.33471 10.3663 3.09766 9.76953 3.09766H3.76953V1.59766Z'
                    fill='#333333'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0.0195312 5.34766C0.0195312 4.52266 0.694531 3.84766 1.51953 3.84766H9.76953C10.1674 3.84766 10.5489 4.00569 10.8302 4.287C11.1115 4.5683 11.2695 4.94983 11.2695 5.34766V10.5977C11.2695 10.9955 11.1115 11.377 10.8302 11.6583C10.5489 11.9396 10.1674 12.0977 9.76953 12.0977H1.51953C1.12171 12.0977 0.740175 11.9396 0.458871 11.6583C0.177566 11.377 0.0195313 10.9955 0.0195312 10.5977V5.34766ZM5.64453 6.09766C5.14725 6.09766 4.67034 6.2952 4.31871 6.64683C3.96708 6.99846 3.76953 7.47538 3.76953 7.97266C3.76953 8.46994 3.96708 8.94685 4.31871 9.29848C4.67034 9.65011 5.14725 9.84766 5.64453 9.84766C6.14181 9.84766 6.61873 9.65011 6.97036 9.29848C7.32199 8.94685 7.51953 8.46994 7.51953 7.97266C7.51953 7.47538 7.32199 6.99846 6.97036 6.64683C6.61873 6.2952 6.14181 6.09766 5.64453 6.09766Z'
                    fill='#333333'
                  />
                  <path
                    d='M6.39453 7.97266C6.39453 8.17157 6.31551 8.36233 6.17486 8.50299C6.03421 8.64364 5.84344 8.72266 5.64453 8.72266C5.44562 8.72266 5.25485 8.64364 5.1142 8.50299C4.97355 8.36233 4.89453 8.17157 4.89453 7.97266C4.89453 7.77374 4.97355 7.58298 5.1142 7.44233C5.25485 7.30167 5.44562 7.22266 5.64453 7.22266C5.84344 7.22266 6.03421 7.30167 6.17486 7.44233C6.31551 7.58298 6.39453 7.77374 6.39453 7.97266Z'
                    fill='#333333'
                  />
                </svg>
              </div>
            </div>

            <div className='flex items-end justify-between gap-4'>
              <h3 className='text-[18px] text-gray-400'>{formatDateTime(new Date().getTime())}</h3>

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
          <div className='flex flex-col gap-8 rounded-xl bg-[var(--secondary-color)] p-4 shadow-lg hover:shadow-2xl'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px] leading-[16px] text-gray-300'>Monthly Revenue</div>
                <div className='text-[26px] font-medium leading-[36px] text-white'>
                  $ {dashboard?.result?.monthly_revenue}
                </div>
              </div>
              <div className='flex items-center justify-center rounded-full bg-[#EA7C69] p-1'>
                <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clip-path='url(#clip0_2391_11606)'>
                    <path
                      opacity='0.97'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M9.30033 -0.015625C9.62534 -0.015625 9.95039 -0.015625 10.2754 -0.015625C10.6621 0.275312 10.6853 0.591717 10.3451 0.933594C10.3103 1.43696 10.2986 1.94086 10.3102 2.44531C10.5079 2.43947 10.7052 2.44533 10.9022 2.46289C11.0655 2.49522 11.1874 2.58311 11.2679 2.72656C11.3191 3.54458 11.3365 4.36488 11.3201 5.1875C10.287 5.1875 9.2539 5.1875 8.22077 5.1875C8.20444 4.37659 8.22185 3.56799 8.27301 2.76172C8.35053 2.60814 8.47241 2.50853 8.63866 2.46289C8.8473 2.44533 9.05624 2.43947 9.2655 2.44531C9.27132 1.95298 9.2655 1.4608 9.24809 0.96875C8.97068 0.751249 8.91263 0.481716 9.07397 0.160156C9.1424 0.0880736 9.21786 0.02948 9.30033 -0.015625Z'
                      fill='#333333'
                    />
                    <path
                      opacity='0.977'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M4.60063 1.49438C5.44812 1.48853 6.29549 1.49438 7.1428 1.51196C7.29951 1.57641 7.4098 1.68774 7.47364 1.84595C7.48067 2.20457 7.49808 2.56199 7.52587 2.91821C7.48701 3.68954 7.11557 4.22272 6.41149 4.51782C6.37681 4.73924 6.36518 4.96192 6.37667 5.18579C6.02843 5.18579 5.68018 5.18579 5.33194 5.18579C5.33772 4.96283 5.33194 4.74018 5.31453 4.51782C4.76901 4.29521 4.42076 3.89675 4.2698 3.32251C4.21658 2.84335 4.20497 2.36288 4.23498 1.8811C4.29363 1.6872 4.41551 1.55829 4.60063 1.49438Z'
                      fill='#333333'
                    />
                    <path
                      opacity='0.977'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M12.5059 1.49438C13.3534 1.48853 14.2008 1.49438 15.0481 1.51196C15.212 1.55079 15.3223 1.6504 15.3789 1.81079C15.4593 2.3643 15.4477 2.91508 15.3441 3.46313C15.1595 3.97177 14.817 4.32334 14.3168 4.51782C14.2821 4.73924 14.2705 4.96192 14.2819 5.18579C13.9453 5.18579 13.6087 5.18579 13.272 5.18579C13.2835 4.96192 13.2719 4.73924 13.2372 4.51782C12.666 4.29855 12.3119 3.88838 12.1751 3.28735C12.1233 2.84325 12.1117 2.39794 12.1403 1.95142C12.1692 1.71767 12.291 1.56533 12.5059 1.49438Z'
                      fill='#333333'
                    />
                    <path
                      opacity='0.992'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M4.0074 6.17017C7.8613 6.1643 11.7152 6.17017 15.5691 6.18775C15.7988 6.26731 15.9439 6.42551 16.0044 6.66236C16.0276 8.8186 16.0276 10.9749 16.0044 13.1311C15.7969 13.8189 15.35 14.0592 14.6636 13.8518C14.3513 13.6956 14.1714 13.4436 14.1239 13.096C14.1123 12.5217 14.1006 11.9475 14.089 11.3733C13.9654 10.9144 13.6694 10.6683 13.201 10.635C12.6679 10.6635 12.3602 10.9447 12.2782 11.4788C12.2822 11.9165 12.2474 12.3501 12.1737 12.7795C11.8168 13.6427 11.1726 14.0235 10.241 13.9221C9.43028 13.8535 8.91369 13.4258 8.69127 12.6389C8.70541 11.959 8.46746 11.3906 7.97737 10.9338C7.38244 10.5479 6.77879 10.5362 6.16651 10.8987C5.81687 11.1464 5.59052 11.4804 5.48744 11.9006C5.4485 12.3332 5.42528 12.7668 5.41779 13.2014C5.20759 13.7911 4.79551 14.0196 4.18153 13.887C3.87063 13.7724 3.66749 13.5555 3.5721 13.2366C3.54888 11.0217 3.54888 8.80689 3.5721 6.59205C3.66853 6.395 3.81363 6.25437 4.0074 6.17017Z'
                      fill='#333333'
                    />
                    <path
                      opacity='0.983'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M13.2022 17.9805C10.927 17.9805 8.65177 17.9805 6.37659 17.9805C6.24085 17.9063 6.16538 17.789 6.15023 17.6289C6.12701 17.3594 6.12701 17.0899 6.15023 16.8203C6.17646 16.6182 6.28671 16.4951 6.48106 16.4512C7.11706 16.5147 7.64521 16.3096 8.06557 15.8359C8.21291 15.6242 8.30575 15.3898 8.34416 15.1328C8.35576 14.7461 8.36739 14.3594 8.37899 13.9727C9.11096 14.7404 9.99898 15.0334 11.043 14.8516C11.0452 15.621 11.4051 16.1308 12.1226 16.3809C12.4459 16.4226 12.7709 16.446 13.0977 16.4512C13.2508 16.4768 13.3495 16.5647 13.3937 16.7148C13.4169 17.043 13.4169 17.3711 13.3937 17.6992C13.3504 17.8074 13.2865 17.9011 13.2022 17.9805Z'
                      fill='#333333'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2391_11606'>
                      <rect width='17.83' height='18' fill='white' transform='translate(0.890625)' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div className='flex items-end justify-between gap-4'>
              <h3 className='text-[18px] text-gray-400'>{formatDateTime(new Date().getTime())}</h3>

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
        </section>

        <section className='grid grid-cols-2 gap-10'>
          <div className='flex flex-col gap-4 rounded-xl bg-[var(--secondary-color)] p-6'>
            <header className='flex items-center justify-between'>
              <h3 className='text-[20px] font-medium leading-[36px] text-white'>Popular Dishes</h3>
              <Link className='text-[16px] font-normal leading-6 text-[#EA7C69] underline' href={'/'}>
                See All
              </Link>
            </header>
            <aside className='flex h-[300px] flex-col gap-4 overflow-y-auto overflow-x-hidden'>
              {dashboard?.result?.top_selling_items?.map(function (topSellingItem: TopSellingItem, index: number) {
                return (
                  <div className='flex items-center justify-between rounded-xl bg-[#262728] p-1' key={index}>
                    <div className='flex items-start gap-4'>
                      <div className='h-[60px] w-[90px] rounded-md bg-slate-400'>
                        <Image
                          src={topSellingItem.image}
                          className='h-full w-full rounded-md object-cover'
                          width={90}
                          height={60}
                          alt=''
                        />
                      </div>
                      <div className='flex flex-col gap-1 p-1'>
                        <h2 className='text-[16px] text-white'>{topSellingItem.name}</h2>
                        <p className='text-[14px] font-normal leading-[21px] text-gray-300'>
                          Price : ${topSellingItem.price}
                        </p>
                      </div>
                    </div>

                    <div className='mr-2 flex flex-col gap-2'>
                      <h2 className='text-[14px] text-[#EA7C69]'>Quantity Sold</h2>
                      <p className='text-[14px] font-medium text-gray-300'>{topSellingItem.quantity_sold}</p>
                    </div>
                  </div>
                )
              })}
            </aside>
          </div>
          <div className='flex flex-col gap-4 rounded-xl bg-[var(--secondary-color)] p-6'>
            <header className='flex items-center justify-between'>
              <h3 className='text-[20px] font-medium leading-[36px] text-white'>Recent Order</h3>
              <Link className='text-[16px] font-normal leading-6 text-[#EA7C69] underline' href={'/'}>
                See All
              </Link>
            </header>
            <aside className='flex h-[300px] flex-col gap-4 overflow-x-hidden overflow-y-scroll'>
              {dashboard?.result?.recent_orders?.map(function (recentOrder: RecentOrder, index: number) {
                return (
                  <div className='flex items-center justify-between rounded-xl bg-[#262728] p-1' key={index}>
                    <div className='flex items-start gap-4'>
                      <div className='flex flex-col gap-1 p-1'>
                        <h2 className='text-[16px] text-white'>Table {recentOrder.table_number}</h2>
                        <p className='text-[14px] font-normal leading-[21px] text-gray-300'>
                          Order Status : {recentOrder.order_status}
                        </p>
                      </div>
                    </div>

                    <div className='mr-2 flex flex-col gap-2'>
                      <h2 className='text-[14px] text-[#EA7C69]'>In Stock</h2>
                      <p className='text-[14px] font-medium text-gray-300'>$ {recentOrder.total_price}</p>
                    </div>
                  </div>
                )
              })}
            </aside>
          </div>
        </section>

        <section>
          <DashboardChart chartData={dashboard?.result?.chart_data} />
        </section>
      </div>
    )
  }
}
