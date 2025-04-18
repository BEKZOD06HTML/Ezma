import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Table, Result, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useGetLibraryDetail } from '../../hooks/useLibrary';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SendOutlined, BookOutlined, PhoneOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import API from '../../api/API';
import './LibraryDetail.css';

const { Text } = Typography;

interface BookItem {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  category: string;
}

interface BooksResponse {
  content: BookItem[];
  totalElements: number;
}

const pageSize = 10;

const LibraryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { libraryDetail, libraryDetailError } = useGetLibraryDetail(id || '');
  
  const {
    data: booksData,
    error: booksError,
  } = useQuery<BooksResponse>({
    queryKey: ['libraryBooks', id],
    queryFn: async () => {
      const res = await API.get<BooksResponse>(`/books/book/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (libraryDetailError || !libraryDetail?.results) {
    message.error("Kutubxona ma'lumotlarini yuklashda xatolik yuz berdi");
    return (
      <Result
        status="404"
        title="Kutubxona topilmadi"
        subTitle="Kechirasiz, so'ralgan kutubxona mavjud emas"
      />
    );
  }

  const libraryInfo = libraryDetail.results.library;
  const phone = libraryDetail.results.phone;
  const totalBooks = libraryDetail.results.total_books;
  
  const columns = [
    { title: 'Nomi', dataIndex: 'title', key: 'title' },
    { title: 'Muallif', dataIndex: 'author', key: 'author' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    {
      title: 'Holati',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean) => (
        <Text type={available ? 'success' : 'danger'}>
          {available ? 'Mavjud' : 'Band'}
        </Text>
      ),
    },
  ];

  return (
    <div className="library-detail">
      <Card title={<h2>{libraryInfo.name || 'Kutubxona'}</h2>} className="library-info">
        <div className="library-info-content">
          <div className="info-item">
            <strong>Manzil:</strong> {libraryInfo.address || 'Mavjud emas'}
          </div>
          <div className="info-item">
            <strong><PhoneOutlined style={{ marginRight: 8 }} />Telefon:</strong>{' '}
            {phone ? (
              <a href={`tel:${phone}`}>{phone}</a>
            ) : (
              'Telefon raqam mavjud emas'
            )}
          </div>
          <div className="info-item">
            <strong><BookOutlined style={{ marginRight: 8 }} />Kitoblar soni:</strong>{' '}
            {totalBooks !== undefined ? totalBooks : 'Ma\'lumot mavjud emas'}
          </div>
          <div className="info-item">
            <strong><SendOutlined style={{ marginRight: 8 }} />Telegram:</strong>{' '}
            {libraryInfo.social_media?.telegram ? (
              <a
                href={`https://${libraryInfo.social_media.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{libraryInfo.social_media.telegram.replace(/^.*\//, '')}
              </a>
            ) : (
              'Telegram manzil mavjud emas'
            )}
          </div>
          {libraryInfo.working_hours && (
            <div className="info-item">
              <strong>Ish vaqti:</strong> {libraryInfo.working_hours}
            </div>
          )}
          {libraryInfo.description && (
            <div className="description">{libraryInfo.description}</div>
          )}
        </div>
      </Card>

      {libraryInfo.google_maps_url && (
        <div className="map-container">
          <MapContainer
            center={[parseFloat(libraryInfo.latitude || '0'), parseFloat(libraryInfo.longitude || '0')]}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[parseFloat(libraryInfo.latitude || '0'), parseFloat(libraryInfo.longitude || '0')]}>
              <Popup>{libraryInfo.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <Card title={<h3>Kutubxona kitoblari</h3>} className="books-table">
        {booksError ? (
          <Result status="warning" title="Kitoblarni olishda muammo yuz berdi" />
        ) : (
          <Table
            dataSource={booksData?.content || []}
            columns={columns}
            rowKey="id"
            pagination={{
              total: booksData?.totalElements || 0,
              pageSize,
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default LibraryDetail;
