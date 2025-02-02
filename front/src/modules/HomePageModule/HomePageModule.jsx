import { useContext } from "react";
import Layout from "../../ui/Layout/Layout";
import styles from "./HomePageModule.module.scss";
import DataContext from "../../context";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider";
import { useNavigate } from "react-router-dom";

function HomePageModule() {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    return ( 
        <section className={styles.containerHomePage}>
           
            <div className={styles.hero}>
                <Layout>
                <img className={styles.dImg1} src="/img/3d.png"/>
                <img className={styles.dImg2} src="/img/3d2.png"/>
                    <div>
                    <div className={styles.heroImg}>
                        <img src="/img/HHomeFirstImg.jpeg" alt="Hero Image"/>
                    </div>
                        <h1 className={styles.title}>Заказывайте 3D-печать легко и быстро</h1>
                        <p className={styles.subtitle}>Добро пожаловать в ISMA CRM, ваш партнер в области революционного управления заказами для студий 3D-печати. Мы специализируемся на разработке удобного и эффективного инструмента, который упрощает управление заказами, отслеживание прогресса и общение с нашей командой.</p>
                    </div>
                </Layout>
            </div>
           
            <div className={styles.about}>
                <Layout>
                    <div className={styles.aboutInner}>
                        <h1>О компании ISMA CRM</h1>
                        <div className={styles.aboutImg}>
                            <img src="./img/InfoBlock.jpeg"/>
                        </div>
                            <div className={styles.aboutText}>
                                <div>
                                    <p>В ISMA CRM мы выходим за рамки традиционных CRM-решений; мы являемся новаторами в области обработки заказов. Цель нашего проекта - создать мощную платформу, которая позволит студиям 3D-печати оптимизировать свою работу, обеспечивая клиентам бесперебойную работу от размещения заказа до доставки.</p>
                                </div>
                                <div>
                                    <p>Присоединяйтесь к нам в преобразовании сферы 3D-печати с помощью нашего модуля автоматизированного управления заказами. У каждого клиента свои потребности, и наша система предназначена для предоставления персонализированных рекомендаций и обновлений в режиме реального времени, что упрощает связь с нашей студией. Откройте для себя новую эру эффективности и удовлетворенности с Iscra CRM.</p>
                                </div>
                            </div>
                    </div>
                    
                </Layout>
            </div>

            <div className={styles.services}>
                <Layout>
                    <div className={styles.servicesTitle}>
                        <h1>Как все происходит</h1>
                    </div>
                    {/* Features Section */}
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureColor1}></div>
                            <h2 className={styles.featureTitle}>Загрузка моделей</h2>
                            <p className={styles.featureText}>Загружайте свои 3D-модели в форматах STL, OBJ и других.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureColor2}></div>
                            <h2 className={styles.featureTitle}>Выбор материалов</h2>
                            <p className={styles.featureText}>Подбирайте подходящий материал и цвет для вашего изделия.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureColor3}></div>
                            <h2 className={styles.featureTitle}>Быстрая доставка</h2>
                            <p className={styles.featureText}>Получите готовый заказ в кратчайшие сроки.</p>
                        </div>
                    </div>
                    <div className={styles.featureBy}>
                        <button onClick={() => navigate("/HomePage/Catalog")}>Каталог Товаров</button>
                    </div>
                </Layout>
            </div>
             <ReviewsSlider/>
           

            
        </section>
    );
}

export default HomePageModule;
