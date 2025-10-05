import './App.css'
import { Route, Routes } from 'react-router-dom'

// Import components
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

// Import pages
import Home from './pages/Home'
import { Navbar } from './components/common/Navbar'
import { Signup } from "./pages/Signup"
import {Login} from "./pages/Login";
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { About } from './pages/About';
import { ResetComplete } from './pages/ResetComplete';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { MyProfile } from './components/core/Dashboard/MyProfile';
import Settings from "./components/core/Dashboard/Settings";
import { Error } from "./pages/Error";
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from './services/operations/profileAPI';
import { useEffect } from 'react';
import { MyCourses } from "./components/core/Dashboard/MyCourses";
import { Instructor } from './components/core/Dashboard/Instructor';
import { EditCourse } from "./components/core/Dashboard/EditCourse"
import { Catalog } from './pages/Catalog';
import { ViewCourse } from "./pages/ViewCourse"
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails"
import { CourseDetails } from "./pages/CourseDetails"
import { AddCourse } from "./components/core/Dashboard/AddCourse"


const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector( (state) => state.profile)

  useEffect( () => {
    if(localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate));
    }
  }, [])

  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        <Route 
            path="/login"
            element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            }
        />

        <Route 
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            }
        />

        
        <Route 
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            }
        />

        <Route 
            path="/reset-complete"
            element={
              <OpenRoute>
                <ResetComplete/>
              </OpenRoute>
            }
        />

        <Route 
            path="/signup"
            element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
            }
        />

        <Route 
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            }
        />

        <Route 
            path="/about" 
            element={
              <OpenRoute>
                <About/>
              </OpenRoute>
            }
        />

        <Route 
            path="/contact"
            element={
              <OpenRoute>
                <Contact/>
              </OpenRoute>
            }
        />

        <Route
          path='/catalog/:catalogName'
          element={
            // <OpenRoute>
              <Catalog/>
            // </OpenRoute>
          }
        />

        <Route
          path='/courses/:courseId'
          element={
            // <OpenRoute>
              <CourseDetails/>
            // </OpenRoute>
          }
        />

        {/* Private Route for only logged in users */}
        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>

          {/* Routes only for Student */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/cart" element={<Cart/>}></Route>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
              </>
            )
          }

          {/* Routes only for Instructor */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/instructor' element={<Instructor/>}></Route>
                <Route path='/dashboard/my-courses' element={<MyCourses/>}></Route>
                <Route path='/dashboard/add-course' element={<AddCourse/>}></Route>
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}></Route>
              </>
            )
          }
        </Route>

        {/* Route for watching Course Lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
                  element={<VideoDetails/>}
                ></Route>
              </>
            )
          }
        </Route>

        <Route path='*'
              element={<Error/>}
        />

      </Routes>
    </div>
  )
}

export default App;

