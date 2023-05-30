import { useState } from 'react';
import styles from './Register.module.scss';

interface Props {
    onFormSwitch: (val: string) => void;
}

export const Register = (props: Props) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        pwd: '',
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

                <label htmlFor="username">Username</label>
                <input id='username' name='username' type="text" value={user.username} onChange={handleChange}/>

                <label htmlFor="email">Email</label>
                <input id='email' name='email' type="email" value={user.email} onChange={handleChange}/>

                <label htmlFor="pwd">Password</label>
                <input id='pwd' name='pwd' type="password" value={user.pwd} onChange={handleChange}/>

                <button type='submit' className={styles.registerBtn}>Sign in</button>
                <button onClick={()=>props.onFormSwitch('login')} className={styles.switchLoginBtn}>Already have an account? Log in</button>

            </form>
        </div>
    );
};