import React from 'react';
import { Carousel, Collapse, Typography, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './AboutPage.module.css';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Aziz Rakhimov",
      role: "Loyiha rahbari",
      image: "/team/leader.jpg",
      description: "5 yillik tajribaga ega dasturiy ta'minot muhandisi"
    },
    {
      id: 2,
      name: "Malika Karimova",
      role: "UI/UX Dizayner",
      image: "/team/designer.jpg",
      description: "Foydalanuvchi interfeyslarini yaratish bo'yicha mutaxassis"
    },
    {
      id: 3,
      name: "Jamshid Toshmatov",
      role: "Backend Dasturchi",
      image: "/team/backend.jpg",
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
      <div className={styles.heroSection}>
        <Title level={1}>Biz haqimizda</Title>
        <Paragraph>
          O'zbekiston kutubxonalari elektron katalogini yaratish orqali bilimga bo'lgan yo'lni osonlashtirish bizning asosiy maqsadimiz
        </Paragraph>
      </div>

      <div className={styles.carouselSection}>
        <Title level={2}>Bizning jamoa</Title>
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
                    <Title level={3}>{member.name}</Title>
                    <Title level={4} className={styles.memberRole}>{member.role}</Title>
                    <Paragraph>{member.description}</Paragraph>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles.faqSection}>
        <Title level={2}>Ko'p so'raladigan savollar</Title>
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
              <Paragraph>{item.answer}</Paragraph>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default AboutPage; 