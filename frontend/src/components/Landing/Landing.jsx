import { Outlet } from "react-router-dom";

export default function Landing(){
    return(
        <>
            <h1>Application</h1>
            <Outlet />
        </>
        
    )
}