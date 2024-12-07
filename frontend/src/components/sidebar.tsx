'use client'

import usePermissions from '~/hooks/usePermissions'
import { adminRoutes, employeeRoutes } from '~/routers'
import ButtonLogout from './button-logout'
import SidebarOption from './side-option'
import useAuthStore from '~/stores/auth.store'

export default function Sidebar() {
  const { isAdmin } = usePermissions()
  const { permissions } = useAuthStore()
  const routes = isAdmin ? adminRoutes : employeeRoutes

  return (
    <main className='sticky bottom-0 left-0 top-0 z-10 h-screen min-w-[110px] overflow-y-auto overflow-x-hidden rounded-br-[30px] rounded-tr-[30px] bg-[var(--secondary-color)] shadow-border'>
      <aside className='flex h-full flex-col items-center justify-between gap-4 p-2'>
        <section className='mt-6 rounded-[12px] bg-[#EB966A30] p-3'>
          <svg width={40} height={40} viewBox='0 0 60 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M50.4154 0.617188H9.58203C4.75786 0.617188 0.832031 4.30266 0.832031 8.83147V16.583C0.832031 19.4662 1.9462 22.0866 3.7487 24.1018V49.9029C3.7487 50.6291 4.05599 51.3255 4.60297 51.839C5.14995 52.3525 5.89182 52.641 6.66536 52.641H29.9987C30.7722 52.641 31.5141 52.3525 32.0611 51.839C32.6081 51.3255 32.9154 50.6291 32.9154 49.9029V36.2124H44.582V49.9029C44.582 50.6291 44.8893 51.3255 45.4363 51.839C45.9833 52.3525 46.7251 52.641 47.4987 52.641H53.332C54.1056 52.641 54.8474 52.3525 55.3944 51.839C55.9414 51.3255 56.2487 50.6291 56.2487 49.9029V24.0991C58.0512 22.0866 59.1654 19.4662 59.1654 16.5803V8.83147C59.1654 4.30266 55.2395 0.617188 50.4154 0.617188ZM53.332 8.83147V16.583C53.332 19.7044 50.8558 22.3659 47.8166 22.5165L47.4987 22.5219C44.2816 22.5219 41.6654 20.0659 41.6654 17.0458V6.09338H50.4154C52.0254 6.09338 53.332 7.32278 53.332 8.83147ZM24.1654 17.0458V6.09338H35.832V17.0458C35.832 20.0659 33.2158 22.5219 29.9987 22.5219C26.7816 22.5219 24.1654 20.0659 24.1654 17.0458ZM6.66536 8.83147C6.66536 7.32278 7.97203 6.09338 9.58203 6.09338H18.332V17.0458C18.332 20.0659 15.7158 22.5219 12.4987 22.5219L12.1808 22.5137C9.14161 22.3659 6.66536 19.7044 6.66536 16.583V8.83147ZM24.1654 38.9505H12.4987V30.7362H24.1654V38.9505Z'
              fill='url(#paint0_linear_2049_3223)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_2049_3223'
                x1='29.9987'
                y1='0.617187'
                x2='29.9987'
                y2='52.641'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#EA9769' />
                <stop offset={1} stopColor='#EA6969' />
              </linearGradient>
            </defs>
          </svg>
        </section>
        <section className='flex-1 items-start'>
          {routes.map(function (publicRoute, index: number) {
            return (
              permissions.includes(publicRoute.key) && (
                <SidebarOption
                  key={index}
                  image={publicRoute.image}
                  name={publicRoute.name}
                  redirect={publicRoute.redirect}
                />
              )
            )
          })}
        </section>

        <ButtonLogout>
          <section className='flex w-full flex-col items-center justify-center gap-2 rounded-md p-2 hover:bg-slate-800'>
            <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20.3443 17.1563H18.6966C18.5841 17.1563 18.4786 17.2055 18.4083 17.2922C18.2443 17.4914 18.0685 17.6836 17.8833 17.8664C17.1261 18.6245 16.229 19.2286 15.2419 19.6453C14.2192 20.0773 13.1201 20.2989 12.0099 20.2969C10.8872 20.2969 9.79974 20.0766 8.77787 19.6453C7.79074 19.2286 6.89374 18.6245 6.13646 17.8664C5.37782 17.111 4.77291 16.2155 4.35521 15.2297C3.92162 14.2078 3.70365 13.1227 3.70365 12C3.70365 10.8774 3.92396 9.79222 4.35521 8.77035C4.7724 7.78363 5.3724 6.89535 6.13646 6.13363C6.90052 5.37191 7.7888 4.77191 8.77787 4.35472C9.79974 3.92347 10.8872 3.70316 12.0099 3.70316C13.1326 3.70316 14.2201 3.92113 15.2419 4.35472C16.231 4.77191 17.1193 5.37191 17.8833 6.13363C18.0685 6.31879 18.2419 6.51097 18.4083 6.70785C18.4786 6.79457 18.5865 6.84379 18.6966 6.84379H20.3443C20.4919 6.84379 20.5833 6.67972 20.5013 6.5555C18.7036 3.76175 15.5583 1.91254 11.9841 1.92191C6.36849 1.93597 1.86615 6.49457 1.9224 12.1032C1.97865 17.6227 6.47396 22.0782 12.0099 22.0782C15.5747 22.0782 18.706 20.2313 20.5013 17.4446C20.581 17.3203 20.4919 17.1563 20.3443 17.1563ZM22.4279 11.8524L19.1021 9.22738C18.9779 9.12894 18.7974 9.21801 18.7974 9.37504V11.1563H11.438C11.3349 11.1563 11.2505 11.2407 11.2505 11.3438V12.6563C11.2505 12.7594 11.3349 12.8438 11.438 12.8438H18.7974V14.625C18.7974 14.7821 18.9802 14.8711 19.1021 14.7727L22.4279 12.1477C22.4503 12.1302 22.4684 12.1077 22.4809 12.0822C22.4933 12.0566 22.4998 12.0285 22.4998 12C22.4998 11.9716 22.4933 11.9435 22.4809 11.9179C22.4684 11.8923 22.4503 11.8699 22.4279 11.8524Z'
                fill='#EA7C69'
              />
            </svg>

            <span className='text-base font-normal text-gray-200'>Logout</span>
          </section>
        </ButtonLogout>
      </aside>
    </main>
  )
}
