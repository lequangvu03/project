import Order from '~/components/order'
import { orders } from '~/data/orders'
import { cn } from '~/lib/utils'

export default function Page() {
  return (
    <main className=''>
      <section className={'grid grid-cols-3'}>
        {orders.map(function (order) {
          return <Order />
        })}
      </section>
    </main>
  )
}
