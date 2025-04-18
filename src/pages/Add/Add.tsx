import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './add.css';

const AddBooks = () => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publisher: '',
    quantity_in_library: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Token topilmadi. Iltimos, qaytadan login qiling.');
      return;
    }

    try {
      const response = await axios.post(
        'https://s-libraries.uz/api/v1/books/add-books/',
        [formData],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Kitob muvaffaqiyatli qo\'shildi!');
      setFormData({
        name: '',
        author: '',
        publisher: '',
        quantity_in_library: '',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Xatolik:', error);
      toast.error('Kitob qo\'shishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="add-book-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
      />
      <div className="add-book-content">
        <div className="add-book-form-wrapper">
          <h2 className="add-book-title">Yangi kitob qo'shish</h2>
          <form onSubmit={handleSubmit} className="add-book-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Kitob nomi"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="author"
                placeholder="Muallif"
                value={formData.author}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="publisher"
                placeholder="Nashriyot"
                value={formData.publisher}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="quantity_in_library"
                placeholder="Kutubxonadagi soni"
                value={formData.quantity_in_library}
                onChange={handleChange}
                required
                min={1}
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-btn">Qo'shish</button>
          </form>
        </div>
        <div className="illustration-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <rect x="50" y="50" width="400" height="400" fill="#0B2D2D" rx="20"/>
            <text x="100" y="200" fontSize="40" fill="#FFD700">Yangi</text>
            <text x="100" y="250" fontSize="40" fill="#FFD700">Kitob</text>
            <text x="100" y="300" fontSize="40" fill="#FFD700">Qo'shish</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
