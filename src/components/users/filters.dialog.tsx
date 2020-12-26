import React from "react"
import {createPortal} from "react-dom";
import {useForm} from "react-hook-form";
import {Modal} from "../modal/modal";
import {useFetchFilterData} from "../../domain/filters.service";

export const FiltersDialog = ({onClose, onApply, currentFilters, closeAfterApply}) => {
  const modalElement = document.getElementById("modal");
  const filters = useFetchFilterData();
  const {register, handleSubmit} = useForm();

  if (filters.isLoading) {
    return <div className="w-full min-h-screen flex items-center justify-center">
      Loading
    </div>
  }

  const onSubmit = data => {
    onApply(data);
    if (closeAfterApply) onClose()
  };
  const onReset = () => {
    onApply({});
    if (closeAfterApply) onClose()
  }

  return createPortal(
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex justify-between items-center w-full border-b border-gray-200 pb-8">
          <span className="font-bold">User filters</span>
          <span className="w-4 h-4 cursor-pointer" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex flex-row">
            <div className="w-1/3 flex flex-col">
              <span>Status</span>
              <span className="text-gray-400 text-sm">Filter by user status</span>
            </div>
            <div className="w-2/3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-300" id="active" value="active"
                       defaultChecked={currentFilters.status.indexOf("active") > -1} name="status"
                       ref={register}/>
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-300" id="pending" value="pending"
                       defaultChecked={currentFilters.status.indexOf("pending") > -1} name="status"
                       ref={register}/>
                <label htmlFor="pending">Pending</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-300" id="blocked" value="blocked"
                       defaultChecked={currentFilters.status.indexOf("blocked") > -1} name="status"
                       ref={register}/>
                <label htmlFor="blocked">Blocked</label>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="w-1/3 flex flex-col">
              <span>City</span>
              <span className="text-gray-400 text-sm">Filter by user city</span>
            </div>
            <div className="w-2/3">
              <select
                name={"city"}
                ref={register}
                defaultValue={currentFilters.city}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option disabled value="">Select a city to filter</option>
                {filters.data.cities.map(city => <option value={city} key={city}>{city}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onReset}
            className="border border-red-100 text-red-500 hover:bg-red-100 px-4 py-2 shadow rounded cursor-pointer flex items-center justify-between space-x-2">
            Reset filters
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-blue-100 hover:bg-blue-600 px-4 py-2 shadow rounded cursor-pointer flex items-center justify-between space-x-2">
            Apply filter
          </button>
        </div>
      </form>
    </Modal>,
    modalElement
  )
}