import React, { useEffect } from 'react';
import { Card, Spin, Avatar, Descriptions, Button, message, Form, Input, Modal, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useStore } from '../../hooks/useStore';
import axios from 'axios';
import './profile.css';

interface UserProfile {
  user: {
    name: string;
    phone: string;
    image?: string;
  };
  address: string;
  social_media: Record<string, string>;
  can_rent_books: boolean;
  latitude: string;
  longitude: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        message.error('Token topilmadi');
        navigate('/login');
        return;
      }

      const response = await axios.get('https://s-libraries.uz/api/v1/auth/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
    } catch (error) {
      console.error('Profile fetch error:', error);
      message.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (values: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        message.error('Token topilmadi');
        return;
      }

      const updateData = {
        user: {
          name: values.name,
          phone: values.phone
        },
        address: values.address,
        social_media: values.social_media || {},
        latitude: values.latitude || "",
        longitude: values.longitude || ""
      };

      await axios.patch('https://s-libraries.uz/api/v1/auth/profile/', updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      message.success("Profil muvaffaqiyatli yangilandi");
      setIsEditModalVisible(false);
      fetchProfile();
      
    } catch (error) {
      console.error('Profile update error:', error);
      message.error("Profilni yangilashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    if (profile) {
      form.setFieldsValue({
        name: profile.user.name,
        phone: profile.user.phone,
        address: profile.address,
        latitude: profile.latitude,
        longitude: profile.longitude
      });
    }
    setIsEditModalVisible(true);
  };

  const handleLogout = () => {
    try {
      navigate('/');
      
      localStorage.clear();
      setUser(null);
      
      message.success('Tizimdan muvaffaqiyatli chiqdingiz');
    } catch (err) {
      message.error('Chiqishda xatolik yuz berdi');
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <p>Profil ma'lumotlari topilmadi</p>
        <Button onClick={() => navigate('/login')}>Qayta kirish</Button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Card 
        className="profile-card" 
        title="Profilim" 
        extra={
          <Space>
            <Button icon={<EditOutlined />} type="link" onClick={handleEdit}>Tahrirlash</Button>
            <Button icon={<LogoutOutlined />} type="link" danger onClick={handleLogout}>Chiqish</Button>
          </Space>
        }
      >
        <div className="profile-main-info">
          <Avatar 
            size={100} 
            src={profile.user.image}
            icon={!profile.user.image ? <UserOutlined /> : undefined}
            className="profile-avatar" 
          />
          <div className="profile-user-details">
            <h2 className="profile-username">{profile.user.name}</h2>
            <p className="profile-phone">{profile.user.phone}</p>
          </div>
        </div>
        
        <Descriptions column={1}  bordered className="profile-descriptions">
          <Descriptions.Item label="Kitob ijarasi">{profile.can_rent_books ? 'Ruxsat berilgan' : 'Ruxsat berilmagan'}</Descriptions.Item>
          <Descriptions.Item label="Manzil">{profile.address || 'Mavjud emas'}</Descriptions.Item>
          {profile.latitude && <Descriptions.Item label="Latitude">{profile.latitude}</Descriptions.Item>}
          {profile.longitude && <Descriptions.Item label="Longitude">{profile.longitude}</Descriptions.Item>}
        </Descriptions>
      </Card>

      <Modal
        title="Profilni tahrirlash"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={updateProfile}
        >
          <Form.Item
            name="name"
            label="Ism"
            rules={[{ required: true, message: 'Iltimos, ismingizni kiriting' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Manzil"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Latitude"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;