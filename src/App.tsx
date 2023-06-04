import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { User } from "types";
import { AppContext } from "./components/Common/Contexts/AppContext";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

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

	<Routes>
			<Route path="/" 
				element={currentForm === 'login' ? 
				<Login onFormSwitch={toggleForm}/> : 
				<Register onFormSwitch={toggleForm}/>} />

			<Route path="/dashboard" element={<Dashboard/>} />

			<Route path="*" element={<Navigate to={"/"} />} />
		</Routes>
	</AppContext.Provider>
	);
}