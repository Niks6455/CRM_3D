import Layout from "../../ui/Layout/Layout";
import styles from "./HomePageModule.module.scss";

function HomePageModule() {
    return ( 
        <section className={styles.containerHomePage}>
            {/* Hero Section */}
           
                <div className={styles.hero}>
                <Layout>
                    <div>
                    <div className={styles.heroImg}>
                        <img src="/img/HHomeFirstImg.jpeg" alt="Hero Image"/>
                    </div>
                        <h1 className={styles.title}>Заказывайте 3D-печать легко и быстро</h1>
                        <p className={styles.subtitle}>Добро пожаловать в Iscra CRM, ваш партнер в области революционного управления заказами для студий 3D-печати. Мы специализируемся на разработке удобного и эффективного инструмента, который упрощает управление заказами, отслеживание прогресса и общение с нашей командой.</p>
                    </div>
                    </Layout>
                </div>
            
           
            <div className={styles.about}>
                <Layout>
                    <div className={styles.aboutInner}>
                        <h1>О компании Iskra CRM</h1>
                        <div className={styles.aboutImg}>
                            <img src="./img/InfoBlock.jpeg"/>
                        </div>
                            <div className={styles.aboutText}>
                                <div>
                                    <p>В Iscra CRM мы выходим за рамки традиционных CRM-решений; мы являемся новаторами в области обработки заказов. Цель нашего проекта - создать мощную платформу, которая позволит студиям 3D-печати оптимизировать свою работу, обеспечивая клиентам бесперебойную работу от размещения заказа до доставки.</p>
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
                    <h1>Наши услуги</h1>

                </Layout>
            </div>

            
        </section>
    );
}

export default HomePageModule;
