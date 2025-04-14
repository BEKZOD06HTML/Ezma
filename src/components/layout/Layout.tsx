import React from 'react';
import { Layout as AntLayout } from 'antd';
import AppHeader from '../header/Header';
import Footer from '../footer/Footer';
import styles from './Layout.module.css';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className={styles.layout}>
      <AppHeader />
      <Content className={styles.content}>
        {children}
      </Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout; 