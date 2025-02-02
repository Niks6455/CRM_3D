import { useSelector, useDispatch } from "react-redux";
import styles from "./ZacazModule.module.scss";
import { updateProductQuantity, removeProduct, setDescription } from "../../store/Basket/basket";
import { useEffect, useState } from "react";
import { GetAllProduct } from "../../API/API";

function ZacazModule() {
    const store = useSelector((state) => state.basketSlice);
    const [dataProduct, setDataProduct] = useState([]);
    const zacazId = Math.floor(Math.random() * 1000000) 
    const dispatch = useDispatch();
    useEffect(() => {
        GetAllProduct().then(res => {
          if (res?.status === 200) {
            setDataProduct(res?.data);
          }
        });
      }, []);
      const textareaChange = (e) => {
        dispatch(setDescription(e.target.value));
      }
      const SubmitOrder = () => {
        if(store?.description !== "" && store.products.length > 0) {
            console.log("store", store);
        }else{
            alert("Заполните все поля, и выберите хотя бы один товар");
        }
      }
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
                    <p>Номер заказа No{1423}</p>
                    <p>Общая стоимость заказа {store?.products.reduce((total, item) => total + item.price * item.quantity, 0)} рублей</p>
                    <p>Общее колличество товаров {store?.products.reduce((total, item) => total + item.quantity, 0)} единицы</p>
                    <textarea className={styles.comment} placeholder="Комментарии к заказу" onChange={(e) => textareaChange(e)} value={store?.description}></textarea>
                    <button className={styles.order} onClick={() => {SubmitOrder()}}>Оформить заказ</button>
                </div>
            </div>
            ): (
                <p className={styles.emptyCart}>Корзина пуста</p>
            )}
            </div>
           
        </section>
    );
}

export default ZacazModule;
