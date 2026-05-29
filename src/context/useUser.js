import { useContext } from 'react'
import { userContext } from './userContext'

export function useUser() {
    return useContext(userContext)
}