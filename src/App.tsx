import React, { useState, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { User } from "types";
import { AppContext } from "./components/Common/Contexts/AppContext";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

const LazyDashboard = React.lazy(() => import('./components/Dashboard/Dashboard').then(module => ({default: module.Dashboard})));

export const App = () => {
	const [currentForm, setCurrentForm] = useState('login');
	const [userData, setUserData] = useState<Partial<User>>({});
	const [loggedIn, setLoggedIn] = useState(false);
	
	const toggleForm = (formName: string) => {
		setCurrentForm(formName);
	}
	
	const contextValues = {
		userData, setUserData,
		loggedIn, setLoggedIn,
	}

  return (

	<AppContext.Provider value={contextValues}>
		<ToastContainer/>

	<Routes>
			<Route path="/" 
				element={currentForm === 'login' ? 
				<Login onFormSwitch={toggleForm}/> : 
				<Register onFormSwitch={toggleForm}/>} />

			<Route path="/dashboard" element={
				<Suspense fallback={<div>Dashboard loading...</div>}>
					<LazyDashboard userRole={userData.userRole}/>
				</Suspense>
			} />

			<Route path="*" element={<Navigate to={"/"} />} />
		</Routes>
	</AppContext.Provider>
	);
}