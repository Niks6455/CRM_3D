import { useEffect, useRef, useState } from "react";
import styles from "./CatalogModule.module.scss";
import { DeleteProduct, GetAllProduct, GetProductOne, ProdCreate, UpdatePhoto, UpdateProduct } from "../../API/API";
import Layout from "../../ui/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, updateProductQuantity } from "../../store/Basket/basket";


function CatalogModule() {
    const [ProductData, setProductData] = useState([]);
    const [selectPodr, setSelectPodr] = useState(null);
    const userData = JSON.parse(sessionStorage.getItem("userData"))?.user;
    const isAdmin = userData?.role === 2;  // Проверка, является ли пользователь администратором
    const [createProduct, setCreateProduct] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0
    })
    const [editForm, setEditForm] = useState(false)
    const [editId, setEditId] = useState(null)
    useEffect(() => {
        getProduct()
    }, []);

    const getProduct = () => {
        GetAllProduct().then(res => {
            if (res?.status === 200) {
              setProductData(res?.data);
            }
          });
    }
  
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

    const CreateProduct = () => {
        setCreateProduct(!createProduct);
    };

    const CreateProductData = (data) =>{
        if(
            data.name === "" &&
            data.description === "" &&
            data.price === 0
        ){
            alert("Заполните все поля!");
            return;
        }else{
            ProdCreate(data).then(res => {
                if (res?.status === 200) {
                    setCreateProduct(false);
                    setFormData({
                        name: "",
                        description: "",
                        price: 0
                    })
                    getProduct();
                }
            });
        }
        
    }

    const selectEditProduct = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price
        });
        setEditId(item);
        setEditForm(!editForm);
    }

    const SaveData = (data) =>{
        if(
            data.name === "" &&
            data.description === "" &&
            data.price === 0
        ){
            alert("Заполните все поля!");
            return;
        }else{
            UpdateProduct(data, editId.id).then(res => {
                if (res?.status === 200) {
                    setEditForm(false);
                    setFormData({
                        name: "",
                        description: "",
                        price: 0
                    })
                    getProduct();
                }
            });
        }
    }

    const AddPhoto = () =>{
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', editId.id);
        UpdatePhoto(formData).then(res => {
            if (res?.status === 200) {
                getProduct();
                GetProductOne(editId.id).then(res => {
                    if (res?.status === 200) {
                        setFormData({
                            name: res?.data.name,
                            description: res?.data.description,
                            price: res?.data.price
                        })
                        setEditId(res?.data);
                    }
                })
            }
        })
      };
      const deleteProductItem = (id) => {
        if (window.confirm("Вы действительно хотите удалить продукт?")) {
            DeleteProduct(id).then(res => {
                if (res?.status === 200) {
                    getProduct();
                }
            }).catch(error => {
                console.error("Ошибка удаления:", error);
            });
        }
    };
    

    return (
        <section className={styles.CatalogModule}>
            <Layout>
                <div className={styles.catalogItemContainer}>
                {
                    isAdmin && 
                    <div>
                        <div className={styles.catalogItemCreate}>
                            <div className={styles.catalogItemCreate}>
                                <button onClick={() => CreateProduct()}> + <br/>Добавить модель</button>
                            </div>
                        </div>
                    </div>
                }
                    {ProductData.map((item, index) => {
                    const existingProduct = store.find(el => el.productId === item.id);
                    return (
                        <div key={index} className={!isAdmin ? styles.catalogItem : styles.catalogItemAdmin}>
                        <img src={item.image ? `data:image/png;base64,${item.image}` :  "/img/NoPhoto.png"} alt={item.name} />
                        <div className={styles.itemContent}>
                            <h2>{item.name}</h2>
                            <p className={styles.price}>{item.price} ₽</p>
                            <p className={styles.description}>{item.description}</p>
                            {existingProduct && !isAdmin ? (
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
                                <>
                                    {!isAdmin && <button className={styles.addToCart} onClick={() => handleAddOrUpdateProduct(item)}>Добавить в корзину</button>}
                                </>
                            )}
                            {
                                !isAdmin &&   <button className={styles.addToCart} onClick={() => setSelectPodr(item)}>Подробнее</button>   
                            }
                        </div>
                        {
                            isAdmin && <button className={styles.editItem} onClick={() =>{selectEditProduct(item)}}><img src="/img/pencil.png" alt="pencil"/></button>
                        }
                        {
                            isAdmin && <button className={styles.editItem + " " + styles.trash} onClick={() =>{deleteProductItem(item.id)}}><img src="/img/trash.png" alt="pencil"/></button>
                        }
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
                            <img src={selectPodr.image ? `data:image/png;base64,${selectPodr.image}` :  "/img/NoPhoto.png"} alt={selectPodr?.name} />
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
                                    <button className={styles.addToCartPodr} onClick={() => handleAddOrUpdateProduct(selectPodr)}>Добавить в корзину</button>
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
            {
                createProduct && (
                    <div className={styles.catalogItemContainerPodr}>
                        <div className={styles.catalogItemContainerPodrAdmin}>
                            <div className={styles.catalogItemInnerCreate}>
                            <h1>
                                Добавление модели 
                            </h1>
                            <div className={styles.addModel}>
                                <input type="text" placeholder="Название товара" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                <textarea maxLength={100} type="text" placeholder="Описание товара" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <input type="number" placeholder="Стоимость товара" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                <button onClick={() => CreateProductData(formData)}>Добавить модель</button>
                            </div>
                            <button className={styles.close} onClick={() => {setCreateProduct(!createProduct); setFormData({ name: "", description: "", price: "" })}}>&times;</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                editForm && (
                    <div className={styles.catalogItemContainerPodr}>
                        <div className={styles.catalogItemContainerPodrAdmin}>
                            <div className={styles.catalogItemInnerEdit}>
                            <h1> Редактирование модели  </h1>
                            <div className={styles.catalogItemInnerEditBlock}>
                                <div className={styles.catalogItemInnerEditBlockFirst}>
                                    <img src={editId?.image ? `data:image/png;base64,${editId?.image}` :  "/img/NoPhoto.png"} alt={editId?.name} />
                                    <button className={styles.addPhotoImg} onClick={() => AddPhoto()}>Изменить фото</button>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".png .jpeg .jpg" />
                                </div>
                                <div className={styles.catalogItemInnerEditBlockTwo}>
                                    <div className={styles.addModel}>
                                        <input type="text" placeholder="Название товара" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        <textarea maxLength={100} type="text" placeholder="Описание товара" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                        <input type="number" placeholder="Стоимость товара" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                        <button onClick={() => SaveData(formData)}>Сохранить информацию</button>
                                    </div>
                                </div>
                            </div>
                            
                            <button className={styles.close} onClick={() => {setEditForm(!editForm); setFormData({ name: "", description: "", price: "" })}}>&times;</button>
                            </div>
                        </div>
                    </div>
                )
            }
           
        </section>
    );
}

export default CatalogModule;
