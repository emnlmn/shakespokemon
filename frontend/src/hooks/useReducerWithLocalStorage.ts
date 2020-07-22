import { useReducer, useEffect, Reducer } from 'react'

const useReducerWithLocalStorage = (reducer: Reducer<any, any>, defaultState: Object, storageKey: string) => {
  const localData = localStorage.getItem(storageKey);

  const hookVars = useReducer(reducer, defaultState, (defaultState) => localData
    ? JSON.parse(localData)
    : defaultState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]))
  }, [storageKey, hookVars[0]])

  return hookVars
}

export default useReducerWithLocalStorage;