import React from 'react';
import { Carousel, Collapse, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './AboutPage.module.css';

const { Panel } = Collapse;

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Aziz Rakhimov",
      role: "Loyiha rahbari",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "5 yillik tajribaga ega dasturiy ta'minot muhandisi"
    },
    {
      id: 2,
      name: "Malika Karimova",
      role: "UI/UX Dizayner",
      image: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Foydalanuvchi interfeyslarini yaratish bo'yicha mutaxassis"
    },
    {
      id: 3,
      name: "Jamshid Toshmatov",
      role: "Backend Dasturchi",
      image: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Ma'lumotlar bazasi va server tomonini boshqarish bo'yicha mutaxassis"
    }
  ];

  const faqItems = [
    {
      question: "Tizimdan foydalanish pullikmi?",
      answer: "Yo'q, tizimdan foydalanish to'liq bepul. Siz istalgan vaqtda kitoblarni qidirish va kutubxonalar haqida ma'lumot olishingiz mumkin."
    },
    {
      question: "Qanday qilib kitob buyurtma qilish mumkin?",
      answer: "Kerakli kitobni topganingizdan so'ng, kutubxonaga tashrif buyurib, a'zolik kartangiz orqali kitobni olishingiz mumkin."
    },
    {
      question: "Kitobni qancha muddatga olish mumkin?",
      answer: "Odatda kitoblar 14 kun muddatga beriladi. Zarur bo'lsa, bu muddatni kutubxona bilan kelishgan holda uzaytirish mumkin."
    },
    {
      question: "Tizimda qanday kutubxonalar mavjud?",
      answer: "Bizning tizimda O'zbekistonning barcha viloyatlaridagi davlat kutubxonalari va ko'plab xususiy kutubxonalar ma'lumotlari jamlangan."
    },
    {
      question: "Agar kerakli kitob topilmasa nima qilish kerak?",
      answer: "Agar siz qidirayotgan kitob topilmasa, kutubxona ma'muriyatiga so'rov yuborishingiz mumkin. Ular imkon qadar kitobni topishga yordam berishadi."
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <div className={styles.carouselSection}>
        <h2>Bizning jamoa</h2>
        <Carousel
          autoplay
          className={styles.carousel}
          dots={true}
          arrows={true}
          autoplaySpeed={5000}
          pauseOnHover={true}
          draggable={false}
          swipe={false}
        >
          {teamMembers.map(member => (
            <div key={member.id} className={styles.carouselSlide}>
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={12}>
                  <div className={styles.memberImage}>
                    <img src={member.image} alt={member.name} />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className={styles.memberInfo}>
                    <h3>{member.name}</h3>
                    <h4 className={styles.memberRole}>{member.role}</h4>
                    <p>{member.description}</p>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles.faqSection}>
        <h2 >Ko'p so'raladigan savollar</h2>
        <Collapse 
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className={styles.faqCollapse}
        >
          {faqItems.map((item, index) => (
            <Panel 
              header={item.question} 
              key={index}
              className={styles.faqPanel}
            >
              <p>{item.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default AboutPage; 