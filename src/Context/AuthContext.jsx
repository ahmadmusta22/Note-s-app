import { createContext, useEffect, useState } from "react";

 export let auth = createContext(null)

export default  function AuthContextProvider ({children}){


   let [isLogin,setLogin] = useState(null)


   useEffect(()=>{
    if(localStorage.getItem('userToken')){
    setLogin(localStorage.getItem('userToken'))
    }
   },[])



    return<auth.Provider value={{isLogin,setLogin}}>
        {children}
         </auth.Provider>
}