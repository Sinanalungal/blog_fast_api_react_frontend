import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { UserContext } from "./components/home/userContextProvider";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterCard = lazy(() => import("./components/auth/RegisterCard"));
const PrivetRouter = lazy(() => import("./routes/PrivetRouter"));
const Blogs = lazy(() => import("./components/home/Blog"));
const MyBlogs = lazy(() => import("./components/home/MyBlogs"));
const CreatePost = lazy(() => import("./components/home/CreatePost"));
const Profile = lazy(() => import("./components/home/Profile"));

function App() {
	const { fetchUser } = useContext(UserContext);
	useEffect(()=>{
      fetchUser()
	},[])
	
	return (
		<BrowserRouter>
			<Suspense fallback={
				<div className="h-screen flex justify-center items-center">
					<div >Loading...
					</div>
				</div>}>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="register" element={<RegisterCard />} />
					<Route path="home" element={<PrivetRouter/>}>
						<Route path="" element={<Blogs />} />
						<Route path="my-blogs" element={<MyBlogs />} />
						<Route path="create-post" element={<CreatePost />} />
						<Route path="profile" element={<Profile />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
