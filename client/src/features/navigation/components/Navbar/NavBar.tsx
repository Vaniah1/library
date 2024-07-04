import React,{useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, Rootstate } from '../../../../redux/ReduxStore'
import { Link, useNavigate } from 'react-router-dom'
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice'

const NavBar:React.FC = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const authState = useSelector((state:Rootstate) => state.authentication)
    const dispatch:AppDispatch = useDispatch()

    const handleEnterKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter" && searchRef.current && searchRef.current.value.length > 0) {
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
            searchRef.current.value = " ";
        }
    }

    const handleSearchIconClicked = () => {
        if(searchRef &&searchRef.current && searchRef.current.value.length > 0){
             navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
            searchRef.current.value = " ";
        }
    }
    const navigateToProfile = () => {
      if(authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`)
    }
  
    const toggleLogin = () =>{
      dispatch(setDisplayLogin(true))
    }

    
  return (
    <nav className="h-[100px] w-[100%] ">
      <Link to="/" className="">
        <Book sx={{
          fontSize:"3rem"
        }} />
      </Link>
    </nav>
  )
}

export default NavBar
