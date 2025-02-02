import { useEffect, useState } from "react";
import styles from "./CatalogModule.module.scss";
import { GetAllProduct } from "../../API/API";
import Layout from "../../ui/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, updateProductQuantity } from "../../store/Basket/basket";


function CatalogModule() {
    const [ProductData, setProductData] = useState([]);
    const [selectPodr, setSelectPodr] = useState(null);
  
    useEffect(() => {
      GetAllProduct().then(res => {
        if (res?.status === 200) {
          setProductData(res?.data);
        }
      });
    }, []);
  
    const store = useSelector((state) => state.basketSlice.products);
    const dispatch = useDispatch();
  
    const handleAddOrUpdateProduct = (item) => {
      const existingProduct = store.find(el => el.productId === item.id);
      if (existingProduct) {
        dispatch(updateProductQuantity({ productId: item.id, quantity: existingProduct.quantity + 1 }));
      } else {
        dispatch(addProduct({ productId: item.id, quantity: 1, price: item.price }));
      }
    };

    const deleteProduct = (item) => {
        dispatch(removeProduct(item.id));
      };
  

    return (
        <section className={styles.CatalogModule}>
            <Layout>
                <div className={styles.catalogItemContainer}>
                    {ProductData.map((item, index) => {
                    const existingProduct = store.find(el => el.productId === item.id);
                    return (
                        <div key={index} className={styles.catalogItem}>
                        <img src={`data:image/png;base64,${item.image}`} alt={item.name} />
                        <div className={styles.itemContent}>
                            <h2>{item.name}</h2>
                            <p className={styles.price}>{item.price} ₽</p>
                            <p className={styles.description}>{item.description}</p>
                            {existingProduct ? (
                                <>
                                <div className={styles.quantityCont}>
                                <p>Количество в корзине: </p>
                                    <button onClick={() => dispatch(updateProductQuantity({ productId: item.id, quantity: existingProduct.quantity + 1 }))}>+</button>
                                    <p>{existingProduct.quantity}</p>
                                    <button onClick={() => dispatch(updateProductQuantity({ productId: item.id, quantity: Math.max(existingProduct.quantity - 1, 1) }))}>-</button>
                                </div>
                                <button className={styles.addToCart} onClick={() => deleteProduct(item)}>Удалить из корзины</button>

                                </>
                           
                            ) : (
                            <button className={styles.addToCart} onClick={() => handleAddOrUpdateProduct(item)}>Добавить в корзину</button>
                            )}
                            <button className={styles.addToCart} onClick={() => setSelectPodr(item)}>Подробнее</button>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </Layout>
            {
                selectPodr && (
                    <div className={styles.catalogItemContainerPodr}>
                        <div className={styles.catalogItemInner}>
                            <div className={styles.catalogItemInnerBlockOne}>
                            <img src={`data:image/png;base64,${selectPodr?.image}`} alt={selectPodr?.name} />
                                <div className={styles.itemContent}>
                                    <h2>Название товара: {selectPodr?.name}</h2>
                                    <p className={styles.price}>Стоимость товара: {selectPodr?.price} ₽</p>
                                    <p className={styles.description}>Описание товара: {selectPodr?.description}</p>
                                    { store.find(el => el.productId === selectPodr.id) ? (
                                        <>
                                        <div className={styles.quantityCont}>
                                            <p>Количество в корзине: </p>
                                            <button onClick={() => dispatch(updateProductQuantity({ productId: selectPodr.id, quantity: store.find(el => el.productId === selectPodr.id).quantity + 1 }))}>+</button>
                                            <p>{store.find(el => el.productId === selectPodr.id).quantity}</p>
                                            <button onClick={() => dispatch(updateProductQuantity({ productId: selectPodr.id, quantity: Math.max(store.find(el => el.productId === selectPodr.id).quantity - 1, 1) }))}>-</button>
                                        </div>
                                        <button className={styles.addToCart} onClick={() => deleteProduct(selectPodr)}>Удалить из корзины</button>

                                        </>
                                
                                    ) : (
                                    <button className={styles.addToCart} onClick={() => handleAddOrUpdateProduct(selectPodr)}>Добавить в корзину</button>
                                    )}
                                    <button className={styles.close} onClick={() => setSelectPodr(null)}>&times;</button>
                                </div>
                            </div>
                            <div className={styles.catalogItemInnerBlockTwo}>
                                <p><strong>Подробное описание: </strong></p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum a lacus consectetur, at rhoncus nisl consectetur. Nullam euismod, nisl eget aliquet interdum, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam euismod, nisl eget aliquet interdum, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam euismod, nisl eget aliquet interdum, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam euismod, nisl eget aliquet interdum, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam euismod, nisl eget aliquet interdum, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.</p>
                            </div>
                        </div>

                    </div>
                )
            }
           
        </section>
    );
}

export default CatalogModule;
