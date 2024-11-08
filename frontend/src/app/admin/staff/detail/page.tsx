import Image from 'next/image'
import Link from 'next/link'
import { orderIcon } from '~/assets/images'
import { Button } from '~/components/ui/button'

export default function Page() {
  return (
    <main className='flex w-full items-start gap-10'>
      {/* profile-image-begin */}
      <section className='flex flex-[0.3] flex-col'>
        <header>
          <h3 className='text-[24px] leading-8'>Profile Image</h3>
        </header>
        <div className='mt-10 h-[300px] w-full rounded-xl bg-[rgb(31,29,43)]'>
          <Image className='h-full w-full rounded-xl object-contain' src={orderIcon.bakery} alt='' />
        </div>
        <Link className='mt-4 text-[#EA7C69]' href={''}>
          Change profile picture
        </Link>
        <Button className='mt-4 h-14 cursor-pointer rounded-xl bg-[#EA7C69] text-[20px] text-white'>
          Edit profile
        </Button>
        <Button className='mt-4 h-14 cursor-pointer rounded-xl border-[1px] border-solid border-[#EA7C69] bg-transparent text-[20px] text-[#EA7C69]'>
          Delete profile
        </Button>
      </section>
      {/* profile-image-end */}
      {/* profile-infomation-begin */}
      <section className='flex flex-1 flex-col gap-10'>
        <div className='flex flex-col gap-8'>
          <header className='text-[24px] font-medium leading-6'>Employee Personal Details</header>
          <aside className='grid grid-cols-3 gap-8 rounded-lg bg-[rgb(31,29,43)] p-6'>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
          </aside>
        </div>
        <div className='flex flex-col gap-8'>
          <header className='text-[24px] font-medium leading-6'>Employee Personal Details</header>
          <aside className='grid grid-cols-3 gap-8 rounded-lg bg-[rgb(31,29,43)] p-6'>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
            <div className='flex flex-col'>
              <header className='text-[12px] font-normal text-[#EA7C69]'>Full Name</header>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-6 text-white'>
                Nguyen Duy Khanh
              </h3>
            </div>
          </aside>
        </div>
      </section>
      {/* profile-infomation-end */}
    </main>
  )
}
