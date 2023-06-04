import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { getAuthorization } from '../../utlis/getAuthorization';
import { refreshAccessToken } from '../../utlis/refreshAccessToken';
import { AppContext } from '../Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    const {userData, loggedIn, setLoggedIn} = useContext(AppContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        const getAuth = async () => {
            try {
                const res = await refreshAccessToken();
                await getAuthorization(res.newAccessToken);
            } catch(err) {
                console.error(err);
                navigate('/', {replace: true});
            }
        }

        const interval = setInterval(getAuth, 10000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const logout = async() => {
        const rawRes = await fetch('http://localhost:3001/logout', {
            method: 'DELETE',
            credentials: 'include',
        });
        setLoggedIn(false);
    };

    if(loggedIn) {
        return (
         <div className={styles.wrapper}>
             <h1>Witaj {userData.username}</h1>
             <hr />
             <p className={styles.content}>To jest dashboard twojego profilu!</p>
     
             <button onClick={logout} className={styles.logoutBtn}>Log out</button>
         </div>
        ) 
    } 
    else {
        return <Navigate to='/' replace/>;
    }
}