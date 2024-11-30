import { Ingredient } from '~/definitions/types'
import { Button } from './ui/button'

type Props = {
  ingredient: Ingredient
}
export default function Inventory({ ingredient }: Props) {
  return (
    <div className='flex flex-col gap-3 rounded-lg bg-[#1F1D2B] px-2 py-6'>
      <div className='flex flex-col'>
        <h2>{ingredient?.name}</h2>
        <p className='text-gray-500'>$ {ingredient?.price}</p>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Button className='flex h-6 w-6 items-center justify-center rounded-full p-2'>
          <span>-</span>
        </Button>
        <p>{ingredient?.stock}</p>
        <Button className='flex h-6 w-6 items-center justify-center rounded-full p-2'>
          <span>+</span>
        </Button>
      </div>
    </div>
  )
}
