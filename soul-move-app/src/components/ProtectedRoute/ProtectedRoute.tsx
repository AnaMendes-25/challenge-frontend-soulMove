import { Navigate, Outlet, useLocation } from "react-router";
import { usuariosService } from "../../services/usuariosService";

export default function ProtectedRoute() {
    const location = useLocation();
    const usuarioId = usuariosService.getUsuarioIdGuardado();

    if (usuarioId === null) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}