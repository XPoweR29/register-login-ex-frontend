import React, { useContext, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Common/Contexts/AppContext';
import { toast } from 'react-toastify';

interface Props {
    onFormSwitch: (val: string) => void;
}

export const Login = (props: Props) => {
    const {setUserData, setLoggedIn} = useContext(AppContext)!;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value,
        })); 

    }

    const sendForm = async(e: React.FormEvent) => {
        e.preventDefault();

        const rawRes = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include',
        });

        const res = await rawRes.json();
        console.log(res);

        if(res.isSuccess) {
            const rawRes = await fetch('http://localhost:3001/user/welcome', {
                credentials: 'include',
            });
            const data = await rawRes.json();

            setUserData(data.user);
            setLoggedIn(true);
            navigate('/dashboard', {replace: true});
        } else {
            toast.error("Niepoprawne dane logowania", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={sendForm}>
                
                <label htmlFor="email">Email</label>
                <input id='email' name='email' type="email" value={user.email} onChange={handleChange}/>

                <label htmlFor="pwd">Password</label>
                <input id='pwd' name='pwd' type="password" value={user.pwd} onChange={handleChange} />

                <button type='submit' className={styles.loginBtn}>Log in</button>
                <button onClick={()=>props.onFormSwitch('register')} className={styles.switchRegisterBtn}>Don't have an account? Sign in</button>
            </form> 
        </div>
    );
}