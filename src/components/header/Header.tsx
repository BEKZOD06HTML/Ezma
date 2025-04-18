import { useState } from 'react';
import { Layout, Menu, Select, Space, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { GlobalOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import Logo from '../logo';
import { useStore } from '../../hooks/useStore';

const { Header } = Layout;
const { Option } = Select;

const AppHeader = () => {
  const [language, setLanguage] = useState('uz');
  const { user } = useStore();

  const baseMenuItems = [
    {
      key: 'home',
      label: <Link to="/">Bosh sahifa</Link>,
    },
    {
      key: 'libraries',
      label: <Link to="/libraries">Kutubxonalar</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">Biz haqimizda</Link>,
    },
  ];
  const menuItems = user ? [
    ...baseMenuItems,
    {
      key: 'add',
      label: <Link to="/add"><PlusOutlined /> Qo'shish</Link>,
    }
  ] : baseMenuItems;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <span className={styles.logoText}>Ezma</span>
          <Logo/>
        </Link>
      </div>

      <Menu
        mode="horizontal"
        items={menuItems}
        className={styles.menu}
      />

      <Space className={styles.rightSection}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          className={styles.languageSelect}
          suffixIcon={<GlobalOutlined />}
        >
          <Option value="uz">UZ</Option>
          <Option value="ru">RU</Option>
          <Option value="en">ENG</Option>
        </Select>

        <Space>
          {user ? (
            <Link to="/profile" className={styles.profileLink}>
              <Space>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                />
                <span className={styles.userName}>{user?.data?.login || 'Foydalanuvchi'}</span>
              </Space>
            </Link>
          ) : (
            <>
              <Link to="/login" className={styles.authButton}>
                <UserOutlined /> Kirish
              </Link>
              <Link to="/register" className={styles.registerButton}>
                Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </Space>
      </Space>
    </Header>
  );
};

export default AppHeader;
