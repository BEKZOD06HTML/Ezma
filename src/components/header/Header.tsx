import { useState } from 'react';
import { Layout, Menu, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import Logo from '../logo';

const { Header } = Layout;
const { Option } = Select;

const AppHeader = () => {
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

        <Space>
          <Link to="/login" className={styles.authButton}>
            <UserOutlined /> Kirish
          </Link>
          <Link to="/register" className={styles.registerButton}>
            Ro'yxatdan o'tish
          </Link>
        </Space>
      </Space>
    </Header>
  );
};

export default AppHeader;
