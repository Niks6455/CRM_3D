import { useEffect, useState } from "react";
import styles from "./HistoryModule.module.scss";
import { GetAllOrders, UpdateOrderStatus } from "../../API/API"; 
import Layout from "../../ui/Layout/Layout";

const STATUS_TRANSLATIONS = {
    pending: "Ожидает",
    processing: "В процессе",
    completed: "Завершен",
    canceled: "Отменен"
};

const STATUS_STYLES = {
    pending: styles.pending,
    processing: styles.inProgress,
    completed: styles.completed,
    canceled: styles.canceled
};

function HistoryModule() {
    const [dataOrders, setDataOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const userData = JSON.parse(sessionStorage.getItem("userData"))?.user;
    const isAdmin = userData?.role === 2;  // Проверка, является ли пользователь администратором

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        GetAllOrders().then((resp) => {
            if (resp?.status === 200) {
                setDataOrders(resp.data);
            }
        });
    };

    const activeOrders = dataOrders.filter(order => order.status === "pending" || order.status === "processing");
    const historyOrders = dataOrders.filter(order => order.status === "completed" || order.status === "canceled");

    const filterOrders = (orders) => {
        return orders.filter(order =>
            order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.phoneNumber.includes(searchQuery) ||
            order.User.fio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.User.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleStatusChange = (orderId, newStatus) => {
        const data = {
            orderId: orderId,
            status: newStatus
        };

        UpdateOrderStatus(data).then((resp) => {
            if (resp?.status === 200) {
                getData();
                setEditingOrderId(null);  // Закрываем выпадающий список после изменения статуса
            }
        });
    };

    const handleStatusClick = (e, orderId, currentStatus) => {
        if (editingOrderId === orderId && e.target.tagName === "TD") {
            setEditingOrderId(null);  // Закрыть редактирование, если клик по той же ячейке
        } else {
            setEditingOrderId(orderId);
            setSelectedStatus(currentStatus);  // Сохраняем текущий статус для редактирования
        }
    };

    return (
        <section className={styles.HistoryModule}>
            <Layout>
                <h2>Заказы</h2>

                <input
                    type="text"
                    placeholder="🔍 Поиск по заказам..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className={styles.tablesContainer}>
                    <div>
                        <h3>📌 Текущие заказы</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Комментарий</th>
                                    <th>Телефон</th>
                                    <th>Дата создания</th>
                                    <th>Пользователь</th>
                                    <th>Продукты</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!filterOrders(activeOrders).length ? (
                                    <tr>
                                        <td colSpan="7">Заказы не найдены</td>
                                    </tr>
                                ) : (
                                    <>
                                        {filterOrders(activeOrders).map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.description}</td>
                                                <td>{order.phoneNumber}</td>
                                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                                <td>{order.User.fio} ({order.User.email})</td>
                                                <td>
                                                    <ul>
                                                        {order.Products.map((product) => (
                                                            <li key={product.id}>
                                                                {product.name} - {product.OrderProduct.quantity} шт. {isAdmin && `(Id: ${product.id})`}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td
                                                    className={STATUS_STYLES[order.status]}
                                                    onClick={(e) => isAdmin && handleStatusClick(e, order.id, order.status)}
                                                >
                                                    {editingOrderId === order.id ? (
                                                        <select
                                                            value={selectedStatus}
                                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                                            onBlur={() => handleStatusChange(order.id, selectedStatus)}
                                                            autoFocus
                                                        >
                                                            <option value="pending">Ожидает</option>
                                                            <option value="processing">В процессе</option>
                                                            <option value="completed">Завершен</option>
                                                            <option value="canceled">Отменен</option>
                                                        </select>
                                                    ) : (
                                                        STATUS_TRANSLATIONS[order.status]
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h3>📜 История заказов</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Комментарий</th>
                                    <th>Телефон</th>
                                    <th>Дата создания</th>
                                    <th>Пользователь</th>
                                    <th>Продукты</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7">Заказы не найдены</td>
                                    </tr>
                                ) : (
                                    <>
                                        {filterOrders(historyOrders).map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.description}</td>
                                                <td>{order.phoneNumber}</td>
                                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                                <td>{order.User.fio} ({order.User.email})</td>
                                                <td>
                                                    <ul>
                                                        {order.Products.map((product) => (
                                                            <li key={product.id}>
                                                                {product.name} - {product.OrderProduct.quantity} шт. {isAdmin && `(Id: ${product.id})`}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className={STATUS_STYLES[order.status]}>
                                                    {STATUS_TRANSLATIONS[order.status]}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </section>
    );
}

export default HistoryModule;
