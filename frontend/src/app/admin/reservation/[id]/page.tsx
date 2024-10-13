import Image from 'next/image'
import React from 'react'
import TempImage from '~/assets/images/temp.jpg'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

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
        <Table className='overflow-hidden rounded-[10px] bg-[#1F1D2B]'>
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
        <Table className='overflow-hidden rounded-[10px] bg-[#1F1D2B]'>
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
    </div>
  )
}

export default ReservationDetailPage
