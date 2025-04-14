import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Col, Card, Typography, Space, Button, Empty } from 'antd';
import { 
  BookOutlined, 
  ThunderboltOutlined, 
  EnvironmentOutlined, 
  SafetyCertificateOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { SendOutlined } from '@ant-design/icons';
import styles from './HomePage.module.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

interface Library {
  id: number;
  name: string;
  address: string;
  image: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const libraries: Library[] = [
    {
      id: 1,
      name: "Alisher Navoiy nomidagi O'zbekiston Milliy Kutubxonasi",
      address: "Toshkent sh., Navoiy ko'chasi, 1-uy",
      image: "/libraries/national.jpg"
    },
    {
      id: 2,
      name: "Abu Ali ibn Sino nomidagi Toshkent Tibbiyot Akademiyasi Kutubxonasi",
      address: "Toshkent sh., Farobiy ko'chasi, 2-uy",
      image: "/libraries/medical.jpg"
    },
    {
      id: 3,
      name: "O'zbekiston Fanlar Akademiyasi Asosiy Kutubxonasi",
      address: "Toshkent sh., Ziyolilar ko'chasi, 13-uy",
      image: "/libraries/science.jpg"
    }
  ];

  const popularBooks: Book[] = [
    {
      id: 1,
      title: "O'tkan kunlar",
      author: "Abdulla Qodiriy",
      image: "/books/otkan-kunlar.jpg"
    },
    {
      id: 2,
      title: "Kecha va Kunduz",
      author: "Cho'lpon",
      image: "/books/kecha-kunduz.jpg"
    },
    {
      id: 3,
      title: "Sariq Devni Minib",
      author: "Xudoyberdi To'xtaboyev",
      image: "/books/sariq-dev.jpg"
    }
  ];

  const features: Feature[] = [
    {
      icon: <BookOutlined className={styles.featureIcon} />,
      title: "Ko'plab kutubxonalar bazasi",
      description: "Respublikadagi barcha yirik kutubxonalar bir tizimda"
    },
    {
      icon: <ThunderboltOutlined className={styles.featureIcon} />,
      title: "Tezkor qidiruv",
      description: "Soniyalar ichida kerakli kitobingizni toping"
    },
    {
      icon: <EnvironmentOutlined className={styles.featureIcon} />,
      title: "Eng yaqin kutubxona",
      description: "Sizga eng yaqin kutubxonani aniqlash imkoniyati"
    },
    {
      icon: <SafetyCertificateOutlined className={styles.featureIcon} />,
      title: "Tasdiqlangan ma'lumotlar",
      description: "Ishonchli va yangilangan ma'lumotlar bazasi"
    }
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setIsSearching(true);
    
    if (!value.trim()) {
      setFilteredBooks([]);
      setIsSearching(false);
      return;
    }

    const filtered = popularBooks.filter(book => 
      book.title.toLowerCase().includes(value.toLowerCase()) ||
      book.author.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const LibraryCard = ({ library }: { library: Library }) => (
    <Card className={styles.libraryCard}>
      <img src={library.image} alt={library.name} className={styles.libraryImage} />
      <Title level={4}>{library.name}</Title>
      <Paragraph>{library.address}</Paragraph>
      <Link to={`/library/${library.id}`}>
        <Button type="primary" className={styles.detailButton}>
          Batafsil
        </Button>
      </Link>
    </Card>
  );

  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <Title level={1} className={styles.mainTitle}>
          O'zbek davlat kutubxonalaridan kitob qidirish tizimi
        </Title>
        <div className={styles.searchContainer}>
          <Search
            placeholder="Kitob qidirish..."
            enterButton="Qidirish"
            size="large"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>

      {isSearching && (
        <div className={styles.searchResults}>
          <Title level={2} className={styles.sectionTitle}>
            Qidiruv natijalari
          </Title>
          {filteredBooks.length > 0 ? (
            <Row gutter={[24, 24]}>
              {filteredBooks.map(book => (
                <Col xs={24} sm={12} md={8} key={book.id}>
                  <Card
                    hoverable
                    cover={<img alt={book.title} src={book.image} />}
                    className={styles.bookCard}
                  >
                    <Card.Meta
                      title={book.title}
                      description={book.author}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              description="Kitob topilmadi"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )}

      <div className={styles.librariesSection}>
        <Title level={2} className={styles.sectionTitle}>
          Kutubxonalar
        </Title>
        <Row gutter={[24, 24]}>
          {libraries.map(library => (
            <Col xs={24} md={8} key={library.id}>
              <LibraryCard library={library} />
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.popularBooksSection}>
        <Title level={2} className={styles.sectionTitle}>
          Eng ko'p qidirilgan kitoblar
        </Title>
        <Row gutter={[24, 24]}>
          {popularBooks.map(book => (
            <Col xs={24} sm={12} md={8} key={book.id}>
              <Card
                hoverable
                cover={<img alt={book.title} src={book.image} />}
                className={styles.bookCard}
              >
                <Card.Meta
                  title={book.title}
                  description={book.author}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.featuresSection}>
        <Title level={2} className={styles.sectionTitle}>
          Nega aynan bizning tizim?
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className={styles.featureCard}>
                <Space direction="vertical" align="center">
                  {feature.icon}
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage; 