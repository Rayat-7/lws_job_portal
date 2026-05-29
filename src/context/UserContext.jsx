import React, { useEffect, useState } from 'react'
import { userContext } from './userContext'

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUserData() {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const response = await fetch('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                    console.log('User Data :', data)
                }
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }

        fetchUserData()
    }, [])

    return <userContext.Provider value={user}>{children}</userContext.Provider>
}