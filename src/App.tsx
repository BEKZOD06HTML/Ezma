import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import LibraryDetail from './pages/library/LibraryDetail';
import LibraryList from './pages/library/LibraryList';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/libraries" element={<LibraryList />} />
          <Route path="/library/:id" element={<LibraryDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
