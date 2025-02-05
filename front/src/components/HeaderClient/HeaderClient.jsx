import { useContext, useEffect, useRef, useState } from "react";
import styles from "./HeaderClient.module.scss";
import DataContext from "../../context";
import { useNavigate } from "react-router-dom";
import { use } from "react";

function HeaderClient() {
    const context = useContext(DataContext);
    const userData = JSON.parse(sessionStorage.getItem("userData")).user;
    const [activeProfilePop, setActiveProfilePop] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveProfilePop(false);
        }
    };

    const getRole = () => {
        return userData?.role === 2 ? "Администратор" : "Клиент";
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className={styles.HeaderClient}>
                <div className={styles.HeaderClientLogo}>ISMA CRM</div>
                    
                    {userData?.role === 2 ?
                            (   <ul>
                                    <li className={window.location.pathname === "/HomePage/Catalog" ? styles.active : ""} onClick={() => navigate("/HomePage/Catalog")}>Продукция</li>
                                    <li className={window.location.pathname === "/HomePage/History" ? styles.active : ""} onClick={() => navigate("/HomePage/History")}>Заказы</li>
                                    <li className={window.location.pathname === "/HomePage/Users" ? styles.active : ""} onClick={() => navigate("/HomePage/Users")}>Пользователи</li>
                                </ul>
                            ): (
                                <ul>
                                    <li className={window.location.pathname === "/HomePage/Home" ? styles.active : ""} onClick={() => navigate("/HomePage/Home")}>Главная страница</li>
                                    <li className={window.location.pathname === "/HomePage/Catalog" ? styles.active : ""} onClick={() => navigate("/HomePage/Catalog")}>Каталог Товаров</li>
                                    <li className={window.location.pathname === "/HomePage/Basket" ? styles.active : ""} onClick={() => navigate("/HomePage/Basket")}>Корзина</li>
                                    <li className={window.location.pathname === "/HomePage/History" ? styles.active : ""} onClick={() => navigate("/HomePage/History")}>Мои заказы</li>
                                </ul>
                            )
                    
                    }
                <div className={styles.HeaderClientContact}>
                    <img src="/img/profile.svg" onClick={() => setActiveProfilePop(!activeProfilePop)} draggable="false" />   
                </div>
            </header>
            {
                activeProfilePop && (
                    <div className={styles.profileData} ref={menuRef}>
                        <p>{userData?.fio}</p>
                        <p>{userData?.email}</p>
                        <p>Роль: {getRole()}</p>
                        <button onClick={() => navigate("/")}>Выход</button>
                    </div>
                )
            }
        </>
    );
}

export default HeaderClient;
