import React, { useState } from 'react';
import styles from './Login.module.scss';

interface Props {
    onFormSwitch: (val: string) => void;
}

export const Login = (props: Props) => {
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

    const sendForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
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