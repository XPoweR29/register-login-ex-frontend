import { useState } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export const App = () => {
	const [currentForm, setCurrentForm] = useState('login');

	const toggleForm = (formName: string) => {
		setCurrentForm(formName);
	}

	return (
		<div className='App'>
			{currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
		</div>
	); 
}