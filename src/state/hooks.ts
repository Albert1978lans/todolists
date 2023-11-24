import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppRootStateType, AppDispatch } from './store'

// Используйте во всем приложении вместо простых `useDispatch` и `useSelector`

type DispatchFunc = () => AppDispatch

export const useAppDispatch: DispatchFunc = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector