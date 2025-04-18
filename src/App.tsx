import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/header/Header';
import Home from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import LibraryList from './pages/library/LibraryList';
import LibraryDetail from './pages/library/LibraryDetail';
import Login from './pages/login/Login';
import Register from './pages/login/register/Register';
import ProfilePage from './pages/profil/profil';
import AddBooks from './pages/Add/Add';
import { useStore } from './hooks/useStore';
import './App.css';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const { Content } = Layout;
const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user } = useStore();
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout className="layout">
          {!isAuthPage && <Header />}
          <Content className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/libraries" element={<LibraryList />} />
              <Route path="/library/:id" element={<LibraryDetail />} />
              
              <Route path="/login" element={
                user ? <Navigate to="/" replace /> : <Login />
              } />
              
              <Route path="/register" element={
                user ? <Navigate to="/" replace /> : <Register />
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              <Route path="/add" element={
                <ProtectedRoute>
                  <AddBooks />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Content>
          {!isAuthPage && <Footer />}
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
