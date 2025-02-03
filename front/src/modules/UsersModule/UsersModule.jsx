import { useEffect, useState } from "react";
import { GetAllUsers, SwitchRoleUser } from "../../API/API"; // Предполагаем, что есть метод для обновления роли
import styles from './UsersModule.module.scss'; // Подключаем SCSS файл
import Layout from "../../ui/Layout/Layout";

const ROLE_TRANSLATIONS = {
    1: "Пользователь",
    2: "Администратор"
};

const ROLE_OPTIONS = [
    { value: 1, label: "Пользователь" },
    { value: 2, label: "Администратор" }
];

function UsersModule() {
    const [userData, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const user = JSON.parse(sessionStorage.getItem("userData"))?.user;
    const isAdmin = user?.role === 2; // Проверка, является ли текущий пользователь администратором

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        GetAllUsers().then((res) => {
            if (res?.status === 200 && res?.data.length > 0) {
                setUsers(res?.data);
            }
        });
    };

    const handleRoleChange = (userId, newRole) => {
        if (userId === user.id) {
            alert("Вы не можете изменить свою роль!");
            return;
        }

        const data = { id: userId, role: newRole };
        SwitchRoleUser(data).then((res) => {
            if (res?.status === 200) {
                setUsers((prevUsers) =>
                    prevUsers.map((usr) =>
                        usr.id === userId ? { ...usr, role: newRole } : usr
                    )
                );
                setEditingUserId(null);  // Закрываем выпадающий список после изменения
            }
        });
    };

    const handleRoleClick = (userId, currentRole) => {
        setEditingUserId(userId);
        setSelectedRole(currentRole);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Фильтрация пользователей по поисковому запросу
    const filteredUsers = userData.filter((user) => {
        return (
            user.fio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <section className={styles.UsersModule}>
            <Layout>
                <h2>Управление пользователями</h2>

                <input
                    className={styles.searchInput}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="🔍 Поиск по имени или email"
                />

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>Email</th>
                            <th>Дата регистрации</th>
                            <th>Роль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fio}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                                <td
                                    onClick={() => isAdmin && handleRoleClick(user.id, user.role)}
                                    className={styles.roleCell}
                                >
                                    {editingUserId === user.id ? (
                                        <select
                                            className={styles.roleSelect}
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            onBlur={() => handleRoleChange(user.id, selectedRole)}
                                            autoFocus
                                        >
                                            {ROLE_OPTIONS.map((role) => (
                                                <option key={role.value} value={role.value}>
                                                    {role.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        ROLE_TRANSLATIONS[user.role]
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </section>
    );
}

export default UsersModule;
