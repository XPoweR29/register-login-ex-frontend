import styles from './Dashboard.module.scss';

export const Dashboard = () => {
   return (
    <div className={styles.wrapper}>
        <h1>Witaj user</h1>
        <hr />
        <p>To jest strina twojego profilu!</p>
    </div>
   ) 
}