export default function Food() {
  return (
    <div className='flex w-full items-center justify-between gap-1 rounded-xl bg-[#3D4142] px-4 py-3'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69] p-1'>01</div>
      <p className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>
        Chicken Parmesan <span>x 2</span>
      </p>
      <p>$ 55.00</p>
    </div>
  )
}
