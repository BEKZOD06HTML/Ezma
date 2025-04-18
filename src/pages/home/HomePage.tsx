// src/components/HomePage/Home.jsx
import { useState, useEffect } from "react";
import { Input, Button, Alert, List, Spin, Card, Row, Col, Space } from "antd";
import {LoadingOutlined, BookOutlined, SearchOutlined, TeamOutlined, CloudServerOutlined,} from "@ant-design/icons";
import { useSearch } from '../../hooks/usehook';
import { useNavigate, NavigateFunction } from "react-router-dom";
import styles from './HomePage.module.css';

interface Book {
  id: number;
  name: string;
  author: string;
  publisher: string;
  quantity_in_library: number;
}

interface SearchResponse {
  data: Book[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { data: results, isLoading, error } = useSearch<SearchResponse>(debounced);

  if (error) {
    return (
      <Alert
        message="Xatolik"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className={styles.loader}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      );
    }
    if (!results?.data?.length) {
      return <p className={styles.noResult}>Hech narsa topilmadi.</p>;
    }
    return (
      <List
        className={styles.resultsList}
        itemLayout="horizontal"
        dataSource={results.data}
        renderItem={(book: Book) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => navigate(`/book/${book.id}`)}>
                Batafsil
              </Button>
            ]}
          >
            <List.Item.Meta 
              title={<span className={styles.bookTitle}>{book.name}</span>}
              description={
                <span className={styles.bookInfo}>
                  {`${book.author} | ${book.publisher} | ${book.quantity_in_library}`}
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  const features = [
    { icon: <BookOutlined className={styles.icon} />, title: "Keng kutubxonalar tarmog'i", desc: "Barcha davlat kutubxonalari bir tizimda" },
    { icon: <SearchOutlined className={styles.icon} />, title: "Qulay qidiruv", desc: "Kitoblarni tez va oson topish imkoniyati" },
    { icon: <TeamOutlined className={styles.icon} />, title: "Kitobxonlar uchun", desc: "Kitobxonlar uchun maxsus imkoniyatlar" },
    { icon: <CloudServerOutlined className={styles.icon} />, title: "Online xizmatlar", desc: "Masofadan turib xizmatlardan foydalanish" },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.heroSection}>
        <h2 className={styles.mainTitle}>
            Kutubxona yoki kitob nomi kerak bulsa yozing
        </h2>
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Kitob nomi, muallif nomi"
            prefix={<SearchOutlined className={styles.searchIcon} />}
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {debounced && (
        <div className={styles.resultsContainer}>
          {renderResults()}
        </div>
      )}

      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Nega aynan bizning tizim?</h2>
        <Row gutter={[32, 32]}>
          {features.map((f, idx) => (
            <Col span={6} key={idx}>
              <Card className={styles.featureCard}>
                <Space direction="vertical" align="center">
                  {f.icon}
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
