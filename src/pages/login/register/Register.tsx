import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import useAuth from '../../../hooks/useAuth';
import './register.css';

interface RegisterFormData {
  user: {
    password: string;
    name: string;
    phone: string;
  };
  library: {
    address: string;
    social_media: Record<string, string>;
    can_rent_books: boolean;
    latitude: string;
    longitude: string;
  };
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerLibraryMutation } = useAuth();

  const onFinish = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      await registerLibraryMutation.mutateAsync(values);
      message.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      navigate('/login');
    } catch (error) {
      message.error("Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const transformFormData = (values: any): RegisterFormData => {
    return {
      user: {
        name: values.name,
        password: values.password,
        phone: values.phone,
      },
      library: {
        address: values.address,
        social_media: { url: values.social_media },
        can_rent_books: values.can_rent_books || false,
        latitude: values.latitude.toString(),
        longitude: values.longitude.toString(),
      }
    };
  };

  return (
    <div className="register">
      <div className="register-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> Orqaga
        </button>
        
        <div className="register-header">
          <h1>Kutubxona hisobini yaratish</h1>
          <p>Kutubxonangizni ro'yxatdan o'tkazish uchun quyidagi ma'lumotlarni kiriting</p>
        </div>

        <Form
          name="register"
          onFinish={(values) => onFinish(transformFormData(values))}
          layout="vertical"
          className="register-form"
        >
          <div className="form-section">
            <h3>Asosiy ma'lumotlar</h3>
            <Form.Item
              label="Kutubxona nomi"
              name="name"
              rules={[{ required: true, message: 'Iltimos, kutubxona nomini kiriting' }]}
            >
              <Input placeholder="Kutubxona nomini kiriting" />
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[{ required: true, message: 'Iltimos, parolni kiriting' }]}
            >
              <Input.Password placeholder="Parolni kiriting" />
            </Form.Item>

            <Form.Item
              label="Telefon raqami"
              name="phone"
              rules={[
                { required: true, message: 'Iltimos, telefon raqamini kiriting' },
                { pattern: /^\+998[0-9]{9}$/, message: "Noto'g'ri telefon raqam formati" }
              ]}
            >
              <Input placeholder="+998901234567" />
            </Form.Item>
          </div>

          <div className="form-section">
            <h3>Kutubxona ma'lumotlari</h3>
            <Form.Item
              label="Manzil"
              name="address"
              rules={[{ required: true, message: 'Iltimos, manzilni kiriting' }]}
            >
              <Input.TextArea placeholder="Kutubxona manzilini kiriting" />
            </Form.Item>

            <Form.Item
              label="Ijtimoiy tarmoqlar"
              name="social_media"
            >
              <Input placeholder="Ijtimoiy tarmoq havolalarini kiriting" />
            </Form.Item>

            <Form.Item
              label="Kenglik"
              name="latitude"
              rules={[{ required: true, message: 'Iltimos, kenglikni kiriting' }]}
            >
              <Input type="number" placeholder="Masalan: 41.123456" />
            </Form.Item>

            <Form.Item
              label="Uzunlik"
              name="longitude"
              rules={[{ required: true, message: 'Iltimos, uzunlikni kiriting' }]}
            >
              <Input type="number" placeholder="Masalan: 69.123456" />
            </Form.Item>

           
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="register-submit-btn"
            >
              Ro'yxatdan o'tish
            </Button>
          </Form.Item>
        </Form>

        <div className="login-link-wrapper">
          Hisobingiz bormi? <a href="/login" className="login-link">Tizimga kiring</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
