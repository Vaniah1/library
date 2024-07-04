import {Outlet} from "react-router-dom"
import {useSelector } from "react-redux"
import { Rootstate } from "../../redux/ReduxStore"
import { LoginRegisterModal } from "../../features/authentication"

export default function LayoutPage(){
    const state = useSelector((state:Rootstate) => state.modal)
    return (
        <div className="relative h-fit">
            {state.displayLogin && <LoginRegisterModal/>}
            <div className="text-2xl font-bold">NavBar</div>
                <Outlet/>
            <div className="text-2xl font-bold">Footer</div>
        </div>
    )
}