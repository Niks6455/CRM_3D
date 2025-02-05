import React, { useContext, useState } from "react";
import Input from "../../ui/Input/Input";
import styles from "./Login.module.scss";
import DataContext from "../../context";
import { useNavigate } from "react-router-dom";
import { LoginFunc } from "../../API/API";

function Login() {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorText(null)
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = () => {
            if(!formData.email || !formData.password){
                setErrorText("Заполните все поля");
                return;
            }
            LoginFunc(formData).then((res) => {
                if (res?.status === 200) {
                    if(res?.data?.user?.role == 2){
                        navigate("/HomePage/History")
                    }else{
                        navigate("/HomePage/Home")
                    }
                   
                }else{
                    setErrorText("Неверный логин или пароль");
                }
            })
    };

    return (
        <section className={styles.Login}>
            <div>
                <div className={styles.LoginTitle}>
                        <p>Авторизация</p>
                    </div>
                    <div className={styles.input}>
                    <div>
                        
                        <div className={styles.inputInner}>
                            <Input
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="Email*"
                            />
                            <Input
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="Пароль*"
                                type="password"
                            />
                        </div>
                            {errorText && <div className={styles.errorText}><img src="/img/error.svg"/>{errorText}!</div>}
                        </div>
                    </div>
                <div className={styles.submitButton}>
                        <button onClick={() => handleSubmit()}>Войти</button>
                </div>
                <div className={styles.noAccount}>
                    <p>Еще нет аккаунта?</p>
                    <p onClick={() => context.setAuthPage('Register')}>Зарегистрируйтесь</p>
                </div>
            </div>
        </section>
    );
}

export default Login;
