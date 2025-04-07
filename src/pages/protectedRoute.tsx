import {getItem} from "@/services/localStorageService.tsx";
import {jwtDecode} from "jwt-decode";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ( { role } : { role?: string } ) => {

    const token = getItem("token");

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    if (role) {
        const decode: any = jwtDecode(token);
        const accountType = decode?.accountType;
        if (role !== accountType) return <Navigate to="/" replace/>;
    }

    return <Outlet/>
}
export default ProtectedRoute
