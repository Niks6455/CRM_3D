import { useContext, useEffect, useRef, useState } from "react";
import styles from "./HeaderClient.module.scss";
import DataContext from "../../context";
import { useNavigate } from "react-router-dom";

function HeaderClient() {
    const context = useContext(DataContext);
    const userData = JSON.parse(sessionStorage.getItem("userData")).user;
    console.log("userData", userData)
    const [activeProfilePop, setActiveProfilePop] = useState(false);
    const navigate = useNavigate();
    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && activeProfilePop) {
            setActiveProfilePop(false);
        }
    };
    
    const menuRef = useRef(null);
    const getRole = () =>{
        if(userData?.role === 2){
            return "Администратор"
        }else{
            return "Клиент"
        }
    }

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside());
        return () => {
            document.removeEventListener("mousedown", handleClickOutside());
        }
    },[])

    return ( 
        <>

        <header className={styles.HeaderClient}>
            <div className={styles.HeaderClientLogo}>
               ISMA CRM
            </div>
            <ul>
                <li className={context.activePage === "HomePage" ? styles.active : ""} onClick={() => context.setActivePage("HomePage")}>Главная страница</li>
                <li className={context.activePage === "Catalog" ? styles.active : ""} onClick={() => context.setActivePage("Catalog")}>Каталог Товаров</li>
                <li className={context.activePage === "MyZacaz" ? styles.active : ""} onClick={() => context.setActivePage("MyZacaz")}>Мои заказы</li>
            </ul>
            <div className={styles.HeaderClientContact}>
                <img src="/img/profile.svg" onClick={() => setActiveProfilePop(!activeProfilePop)} draggable="false"/>   
            </div>
            
        </header>
          {
            activeProfilePop &&
            <div className={styles.profileData} ref={menuRef}>
                <p>{userData?.fio}</p>
                <p>{userData?.email}</p>
                <p>Роль: {getRole()}</p>
                <button onClick={(e) =>navigate("/")}>Выход</button>
            </div>
        }
        </>
     );
}

export default HeaderClient;