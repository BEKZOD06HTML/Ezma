import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import './login.css';

const validationSchema = Yup.object({
    phone: Yup.string()
        .matches(/^\+998[0-9]{9}$/, 'Noto\'g\'ri telefon raqam formati')
        .required('Telefon raqam kiritilishi shart'),
    password: Yup.string()
        .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
        .required('Parol kiritilishi shart')
});

function Login() {
    const navigate = useNavigate();
    const { loginMutation } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const handleSubmit = async (values: { phone: string; password: string }) => {
        setIsLoading(true);
        try {
            await loginMutation.mutateAsync(values);
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-img">
                    <h1>ezma</h1>
                </div>
                <div className="login-form">

                    <h3>Tizimga kirish</h3>
                    <p>Platformadan to'liq foydalanish uchun tizimga kiring</p>
                    <Formik
                        initialValues={{ phone: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="login-form-inputs">
                            <div className="input-label-group">
                                <label>Telefon raqam</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    placeholder="+998901234567"
                                    className="login-form-input"
                                />
                                <ErrorMessage name="phone" component="span" className="error-message" />
                            </div>

                            <div className="input-label-group">
                                <div className="label-forgot-wrapper">
                                    <label>Parol</label>
                                </div>

                                <div className="password-input-wrapper">
                                    <Field
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Iltimos parolni kiriting"
                                        className="login-form-input"
                                    />
                                    <ErrorMessage name="password" component="span" className="error-message" />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility state
                                    >
                                        {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                className="login-submit-btn"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spin indicator={<LoadingOutlined />} /> : 'Tizimga kirish'}
                            </button>

                            <div className="register-link-wrapper">
                                <p>Hisobingiz yo'qmi? <Link to="/register" className="register-link">Ro'yxatdan o'ting</Link></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
