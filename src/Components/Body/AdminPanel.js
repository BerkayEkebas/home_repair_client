import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/AdminPanel.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('en');
    const [editingUser, setEditingUser] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        room_id: ''
    });

    const navigate = useNavigate();

    // Admin kontrolü
    useEffect(() => {
        const userRole = localStorage.getItem("role")?.replace(/"/g, "") || "";
        console.log("Current user role:", userRole);

        if (userRole !== 'admin') {
            alert("Admin access required");
            navigate('/');
        }
    }, [navigate]);

    const translations = {
        en: {
            title: "Admin Panel - User Management",
            name: "Name",
            email: "Email",
            role: "Role",
            room: "Room",
            status: "Status",
            actions: "Actions",
            edit: "Edit",
            delete: "Delete",
            createUser: "Create New User",
            save: "Save",
            cancel: "Cancel",
            active: "Active",
            inactive: "Inactive",
            student: "Student",
            admin: "Admin",
            userCreated: "User created successfully",
            userUpdated: "User updated successfully",
            userDeleted: "User deleted successfully",
            confirmDelete: "Are you sure you want to delete this user?",
            allFieldsRequired: "All fields are required",
            loading: "Loading...",
            noUsers: "No users found"
        },
        ko: {
            title: "관리자 패널 - 사용자 관리",
            name: "이름",
            email: "이메일",
            role: "역할",
            room: "방",
            status: "상태",
            actions: "작업",
            edit: "수정",
            delete: "삭제",
            createUser: "새 사용자 생성",
            save: "저장",
            cancel: "취소",
            active: "활성",
            inactive: "비활성",
            student: "학생",
            admin: "관리자",
            userCreated: "사용자가 성공적으로 생성되었습니다",
            userUpdated: "사용자 정보가 성공적으로 업데이트되었습니다",
            userDeleted: "사용자가 성공적으로 삭제되었습니다",
            confirmDelete: "이 사용자를 삭제하시겠습니까?",
            allFieldsRequired: "모든 필드는 필수입니다",
            loading: "로딩 중...",
            noUsers: "사용자를 찾을 수 없습니다"
        }
    };

    const t = translations[language];

    // Kullanıcıları getir
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8800/api/users/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage(error.response?.data?.[language] || error.response?.data?.en || 'Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Kullanıcı düzenle
    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    // Kullanıcı güncelle
    const handleUpdate = async () => {
        if (!editingUser.name || !editingUser.email || !editingUser.role) {
            setMessage(t.allFieldsRequired);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8800/api/users/users/${editingUser.user_id}`, {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
                room_id: editingUser.room_id || null,
                is_active: editingUser.is_active
            });

            setMessage(response.data.message[language] || response.data.message.en);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            setMessage(error.response?.data?.[language] || error.response?.data?.en || 'Error updating user');
        }
    };

    // Kullanıcı sil
    const handleDelete = async (userId) => {
        if (!window.confirm(t.confirmDelete)) return;

        try {
            const response = await axios.delete(`http://localhost:8800/api/users/users/${userId}`);
            setMessage(response.data[language] || response.data.en);
            fetchUsers();
        } catch (error) {
            setMessage(error.response?.data?.[language] || error.response?.data?.en || 'Error deleting user');
        }
    };

    // Yeni kullanıcı oluştur
    const handleCreate = async () => {
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
            setMessage(t.allFieldsRequired);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8800/api/users/users', newUser);
            setMessage(response.data.message[language] || response.data.message.en);
            setShowCreateForm(false);
            setNewUser({ name: '', email: '', password: '', role: 'student', room_id: '' });
            fetchUsers();
        } catch (error) {
            setMessage(error.response?.data?.[language] || error.response?.data?.en || 'Error creating user');
        }
    };

    return (
        <div className="admin-panel-container" style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ margin: 0, color: '#333' }}>{t.title}</h2>
                <div className="language-switcher" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #ddd',
                            background: language === 'en' ? '#007bff' : 'white',
                            color: language === 'en' ? 'white' : '#333',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </button>
                    <button
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #ddd',
                            background: language === 'ko' ? '#007bff' : 'white',
                            color: language === 'ko' ? 'white' : '#333',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                        onClick={() => setLanguage('ko')}
                    >
                        KO
                    </button>
                </div>
            </div>

            <div className="admin-actions" style={{ marginBottom: '20px' }}>
                <button
                    style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                    onClick={() => setShowCreateForm(true)}
                >
                    {t.createUser}
                </button>
            </div>

            {message && (
                <div style={{
                    padding: '12px',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    backgroundColor: message.includes('successfully') || message.includes('성공적으로') ? '#d4edda' : '#f8d7da',
                    color: message.includes('successfully') || message.includes('성공적으로') ? '#155724' : '#721c24',
                    border: `1px solid ${message.includes('successfully') || message.includes('성공적으로') ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                    {message}
                </div>
            )}

            {/* Yeni Kullanıcı Formu - INLINE STYLES */}
            {showCreateForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90%',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>{t.createUser}</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.name}</label>
                            <input
                                type="text"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.email}</label>
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.role}</label>
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value="student">{t.student}</option>
                                <option value="admin">{t.admin}</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.room}</label>
                            <input
                                type="number"
                                value={newUser.room_id}
                                onChange={(e) => setNewUser({ ...newUser, room_id: e.target.value })}
                                placeholder="Optional"
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button 
                                style={{
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleCreate}
                            >
                                {t.save}
                            </button>
                            <button 
                                style={{
                                    background: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setShowCreateForm(false)}
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kullanıcı Düzenleme Formu - INLINE STYLES */}
            {editingUser && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90%',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Edit User</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.name}</label>
                            <input
                                type="text"
                                value={editingUser.name}
                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.email}</label>
                            <input
                                type="email"
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.role}</label>
                            <select
                                value={editingUser.role}
                                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value="student">{t.student}</option>
                                <option value="admin">{t.admin}</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.room}</label>
                            <input
                                type="number"
                                value={editingUser.room_id || ''}
                                onChange={(e) => setEditingUser({ ...editingUser, room_id: e.target.value })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.status}</label>
                            <select
                                value={editingUser.is_active}
                                onChange={(e) => setEditingUser({ ...editingUser, is_active: parseInt(e.target.value) })}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value={1}>{t.active}</option>
                                <option value={0}>{t.inactive}</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button 
                                style={{
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleUpdate}
                            >
                                {t.save}
                            </button>
                            <button 
                                style={{
                                    background: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setEditingUser(null)}
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kullanıcı Listesi */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>{t.loading}</div>
                ) : users.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>{t.noUsers}</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.name}</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.email}</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.role}</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.room}</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.status}</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{t.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.user_id}>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor: user.role === 'student' ? '#e3f2fd' : '#fff3e0',
                                            color: user.role === 'student' ? '#1976d2' : '#f57c00'
                                        }}>
                                            {user.role === 'student' ? t.student : t.admin}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.room_id || '-'}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor: user.is_active ? '#e8f5e8' : '#ffebee',
                                            color: user.is_active ? '#2e7d32' : '#c62828'
                                        }}>
                                            {user.is_active ? t.active : t.inactive}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                        <button
                                            style={{
                                                background: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginRight: '5px'
                                            }}
                                            onClick={() => handleEdit(user)}
                                        >
                                            {t.edit}
                                        </button>
                                        <button
                                            style={{
                                                background: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleDelete(user.user_id)}
                                        >
                                            {t.delete}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;