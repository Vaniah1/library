import {Modal} from "../../../../components/Modal/Modal"
import {useSelector,useDispatch} from "react-redux"
import React,{ useState, useEffect } from "react"
import {AppDispatch, Rootstate} from "../../../../redux/ReduxStore"
import {setDisplayLogin} from "../../../../redux/slices/ModalSlice"
import LoginForm from "../../../authentication/components/LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"


export const LoginRegisterModal:React.FC = () =>{
    const authState = useSelector((state:Rootstate)=> state.authentication)
    const dispatch:AppDispatch =useDispatch()
    const [login, setLogin] = useState<boolean>(true)

    const closeModal =() =>{
        dispatch(setDisplayLogin(false))
    }
    //toggle login
    const toggleLogin = () =>{
        setLogin(!login)
    }

    useEffect(()=>{
        if (authState.loggedInUser){
            closeModal()
        }
        return(()=>{
            if(authState.loggedInUser){
                localStorage.setItem("userId", authState.loggedInUser._id)
            }
        }

        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState.loggedInUser])


    return(
        <Modal
        content={login ? <LoginForm toggleRegister={toggleLogin} /> : <RegisterForm toggleLogin={toggleLogin}/>}
        toggleModal={closeModal}
        />
    )
}