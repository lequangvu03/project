import Image from 'next/image'
import TempImage from '~/assets/images/temp.jpg'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import SheetReservation from '../sheet-reservation'

type Props = {
  params: {
    id: string
  }
}
function ReservationDetailPage({ params }: Props) {
  const { id } = params
  return (
    <div>
      <div className='relative overflow-hidden rounded-[10px] pt-[30%]'>
        <Image src={TempImage} alt='detail reservation' className='absolute left-0 right-0 top-0 w-full' />
        <h4 className='absolute bottom-[2vw] left-[2vw] text-[2vw] font-semibold text-black'>Table #01</h4>
      </div>
      <div className='mt-8'>
        <h2 className='mb-4 text-xl font-medium'>Reservation Details {id}</h2>
        <Table className='overflow-hidden rounded-[10px] bg-[var(--secondary-color)]'>
          <TableBody>
            <TableRow className='[&>td]:p-6'>
              <TableCell className='font-medium'>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Table Number</h5>
                  <p>01</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Pax Number</h5>
                  <p>05 persons</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Reservation Date</h5>
                  <p>28. 03. 2024</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Deposit Fee</h5>
                  <p>60$</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Status</h5>
                  <p>Confirmed</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='mt-8'>
        <h2 className='mb-4 text-xl font-medium'>Customer Infor</h2>
        <Table className='overflow-hidden rounded-[10px] bg-[var(--secondary-color)]'>
          <TableBody>
            <TableRow className='[&>td]:p-6'>
              <TableCell className='font-medium'>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Table Number</h5>
                  <p>01</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Pax Number</h5>
                  <p>05 persons</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Reservation Date</h5>
                  <p>28. 03. 2024</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Deposit Fee</h5>
                  <p>60$</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <h5 className='text-[var(--primary-color)]'>Status</h5>
                  <p>Confirmed</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='!mt-9 flex items-center justify-end gap-5'>
        <Button className='h-auto bg-transparent px-12 py-3 text-base text-white underline transition-all hover:bg-transparent hover:text-[var(--primary-color)]'>
          Edit Reservation
        </Button>
        <SheetReservation>
          <Button className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[#FAC1D9] hover:text-black hover:shadow-md hover:shadow-[#FAC1D9]'>
            Edit Reservation
          </Button>
        </SheetReservation>
      </div>
    </div>
  )
}

export default ReservationDetailPage
