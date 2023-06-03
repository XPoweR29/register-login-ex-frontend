import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { checkAccessToken } from '../../utlis/checkAccessToken';
import { AppContext } from '../Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
    const {userData} = useContext(AppContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await checkAccessToken();
                console.log(res);
            } catch(err) {
                console.error(err);
                navigate('/', {replace: true});
            }
        }

        const interval = setInterval(checkToken, 10000);

        return () => {
            clearInterval(interval);
        }

    }, []);

   return (
    <div className={styles.wrapper}>
        <h1>Witaj {userData.username}</h1>
        <hr />
        <p className={styles.content}>To jest dashboard twojego profilu!</p>
    </div>
   ) 
}