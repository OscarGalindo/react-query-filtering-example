import React from 'react'
import {User, UserStatus} from "../domain/dto/user";
import {useModal} from "react-modal-hook";
import {FiltersDialog} from "../components/users/filters.dialog";
import {onApproveUser, useBlockUser, useFetchUsers} from "../domain/user.service";
import {useFilters} from "../hooks/filters.hook";
import {UserRowStatusBadge} from "../components/users/statusBadge";
import {isEmpty, toPairs} from "ramda";

const UserRow = ({
                   user,
                   onRemove,
                   onApprove
                 }: { user: User, onRemove: (id: string) => void, onApprove: (id: string) => void }) => <tr>
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full"
             src={user.avatar}
             alt=""/>
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">
          {user.name}
        </div>
        <div className="text-sm text-gray-500">
          {user.email}
        </div>
      </div>
    </div>
  </td>
  <td className="px-6 py-4 whitespace-nowrap">
    {user.username}
  </td>
  <td className="px-6 py-4 whitespace-nowrap">
    <UserRowStatusBadge status={user.status}/>
  </td>
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {user.city}
  </td>
  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <div className="h-full  flex flex-row space-x-6 items-center justify-end">
      <div className="w-5 h-5 cursor-pointer text-gray-500 hover:text-green-500" onClick={() => onApprove(user.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"/>
        </svg>
      </div>
      <div className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => onRemove(user.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  </td>
</tr>;

export const FilterValues = ({filterKey, values}: { values: string[], filterKey: string }) => {
  switch (filterKey) {
    case "city":
      return <span>{values.join(" ")}</span>;
    case "status":
      return <>{values.map(status => <UserRowStatusBadge status={status as UserStatus}/>)}</>;
    default:
      return null;
  }
};

const ActiveFilters = ({filters}) => {
  return <div className="flex flex-row space-x-12">
    {toPairs(filters).map(([key, values]) => {
      if(isEmpty(values)) return null;

      return <div className="flex flex-row items-center space-x-4 rounded-lg px-4 py-1 border bg-gray-50">
        <div className="capitalize text-sm text-gray-400">{key}</div>
        <div className="flex flex-row items-center space-x-4 capitalize text-gray-800">
          <FilterValues filterKey={key} values={values as any}/>
        </div>
      </div>
    })}
  </div>
};

export default function Users() {
  const filters = useFilters(["city", "status"]);
  const users = useFetchUsers(filters.current);
  const removeUserMutation = useBlockUser(filters.current);
  const approveUserMutation = onApproveUser(filters.current);

  const [showFilters, hideFilters] = useModal(() => <FiltersDialog closeAfterApply onClose={hideFilters}
                                                                   onApply={filters.apply}
                                                                   currentFilters={filters.current}/>, [filters.current])

  if (users.isLoading) {
    return <div className="w-full min-h-screen flex items-center justify-center">
      Loading
    </div>
  }

  if (users.isError) {
    return <div className="w-full min-h-screen flex items-center justify-center">
      <h2>Error!</h2>
    </div>
  }

  return (
    <React.Fragment>
      <div className="container mx-auto py-10 space-y-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl capitalize">Users list</h1>

          <div
            onClick={showFilters}
            className="bg-gray-50 text-gray-500 hover:bg-gray-100 px-4 py-2 shadow rounded cursor-pointer flex items-center justify-between space-x-2">
            <div className="w-4 h-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </div>
            <span>Filters</span>
          </div>
        </div>
        {!filters.isEmpty && <div>
          <ActiveFilters filters={filters.current}/>
        </div>}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.data.map(user => <UserRow user={user} key={user.id} onRemove={removeUserMutation.mutate}
                                                 onApprove={approveUserMutation.mutate}/>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
