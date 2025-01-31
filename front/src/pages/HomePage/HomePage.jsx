import { useContext} from "react";
import DataContext from "../../context";
import Layout from "../../ui/Layout/Layout";
import styles from "./HomePage.module.scss";
import HeaderClient from "../../components/HeaderClient/HeaderClient";
import HomePageModule from "../../modules/HomePageModule/HomePageModule";
import ZacazModule from "../../modules/ZacazModule/ZacazModule";
import CatalogModule from "../../modules/CatalogModule/CatalogModule";

function HomePage() {
    const context = useContext(DataContext);
    const userData = JSON.parse(sessionStorage.getItem("userData")).user;
    

    return ( 
        <>
        <HeaderClient/> 
            {/* <Layout> */}
                <main className={styles.HomePage}>
                {
                    context.activePage === "HomePage" ? 
                        (
                           <HomePageModule/>
                        ) : 
                        (context.activePage === "Catalog" ? 
                            (
                                <CatalogModule/>  
                            ) : 
                            (
                                <ZacazModule/>                            
                            )
                        )
                }
                </main>
            {/* </Layout> */}
     
        </>
     );
}

export default HomePage;