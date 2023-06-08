import styles from './UsersList.module.scss';
import {User} from 'types';

interface Props {
    usersList: User[],
}

export const UsersList = (props: Props) => {
    return (
        <ul className={styles.list}>

            <div className={styles.header}>
                <span>ID</span>
                <span>Nick</span>
                <span>Email</span>
                <span>Rola</span>
            </div>

            {props.usersList.map((user) => 

            <li className={styles.item} key={user.id}>
                <span>{user.id}</span>
                <span>{user.username}</span> 
                <span>{user.email}</span>
                <span>{user.userRole}</span>
            </li> )}            
        </ul>
    );
}