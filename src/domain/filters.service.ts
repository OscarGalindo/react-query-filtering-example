import {useQuery} from "react-query";
import axios from "axios";

export interface UserFilters {
  cities: string[];
}

export const fetchFilters = async (): Promise<UserFilters> => {
  const res = await axios.get('api/users/filters')

  return res.data;
}
export const useFetchFilterData = () => {
  return useQuery(
    ["filters"],
    () => fetchFilters()
  )
}