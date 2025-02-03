import { useSelector, useDispatch } from "react-redux";
import styles from "./ZacazModule.module.scss";
import { updateProductQuantity, removeProduct, setDescription, clearBasket, setPhoneNumber } from "../../store/Basket/basket";
import { useEffect, useState } from "react";
import { CreateOrder, GetAllProduct } from "../../API/API";

function ZacazModule() {
    const store = useSelector((state) => state.basketSlice);
    const [dataProduct, setDataProduct] = useState([]);
    const [phoneNumber, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        GetAllProduct().then(res => {
            if (res?.status === 200) {
                setDataProduct(res?.data);
            }
        });
    }, []);

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");
        let formatted = "+7 ";
        if (cleaned.length > 1) formatted += `(${cleaned.slice(1, 4)}`;
        if (cleaned.length > 4) formatted += `) ${cleaned.slice(4, 7)}`;
        if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 9)}`;
        if (cleaned.length > 9) formatted += `-${cleaned.slice(9, 11)}`;
        return formatted;
    };

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatPhoneNumber(rawValue);
        setPhone(formattedValue);
        dispatch(setPhoneNumber(formattedValue));

        const isValid = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(formattedValue);
        setPhoneError(!isValid);
    };

    const textareaChange = (e) => {
        dispatch(setDescription(e.target.value));
    };

    const SubmitOrder = () => {
        if (store?.description !== "" && store.products.length > 0 && !phoneError) {
            CreateOrder(store).then(res => {
                if (res?.status === 200 || res?.status === 201) {
                    alert("Заказ успешно создан");
                    dispatch(clearBasket());
                    setPhone(""); 
                }
            });
        } else {
            alert("Заполните все поля корректно и выберите хотя бы один товар");
        }
    };

    return (
        <section className={styles.ZacazModule}>
            <div className={styles.ZacazModuleInner}>   
                <h2 className={styles.title}>Моя корзина</h2>
                {store?.products.length > 0 ? (
                    <div className={styles.ZacazModuleInnerBack}>
                        <div className={styles.ZacazModuleInnerBackOne}>
                            <ul className={styles.cartList}>
                                {store?.products.map((item) => (
                                    <li key={item.productId} className={styles.cartItem}>
                                        <div className={styles.cartItemInner}>
                                            <div className={styles.cartItemText}>
                                                <span className={styles.productId}>Товар ID: {item.productId}</span>
                                                <span className={styles.quantity}>Количество: {item.quantity}</span>
                                                <span className={styles.price}>Стоимость 1 единицы: {item.price} ₽</span>
                                                <span className={styles.totalPrice}>Стоимость за все: {item.price * item.quantity} ₽</span>
                                            </div>
                                            <div className={styles.cartItemImg}>
                                                <img src={`data:image/png;base64,${dataProduct.find(el => el.id === item.productId)?.image}`} alt={item.name} />
                                            </div>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button className={styles.increment} onClick={() => dispatch(updateProductQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}>+</button>
                                            <button className={styles.decrement} onClick={() => dispatch(updateProductQuantity({ productId: item.productId, quantity: Math.max(item.quantity - 1, 1) }))}>-</button>
                                            <button className={styles.remove} onClick={() => dispatch(removeProduct(item.productId))}>Удалить</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.ZacazModuleInnerBackTwo}>
                            <p>Номер заказа No1423</p>
                            <p>Общая стоимость заказа {store?.products.reduce((total, item) => total + item.price * item.quantity, 0)} рублей</p>
                            <p>Общее количество товаров {store?.products.reduce((total, item) => total + item.quantity, 0)} единицы</p>
                            <textarea className={styles.comment} placeholder="Комментарии к заказу" onChange={textareaChange} value={store?.description}></textarea>
                            <input
                                placeholder="Номер телефона"
                                className={`${styles.phone} ${phoneError ? styles.phoneError : ""}`}
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                            />
                            {phoneError && <p className={styles.errorText}>Введите корректный номер в формате +7 (XXX) XXX-XX-XX</p>}
                            <button className={styles.order} onClick={SubmitOrder} disabled={phoneError}>Оформить заказ</button>
                        </div>
                    </div>
                ) : (
                    <p className={styles.emptyCart}>Корзина пуста</p>
                )}
            </div>
        </section>
    );
}

export default ZacazModule;
