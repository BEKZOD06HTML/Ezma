import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Typography, Input, Select, Space, Button } from 'antd';
import { SearchOutlined, EnvironmentOutlined, BookOutlined } from '@ant-design/icons';
import styles from './LibraryList.module.css';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const LibraryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = [
    "Andijon",
    "Buxoro",
    "Fargʻona",
    "Jizzax",
    "Xorazm",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Samarqand",
    "Sirdaryo",
    "Surxondaryo",
    "Toshkent"
  ];

  // Mock ma'lumotlar
  const libraries = [
    {
      id: 1,
      name: "Alisher Navoiy nomidagi O'zbekiston Milliy Kutubxonasi",
      city: "Toshkent",
      address: "Navoiy ko'chasi, 1-uy",
      totalBooks: 15000,
      image: "/libraries/national.jpg"
    },
    {
      id: 2,
      name: "Abu Ali ibn Sino nomidagi TTA Kutubxonasi",
      city: "Toshkent",
      address: "Farobiy ko'chasi, 2-uy",
      totalBooks: 8000,
      image: "/libraries/medical.jpg"
    },
    {
      id: 3,
      name: "Buxoro viloyat Axborot-Kutubxona Markazi",
      city: "Buxoro",
      address: "Alisher Navoiy shoh ko'chasi, 25",
      totalBooks: 12000,
      image: "/libraries/bukhara.jpg"
    },
    {
      id: 4,
      name: "Samarqand Davlat Universiteti Kutubxonasi",
      city: "Samarqand",
      address: "Universitet xiyoboni, 15",
      totalBooks: 10000,
      image: "/libraries/samarkand.jpg"
    }
  ];

  const filteredLibraries = libraries.filter(library => {
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || library.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className={styles.libraryList}>
      <div className={styles.header}>
        <Title level={1}>Kutubxonalar</Title>
        <div className={styles.filters}>
          <Space size={20}>
            <Input
              placeholder="Kutubxona nomini kiriting"
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput2}
            />
            <Select
              defaultValue="all"
              onChange={setSelectedCity}
              className={styles.citySelect}
              dropdownClassName={styles.cityDropdown}
            >
              <Option value="all">Barcha shaharlar</Option>
              {cities.map(city => (
                <Option key={city} value={city}>{city}</Option>
              ))}
            </Select>
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]} className={styles.libraryGrid}>
        {filteredLibraries.map(library => (
          <Col xs={24} sm={12} lg={8} key={library.id}>
            <Link to={`/library/${library.id}`} className={styles.libraryLink}>
              <Card
                hoverable
                className={styles.libraryCard}
                cover={
                  <div className={styles.imageContainer}>
                    <img alt={library.name} src={library.image} />
                  </div>
                }
              >
                <Title level={4} className={styles.libraryName}>
                  {library.name}
                </Title>
                <Space direction="vertical" size={12} className={styles.libraryInfo}>
                  <div className={styles.infoItem}>
                    <EnvironmentOutlined className={styles.icon} />
                    <Text>{library.city}, {library.address}</Text>
                  </div>
                  <div className={styles.infoItem}>
                    <BookOutlined className={styles.icon} />
                    <Text>{library.totalBooks.toLocaleString()} ta kitob</Text>
                  </div>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {filteredLibraries.length === 0 && (
        <div className={styles.noResults}>
          <Title level={3}>Kutubxonalar topilmadi</Title>
          <Text>Iltimos, qidiruv so'rovini o'zgartiring yoki filtrlarni qayta sozlang</Text>
        </div>
      )}
    </div>
  );
};

export default LibraryList; 