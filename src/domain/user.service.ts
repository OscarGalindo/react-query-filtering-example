import {User, UserStatus} from "../pages/dto/user";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {FilterMap} from "../hooks/filters.hook";
import {useToasts} from 'react-toast-notifications'
import {adjust, findIndex, propEq} from "ramda";

export const fetchUsers = async (filters: FilterMap): Promise<User[]> => {
  const res = await axios.get('api/users', {params: filters})
  return res.data;
}

export const blockUser = async (userId: string): Promise<User[]> => {
  const res = await axios.post(`api/users/${userId}/block`)
  return res.data;
}

export const approveUser = async (userId: string): Promise<User[]> => {
  const res = await axios.post(`api/users/${userId}/approve`)
  return res.data;
}

export const useFetchUsers = (filters: FilterMap) => {
  return useQuery(
    ["users", filters],
    () => fetchUsers(filters)
  )
}

export const useBlockUser = (filters: FilterMap) => {
  const queryClient = useQueryClient();
  const {addToast} = useToasts()
  return useMutation(
    (id: string) => blockUser(id),
    {
      onMutate: async userId => {
        await queryClient.cancelQueries(["users", filters])
        const previousUsers = queryClient.getQueryData(["users", filters])
        queryClient.setQueryData(["users", filters], (old: User[]) => {
          const indexOfUser = findIndex(propEq('id', userId), old);
          return adjust(indexOfUser, user => ({...user, status: UserStatus.Blocked}), old);
        })
        return previousUsers
      },
      onError: (err, newTodo, context: User[]) => {
        addToast("A failure while blocking user, rolling back.", {appearance: 'error'})
        queryClient.setQueryData(["users", filters], context)
      },
      onSuccess: () => {
        addToast("User blocked successfully.", {appearance: 'success'})
      },
      onSettled: () => {
        queryClient.invalidateQueries(["users", filters])
      }
    }
  )
}

export const onApproveUser = (filters: FilterMap) => {
  const queryClient = useQueryClient();
  const {addToast} = useToasts()
  return useMutation(
    (id: string) => approveUser(id),
    {
      onMutate: async userId => {
        await queryClient.cancelQueries(["users", filters])
        const previousUsers = queryClient.getQueryData(["users", filters])
        queryClient.setQueryData(["users", filters], (old: User[]) => {
          const indexOfUser = findIndex(propEq('id', userId), old);
          return adjust(indexOfUser, user => ({...user, status: UserStatus.Active}), old);
        })
        return previousUsers
      },
      onError: (err, newTodo, context: User[]) => {
        addToast("A failure while approving user, rolling back.", {appearance: 'error'})
        queryClient.setQueryData(["users", filters], context)
      },
      onSuccess: () => {
        addToast("User approved successfully.", {appearance: 'success'})
      },
      onSettled: () => {
        queryClient.invalidateQueries(["users", filters])
      }
    }
  )
}

