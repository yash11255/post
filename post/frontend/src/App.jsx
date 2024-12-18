import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// import { useAuthStore } from "./store/authUser";
// import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";
// import HomePage from "./pages/home/HomePage";

function App() {
	// const { user, isCheckingAuth, authCheck } = useAuthStore();

	// useEffect(() => {
	// 	authCheck();
	// }, [authCheck]);

	// if (isCheckingAuth) {
	// 	return (
	// 		<div className='h-screen'>
	// 			<div className='flex justify-center items-center bg-black h-full'>
	// 				<Loader className='animate-spin text-red-600 size-10' />
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={  <LoginPage /> } />
				<Route path='/home' element={  <HomePage /> } />
				<Route path='/signup' element={ <SignUpPage />  } />
				<Route path='/watch/:id' element={ <WatchPage /> } />
				<Route path='/search' element={ <SearchPage /> } />
				<Route path='/history' element={ <SearchHistoryPage /> } />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;
