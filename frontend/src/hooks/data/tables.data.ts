import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import tablesServices from '~/services/tables.services'

export const useGetTablesQuery = function () {
  return useQuery({
    queryKey: ['TABLES'],
    queryFn: tablesServices.getTables
  })
}

export const useGetTableByIdQuery = function (id: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['TABLES', id],
    queryFn: () => tablesServices.getTableById(id),
    enabled: enabled
  })
}

export const useAddTableQuery = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tablesServices.addTable,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['TABLES']
      })
    }
  })
}

export const useUpdateTableQuery = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tablesServices.updateTable,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['TABLES']
      })
    }
  })
}

export const useDeleteTableQuery = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tablesServices.deleteTable,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['TABLES']
      })
    }
  })
}
