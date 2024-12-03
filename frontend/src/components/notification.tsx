import { NotificationType } from '~/definitions/types'
import { Button } from './ui/button'
import { formatDateTime } from '~/utils/format-datetime'
import { useMarkAllAsReadMutation, useReadNotificationMutation } from '~/hooks/data/notifications.data'
import { useRouter } from 'next/navigation'

type Props = {
  notification: NotificationType
}

export default function Notification({ notification }: Props) {
  const isRead = notification.status === 1
  const router = useRouter()
  const useReadNotification = useReadNotificationMutation()

  const handleClick = async (id: string, orderId?: string) => {
    await useReadNotification.mutateAsync(id)
    if (orderId) {
      router.replace(`/admin/order/${orderId}`)
    }
  }
  return (
    <div
      onClick={() => notification._id && handleClick(notification._id, notification.orderId)}
      className='flex h-[90px] w-full cursor-pointer items-center gap-4 border-[0.15px] border-b-gray-800 px-4 py-2'
    >
      <section className='flex h-[50px] w-[50px] items-center justify-center rounded-sm bg-[#EA7C69]'>
        <svg width='20' height='20' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clip-path='url(#clip0_158_11204)'>
            <path
              d='M16.6232 3.93359L27.4157 22.6261C27.5803 22.9111 27.6669 23.2345 27.6669 23.5636C27.6669 23.8927 27.5803 24.216 27.4157 24.5011C27.2512 24.7861 27.0145 25.0228 26.7295 25.1874C26.4444 25.3519 26.1211 25.4386 25.792 25.4386H4.20698C3.87786 25.4386 3.55453 25.3519 3.2695 25.1874C2.98447 25.0228 2.74778 24.7861 2.58322 24.5011C2.41866 24.216 2.33203 23.8927 2.33203 23.5636C2.33203 23.2345 2.41867 22.9111 2.58323 22.6261L13.3757 3.93359C14.097 2.68359 15.9007 2.68359 16.6232 3.93359ZM14.9995 18.7486C14.668 18.7486 14.35 18.8803 14.1156 19.1147C13.8812 19.3491 13.7495 19.6671 13.7495 19.9986C13.7495 20.3301 13.8812 20.6481 14.1156 20.8825C14.35 21.1169 14.668 21.2486 14.9995 21.2486C15.331 21.2486 15.6489 21.1169 15.8834 20.8825C16.1178 20.6481 16.2495 20.3301 16.2495 19.9986C16.2495 19.6671 16.1178 19.3491 15.8834 19.1147C15.6489 18.8803 15.331 18.7486 14.9995 18.7486ZM14.9995 9.99859C14.6933 9.99863 14.3978 10.111 14.169 10.3145C13.9402 10.5179 13.7941 10.7983 13.7582 11.1023L13.7495 11.2486V16.2486C13.7498 16.5672 13.8718 16.8736 14.0905 17.1053C14.3093 17.337 14.6082 17.4764 14.9262 17.4951C15.2443 17.5137 15.5575 17.4103 15.8018 17.2058C16.0461 17.0013 16.2031 16.7112 16.2407 16.3948L16.2495 16.2486V11.2486C16.2495 10.9171 16.1178 10.5991 15.8834 10.3647C15.6489 10.1303 15.331 9.99859 14.9995 9.99859Z'
              fill='#333333'
            />
          </g>
          <defs>
            <clipPath id='clip0_158_11204'>
              <rect width='30' height='30' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </section>
      <section className='flex flex-1 items-center justify-between'>
        <div className='flex flex-col'>
          <h3 className={`text-[16px] font-light ${isRead ? 'text-gray-500' : 'text-gray-300'}`}>
            {notification.title}
          </h3>
          <p className={`text-[16px] font-light ${isRead ? 'text-gray-500' : 'text-gray-300'}`}>
            {notification.message}
          </p>
        </div>
        <p className='text-[16px] font-light text-gray-300'>{formatDateTime(notification.updated_at ?? 0)}</p>
      </section>
    </div>
  )
}
