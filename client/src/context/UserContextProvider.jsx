import { FirstNameContext,EmailContext,RoleContext} from "./Context";
import {useState} from "react";
export function UserContextProvider({children}){
    const [firstname,setFirstname]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");

 return(
    <FirstNameContext.Provider value={{firstname,setFirstname}}>
    <EmailContext.Provider value={{email,setEmail}}>
    <RoleContext.Provider value={{role,setRole}}>
    {children}
    </RoleContext.Provider>
    </EmailContext.Provider></FirstNameContext.Provider>
 )
}
