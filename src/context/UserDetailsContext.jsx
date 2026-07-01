import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import fetchUserData from "../api/fetchUserData";

const UserDetailsContext = createContext();

export default UserDetailsProvider = ({children}) =>{
    const {data: userData, isLoading, error} = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserData,
        staleTime: 5 * 60 * 1000,
    })
    return (
        <UserDetailsContext.Provider value={{userData, isLoading, error}}>
            {children}
        </UserDetailsContext.Provider>
    )
}
export const useUser = () => useContext(UserDetailsContext);