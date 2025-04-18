import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookOutlined } from '@ant-design/icons';
import './add.css';
const AddBooks = () => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publisher: '',
    quantity_in_library: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Token topilmadi. Iltimos, qaytadan login qiling.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('publisher', formData.publisher);
      formDataToSend.append('quantity_in_library', formData.quantity_in_library);
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      const response = await axios.post(
        'https://s-libraries.uz/api/v1/books/add-books/',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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
      setSelectedFile(null);
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
            <div className="form-group">
              <label className="file-upload-btn">
                Excel faylini yuklash
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </label>
              {selectedFile && (
                <p className="file-name">Tanlangan fayl: {selectedFile.name}</p>
              )}
            </div>
            <button type="submit" className="submit-btn">Qo'shish</button>
          </form>
        </div>
        <div className="illustration-wrapper">
        < BookOutlined style={{fontSize: '100px', color: '#0B2D2D'}} />
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
