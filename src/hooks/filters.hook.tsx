import {useRouter} from "next/router";
import {anyPass, flatten, fromPairs, isEmpty, isNil, mergeDeepRight, not, pick, reject, toPairs} from "ramda";
import {useEffect, useState} from "react";

export interface FilterMap {
  [key: string]: string | string[];
}

export const useFilters = (keys: string[]) => {
  const router = useRouter();
  const initialFilter = keys.reduce((old, curr) => ({...old, [curr]: []}), {});
  const [filters, setFilters] = useState<FilterMap>(mergeDeepRight(initialFilter, {}));

  useEffect(() => {
    const routeFilters = fromPairs(toPairs(router.query).map(([key, value]) => [key, flatten([value])]));
    updateFilters(routeFilters);
  }, [router.query]);

  const updateFilters = (newFilters: FilterMap): FilterMap => {
    const focusFields = pick(keys, newFilters) as FilterMap;
    const sanitizedFilters = fromPairs(toPairs(focusFields).filter(([_, value]) => not(isNil(value) || isEmpty(value))));
    setFilters(mergeDeepRight(initialFilter, sanitizedFilters));
    return sanitizedFilters;
  }

  const allFieldsAreEmpty = (filters: FilterMap): boolean =>  toPairs(filters).reduce((old, [_, value]) => isEmpty(value), false);

  return {
    apply: (newFilters) => {
      const updatedFilters = updateFilters(newFilters);
      router.push({
        pathname: router.pathname,
        query: updatedFilters
      });
    },
    current: filters,
    isEmpty: allFieldsAreEmpty(filters),
  }
};