import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice.tsx";

const ProtectedRoute = ( { role } : { role?: string } ) => {
    const user = useSelector(selectUser);

    if (user == null) {
        return <Navigate to="/login" replace/>;
    }

    if (role) {
        const accountType = user.accountType;
        if (role !== accountType) return <Navigate to="/" replace/>;
    }

    return <Outlet/>
}
export default ProtectedRoute
