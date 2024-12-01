import { Ingredient } from '~/definitions/types'
import { Button } from './ui/button'

type Props = {
  ingredient: Ingredient
  onAdd: () => void
  onRemove: () => void
}
export default function Inventory({ ingredient, onAdd, onRemove }: Props) {
  return (
    <div className='flex flex-col gap-3 rounded-lg bg-[#1F1D2B] px-2 py-6'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <h2>{ingredient?.name}</h2>
          <p className='text-gray-500'>$ {ingredient?.price}</p>
        </div>
        <p>{ingredient?.stock}</p>
      </div>

      <div className='flex items-center justify-end gap-2'>
        <Button onClick={onRemove} className='flex h-6 w-6 items-center justify-center rounded-full p-2'>
          <span>-</span>
        </Button>
        <Button onClick={onAdd} className='flex h-6 w-6 items-center justify-center rounded-full p-2'>
          <span>+</span>
        </Button>
      </div>
    </div>
  )
}
