import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
  name: string
  image: StaticImageData
  redirect: string
}

export default function SidebarOption({ className, name, image, redirect }: Props) {
  return (
    <Link
      href={redirect}
      className='flex flex-col items-center justify-center gap-2 rounded-md p-2 hover:bg-[#EB966A30]'
    >
      <Image width={24} height={24} src={image} alt={name} />
      <span className='text-base font-normal text-gray-200'>{name}</span>
    </Link>
  )
}
