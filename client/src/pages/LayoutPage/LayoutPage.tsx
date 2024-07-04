import {Outlet} from "react-router-dom"
import {useSelector } from "react-redux"
import { Rootstate } from "../../redux/ReduxStore"
import { LoginRegisterModal } from "../../features/authentication"
import NavBar from "../../features/navigation/components/Navbar/NavBar"
import { Footer } from "../../features/navigation"
export default function LayoutPage(){
    const state = useSelector((state:Rootstate) => state.modal)
    return (
        <div className="relative w-full h-fit">
            {state.displayLogin && <LoginRegisterModal/>}
            <NavBar />
            <Outlet/>
            <Footer />
        </div>
    )
}