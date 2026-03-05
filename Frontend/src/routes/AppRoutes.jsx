import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import ReverseProtectedRoute from "./ReverseProtectedRoute";
import CreateReel from "../pages/CreateVideo";
import CreatorProfile from "../pages/CreatorProfile";
import VideoPopup from "../components/VideoPopup";
import SavedPage from "../pages/SavedPage";

function AppRoutes() {

  const location = useLocation()

  const backgroundLocation = location.state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={
          <ProtectedRoutes>
            <Explore />
          </ProtectedRoutes>
        } />
        <Route path="/create" element={
          <ProtectedRoutes>
            <CreateReel />
          </ProtectedRoutes>
        } />
        <Route path="/creator/:creatorId" element={
          <ProtectedRoutes>
            <CreatorProfile />
          </ProtectedRoutes>
        } />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={
          <ReverseProtectedRoute>
            <Login />
          </ReverseProtectedRoute>
        } />
        <Route path="/saved" element={
          <ProtectedRoutes>
            <SavedPage />
          </ProtectedRoutes>
        } />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/creator/reel/:reelId"
            element={
              <ProtectedRoutes>
                <VideoPopup />
              </ProtectedRoutes>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default AppRoutes