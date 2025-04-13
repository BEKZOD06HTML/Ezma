import { useState } from 'react';
import { Layout, Menu, Button, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import Logo from '../logo';

const { Header } = Layout;
const { Option } = Select;

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [language, setLanguage] = useState('uz');
  const navigate = useNavigate();

  const menuItems = [
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

        {!isLoggedIn ? (
          <Space>
            <Button 
              type="link" 
              onClick={() => navigate('/login')}
              className={styles.authButton}
            >
              <UserOutlined /> Kirish
            </Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/register')}
              className={styles.registerButton}
            >
              Ro'yxatdan o'tish
            </Button>
          </Space>
        ) : (
          <Space>
            <Button 
              type="link" 
              onClick={() => navigate('/profile')}
              className={styles.authButton}
            >
              <UserOutlined /> Profil
            </Button>
            {isLibrarian && (
              <Button 
                type="primary" 
                onClick={() => navigate('/add-book')}
                className={styles.addBookButton}
              >
                <BookOutlined /> Kitob qo'shish
              </Button>
            )}
          </Space>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;
