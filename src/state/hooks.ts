// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
//
// import type { AppRootStateType, AppDispatch } from './store'
//
// // Используйте во всем приложении вместо простых `useDispatch` и `useSelector`
//
// type DispatchFunc = () => AppDispatch
//
// export const useAppDispatch: DispatchFunc = useDispatch
//
// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, AppRootStateType } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// export const useAppStore: () => AppStore = useStore

