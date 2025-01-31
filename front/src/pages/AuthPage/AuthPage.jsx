import { useContext } from "react";
import DataContext from "../../context";
import Layout from "../../ui/Layout/Layout";
import styles from "./AuthPage.module.scss";
import Login from "../../modules/Login/Login";
import Register from "../../modules/Register/Register";
function AuthPage() {
    const context = useContext(DataContext);
    
    return ( 
        <>
            <main className={styles.AuthPage}>
                <Layout>
                    {context.authPage === "Auth" ? <Login/> : <Register/>}
                </Layout>
            </main>
        </>
     );
} 

export default AuthPage;