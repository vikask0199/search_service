import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewDetails from "./components/admin/AddNewDetails"
import AdminHome from "./components/admin/AdminHome"
import UpdateDetails from "./components/admin/UpdateDetails"
import NotFound404 from "./components/error/NotFound404"
import HomeHeader from "./components/home/HomeHeader"
import AdminOutlet from "./outlets/AdminOutlet"
import PublicOutlet from "./outlets/PublicOutlet"
// import AllStore from "./components/admin/AllStore"
import DeleteStore from "./components/admin/DeleteStore"
import ClearDatabasePage from "./components/admin/ClearDatabasePage"
import ProfilePage from "./components/admin/ProfilePage"
import Category from "./components/admin/Category"
import LoginPage from "./components/auth/LoginPage"
import RequireAuth from "./requireAuth/RequireAuth"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route index element={<HomeHeader />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminOutlet />}>
            <Route index element={<AdminHome />} />
            <Route path="add-new-details/:id" element={<AddNewDetails />} />
            <Route path="update-details/:id" element={<UpdateDetails />} />
            {/* <Route path="all-store/:id" element={<AllStore />} /> */}
            <Route path="delete-store/:id" element={<DeleteStore />} />
            <Route path="clear-database/:id" element={<ClearDatabasePage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="category/:id" element={<Category />} />
          </Route>
        </Route>
        <Route path="/please-login" element={<LoginPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
