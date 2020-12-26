import {useRouter} from "next/router";
import {fromPairs, isEmpty, isNil, mergeDeepRight, not, pick, toPairs} from "ramda";

export interface FilterMap {
  [key: string]: string | string[];
}

export const useFilters = (keys: string[]) => {
  const router = useRouter();

  const currentFilters = (filters) =>
    fromPairs(
      toPairs(pick(keys, filters) as FilterMap)
        .filter(([key, value]) => not(isNil(value) || isEmpty(value))))

  return {
    apply: (filters) => {
      router.push({
        pathname: router.pathname,
        query: currentFilters(filters)
      });
    },
    current: mergeDeepRight(keys.reduce((old, curr) => ({...old, [curr]: []}), {}), currentFilters(router.query)),
  }
};