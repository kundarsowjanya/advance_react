import { createContext, useContext, useReducer } from "react";

const FakeAuthContext=createContext()

const initialState={
    user:null,
    isAuthenticated:false
}

function reducer(state,action){
  switch(action.type){
   case "login":
    return {...state,user:action.paylaod,isAuthenticated:true}

   case 'logout':
    return {...state,user:null,isAuthenticated:false}

   default : throw new Error("Incorrect action")
  }
}

const FAKE_USER = {
    name: "Sowj",
    email: "sowj@example.com",
    password: "sowj123",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };


function FakeAuthProvider({children}){

    const [{user,isAuthenticated},dispatch]=useReducer(reducer,initialState)

    function login(email,password){
        if(email===FAKE_USER.email&&password===FAKE_USER.password)
            dispatch({type:"login",paylaod:FAKE_USER})
    }

    function logout(){
        dispatch({type:"logout"})
    }
    return(
        <FakeAuthContext.Provider value={{user,isAuthenticated,login,logout}}>
        {children}
        </FakeAuthContext.Provider>
    )
}

function getAuth(){
  const context=useContext(FakeAuthContext)
   if(context===undefined) throw new Error("AuthContext was used outside AuthProvider")
  return context
}
export {FakeAuthProvider,getAuth};