import { Typography, Row, Col, Card, Table, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa';
import styles from './LibraryDetail.module.css';

const { Title, Text } = Typography;

const LibraryDetail = () => {
  // Mock ma'lumotlar
  const libraryInfo = {
    name: "Alisher Navoiy nomidagi O'zbekiston Milliy Kutubxonasi",
    address: "Toshkent shahri, Navoiy ko'chasi, 1-uy",
    phone: "+998 71 232 83 89",
    workingHours: "Dushanba - Shanba: 9:00 - 20:00",
    social: {
      facebook: "https://facebook.com/uzNatLib",
      telegram: "https://t.me/uzNatLib",
      instagram: "https://instagram.com/uzNatLib"
    }
  };

  const books = [
    {
      key: '1',
      title: "O'tkan kunlar",
      author: "Abdulla Qodiriy",
      publisher: "Sharq nashriyoti",
      available: 5,
      total: 10
    },
    {
      key: '2',
      title: "Kecha va Kunduz",
      author: "Cho'lpon",
      publisher: "G'afur G'ulom nashriyoti",
      available: 3,
      total: 7
    },
    // Boshqa kitoblar...
  ];

  const columns = [
    {
      title: 'Kitob nomi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Muallif',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Nashriyot',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Mavjud',
      key: 'availability',
      render: (_: any, record: any) => (
        <span>{record.available}/{record.total}</span>
      ),
    }
  ];

  return (
    <div className={styles.libraryDetail}>
      <div className={styles.heroSection}>
        <Title level={1}>{libraryInfo.name}</Title>
      </div>

      <Row gutter={[32, 32]} className={styles.contentSection}>
        <Col xs={24} lg={16}>
          <Card className={styles.infoCard}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className={styles.infoItem}>
                <EnvironmentOutlined className={styles.icon} />
                <Text>{libraryInfo.address}</Text>
              </div>
              <div className={styles.infoItem}>
                <PhoneOutlined className={styles.icon} />
                <Text>{libraryInfo.phone}</Text>
              </div>
              <div className={styles.infoItem}>
                <GlobalOutlined className={styles.icon} />
                <Text>{libraryInfo.workingHours}</Text>
              </div>
              <div className={styles.socialLinks}>
                <a href={libraryInfo.social.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href={libraryInfo.social.telegram} target="_blank" rel="noopener noreferrer">
                  <FaTelegram />
                </a>
                <a href={libraryInfo.social.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </Space>
          </Card>

          <div className={styles.mapSection}>
            <Title level={3}>Joylashuv</Title>
            <div className={styles.map}>
              {/* Google Maps integratsiyasi uchun joy */}
              <div className={styles.mapPlaceholder}>
                Xarita yuklanmoqda...
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.statsCard}>
            <Title level={3}>Statistika</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card className={styles.statItem}>
                  <Title level={4}>15,000+</Title>
                  <Text>Kitoblar</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card className={styles.statItem}>
                  <Title level={4}>1,000+</Title>
                  <Text>A'zolar</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card className={styles.statItem}>
                  <Title level={4}>500+</Title>
                  <Text>Kunlik tashrif</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card className={styles.statItem}>
                  <Title level={4}>50+</Title>
                  <Text>Xodimlar</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <div className={styles.booksSection}>
        <Title level={2}>Kutubxona fondi</Title>
        <Table 
          columns={columns} 
          dataSource={books}
          pagination={{
            total: 500,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
          className={styles.booksTable}
        />
      </div>
    </div>
  );
};

export default LibraryDetail; 