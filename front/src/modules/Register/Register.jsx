import React, { useContext, useState } from "react";
import Input from "../../ui/Input/Input";
import styles from "./Register.module.scss";
import DataContext from "../../context";
import { RegisterFunc } from "../../API/API";

function Register() {
    const context = useContext(DataContext);
    const [textReg, setTextReg] = useState('');
    const [textRegFlag, setTextRegFlag] = useState(false);
    const [formData, setFormData] = useState({
        fio: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const handleSubmit = () => {
        if(!formData.fio || !formData.email || !formData.password || !formData.confirmPassword){
            setTextReg("Заполните все поля");
            setTextRegFlag(false);
            return;
        }
        RegisterFunc(formData).then((res) => {
            if (res?.status === 200) {
                setTextReg("Аккаунт успешно создан! Пожалуйста, авторизуйтесь");
                setTextRegFlag(true);
            }else{
                setTextReg("Произошла ошибка при регистрации");
                setTextRegFlag(false);
            }
        })
    };

    return (
        <section className={styles.Register}>
          <div>
          <div className={styles.RegisterTitle}>
                <p>Регистрация</p>
            </div>
            <div className={styles.input}>
                <div className={styles.inputInner}>
                 <div>

                        <Input
                            name="fio"
                            onChange={handleChange}
                            value={formData.fio}
                            placeholder="ФИО*"
                        />
                        <Input
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="Почта*"
                        />
                        <Input
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Пароль*"
                            type="password"
                        />
                          <Input
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder="Повторите пароль*"
                            type="password"
                        />
                   </div>
                    {textReg && <div className={styles.errorTextCont}>{!textRegFlag && <img src="/img/error.svg"/>}<p className={!textRegFlag ? styles.errorText : styles.goodText}>{textReg}!</p></div>}
                   </div>

            </div>
           
            <div className={styles.submitButton}>
                <button onClick={handleSubmit}>Зарегистрироваться</button>
            </div>
            <div className={styles.noAccount}>
                <p>Уже есть аккаунт?</p>
                <p onClick={() => context.setAuthPage('Auth')}>Авторизируйтесь</p>
            </div>
          </div>
           
        </section>
    );
}

export default Register;
