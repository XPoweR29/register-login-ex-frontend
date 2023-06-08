import 'react-toastify/dist/ReactToastify.css';
import React, { Suspense, useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { AppContext } from '../Common/Contexts/AppContext';
import styles from './Dashboard.module.scss';
import { toast } from 'react-toastify';
import { UsersList } from '../UsersList/UsersList';
import { User } from 'types';

const LazyUsersList = React.lazy(() => import('../UsersList/UsersList').then(module => ({default: module.UsersList})));

interface Props {
    userRole?: string;
}

export const Dashboard = (props: Props) => {
    const {userData, loggedIn, setLoggedIn} = useContext(AppContext)!;
    const [isAdmin, setIsAdmin] = useState(false);
    const [usersList, setUsersList ] = useState<User[]>([]);

    const logout = async() => {
        await fetch('http://localhost:3001/auth/logout', {
            credentials: 'include',
        });
        setLoggedIn(false);
    };

    const getUsersList = async() => {
        const rawRes = await fetch('http://localhost:3001/user/list-all', {
            credentials: 'include',
        });

        const res = await rawRes.json();
        
        if(res.statusCode === 403) {
            toast.error('Nie masz uprawnień do tego zasobu 🤷‍♂️', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setUsersList(res);
            setIsAdmin(true);
        }
    }

    if(loggedIn) {
        return (
			<div className={props.userRole === 'admin' ? styles.adminWrapper : styles.wrapper}>
				<h1>Witaj {userData.username}</h1>
				<hr />
                {props.userRole === 'user' 
                ?
				<p className={styles.content}>
					Jesteś zalogowany do swojego profilu. Tylko zalogowani użytkownicy
					mogą się tutaj dostać! 
					<strong> GRATULACJE!</strong>
				</p>
                :
                <p className={styles.content}>
                    Znajdujesz się w panelu <strong>ADMINA!</strong> dzięki temu możesz więcej niz inni 😈🔥
                </p>
                }
                <br />

                <button onClick={getUsersList} className={styles.showAllUsersBtn}>Show all members</button>

                {isAdmin && 
                <Suspense fallback={<div className={styles.fallback}>Users list is loading now...</div>}>
                    <LazyUsersList usersList={usersList}/>
                </Suspense>
                }

				<button onClick={logout} className={styles.logoutBtn}>
					Log out
				</button>
			</div>
		); 
    } 
    else {
        return <Navigate to='/' replace/>;
    }
}