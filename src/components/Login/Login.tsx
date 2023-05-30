import styles from './Login.module.scss';

export const Login = () => {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                
                <label htmlFor="email">Email</label>
                <input id='email' type="email" />

                <label htmlFor="pwd">Password</label>
                <input id='pwd' type="password" />

                <button className={styles.loginBtn}>Log in</button>
                <button className={styles.registerBtn}>Don't have an account? Register here</button>
            </form> 
        </div>
    );
}