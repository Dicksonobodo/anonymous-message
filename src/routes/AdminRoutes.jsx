// routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Replace with your Firebase UID
const ADMIN_UID = "A96mgtRfFYM2rZvw81INwwEobq03";

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    return <Navigate to="/login" />;
  }

  return children;
}
