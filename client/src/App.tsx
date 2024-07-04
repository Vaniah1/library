import HomePage from "./pages/HomePage/Homepage";
import {useEffect } from "react";
import {useSelector} from "react-redux"
import { Rootstate } from "./redux/ReduxStore";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LayoutPage from "./pages/LayoutPage/LayoutPage";

export default function App() {


  const loggedInUser = useSelector((state:Rootstate) => state.authentication.loggedInUser)

  useEffect(()=>{
    console.log(loggedInUser)
  },[loggedInUser])
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="" element={<HomePage />} />
        <Route path="/catalog" element={<>Catalog</>} />
        <Route path="/resource/:barcode" element={<>Resource</>} />
        <Route path="/profile/:userId" element={<>User Profile</>} />
      </Route>
      
      
    </Routes>
    </BrowserRouter>
  )
}
