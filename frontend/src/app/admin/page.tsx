import { redirect } from 'next/navigation'

function AdminRootPage() {
  redirect('/admin/table')
}

export default AdminRootPage
