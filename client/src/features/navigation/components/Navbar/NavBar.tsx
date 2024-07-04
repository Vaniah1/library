import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, Rootstate } from '../../../../redux/ReduxStore'
import { Link, useNavigate } from 'react-router-dom'
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice'
import { Book, Search, Menu, Close } from "@mui/icons-material"

const NavBar: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const authState = useSelector((state: Rootstate) => state.authentication)
  const dispatch: AppDispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchRef.current && searchRef.current.value.length > 0) {
          navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
          searchRef.current.value = " ";
      }
  }

  const handleSearchIconClicked = () => {
      if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
          navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
          searchRef.current.value = " ";
      }
  }
  const navigateToProfile = () => {
      if (authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`)
  }

  const toggleLogin = () => {
      dispatch(setDisplayLogin(true))
  }

  return (
      <nav className="relative h-[90px] w-full bg-blue-500 flex items-center justify-between pl-5 pr-3">
          <Link to="/" className="flex items-center justify-start text-white h-fit md:ml-5">
              <Book sx={{ fontSize: "3rem" }} />
              <h1 className="ml-2 text-2xl font-bold">Laibuu</h1>
          </Link>
          <div className="md:hidden">
              {showMenu ? (
                  <Close onClick={() => setShowMenu(!showMenu)} sx={{ fontSize: "2rem", color: "white", cursor: "pointer" }} />
              ) : (
                  <Menu onClick={() => setShowMenu(!showMenu)} sx={{ fontSize: "2rem", color: "white", cursor: "pointer" }} />
              )}
          </div>
          <div className={`fixed top-0 right-0 h-full bg-blue-500 z-50 p-4 transition-transform ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex justify-end">
                  <Close onClick={() => setShowMenu(!showMenu)} sx={{ fontSize: "2rem", color: "white", cursor: "pointer" }} />
              </div>
              <Link to="/catalog" className="block mb-2 font-bold text-white">View Catalog</Link>
              <input className="p-2 mb-2 rounded" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={searchRef} />
              {authState.loggedInUser ? (
                  <div className="text-xl font-bold text-white cursor-pointer hover:text-black" onClick={navigateToProfile}>
                      <h2>{authState.loggedInUser.firstName}'s Account</h2>
                  </div>
              ) : (
                  <div onClick={toggleLogin} className="p-3 font-bold text-white bg-black rounded cursor-pointer hover:bg-white hover:text-black">
                      <h2>Login</h2>
                  </div>
              )}
          </div>
          <div className="items-center justify-between hidden w-3/4 md:flex md:ml-8 md:mr-8">
              <Link to="/catalog" className="flex items-center justify-center text-white">
                  <Book sx={{ fontSize: "2rem" }} />
                  <h1 className="ml-2 font-bold">View Catalog</h1>
              </Link>
              <div className="flex items-center">
                  <input className="p-2 mr-4 rounded md:block" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={searchRef} />
                  <Search onClick={handleSearchIconClicked} sx={{ cursor: "pointer", fontSize: "2rem", color: "white" }} />
              </div>
              {authState.loggedInUser ? (
                  <div className="text-xl font-bold text-white cursor-pointer hover:text-black" onClick={navigateToProfile}>
                      <h2>{authState.loggedInUser.firstName}'s Account</h2>
                  </div>
              ) : (
                  <div onClick={toggleLogin} className="p-3 font-bold text-white bg-black rounded cursor-pointer hover:bg-white hover:text-black">
                      <h2>Login</h2>
                  </div>
              )}
          </div>
      </nav>
  )
}

export default NavBar
