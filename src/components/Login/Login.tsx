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

    const sendForm = async(e: React.FormEvent) => {
        e.preventDefault();

        const rawRes = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include',
        });

        const res = await rawRes.json();
        if(res.isSuccess) {
            try{
                const rawRes = await fetch('http://localhost:3001/', {
                    method: 'GET',
                    headers: {'authorization': `Bearer ${res.accessToken}`}
                });
                console.log(await rawRes.json());
            }
            catch(err: any) {
                throw new Error(err.message);
            }
            
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