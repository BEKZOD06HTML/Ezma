import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  CompassOutlined
} from '@ant-design/icons';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  const ExternalLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
      {children}
    </a>
  );

  return (
    <AntFooter className={styles.footer}>
      <div className={styles.footerContent}>
        <Row gutter={[64, 32]} justify="space-between">
          <Col xs={24} sm={8}>
            <div className={styles.logoSection}>
              <h1 className={styles.logo_footer}>Ezma</h1>
              <Text className={styles.copyright}>
                © {new Date().getFullYear()} Ezma<br />
                All rights reserved.
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={16}>
            <Row gutter={[32, 24]}>
              <Col xs={12} sm={8}>
                <Title level={5} className={styles.columnTitle}>
                  <CompassOutlined className={styles.titleIcon} /> Explore
                </Title>
                <Space direction="vertical" className={styles.linkGroup}>
                  <Link to="/books"><BookOutlined /> Books</Link>
                  <Link to="/journals">Journals</Link>
                  <Link to="/resources">Digital Resources</Link>
                  <Link to="/events">Events</Link>
                </Space>
              </Col>

              <Col xs={12} sm={8}>
                <Title level={5} className={styles.columnTitle}>
                  <FacebookOutlined className={styles.titleIcon} /> Connect
                </Title>
                <Space direction="vertical" className={styles.linkGroup}>
                  <ExternalLink to="https://facebook.com"><FacebookOutlined /> Facebook</ExternalLink>
                  <ExternalLink to="https://twitter.com"><TwitterOutlined /> Twitter</ExternalLink>
                  <ExternalLink to="https://instagram.com"><InstagramOutlined /> Instagram</ExternalLink>
                  <ExternalLink to="https://youtube.com"><YoutubeOutlined /> YouTube</ExternalLink>
                </Space>
              </Col>

              <Col xs={12} sm={8}>
                <Title level={5} className={styles.columnTitle}>
                  <CustomerServiceOutlined className={styles.titleIcon} /> Support
                </Title>
                <Space direction="vertical" className={styles.linkGroup}>
                  <Link to="/faqs">FAQs</Link>
                  <Link to="/help">Help Desk</Link>
                  <Link to="/feedback">Feedback</Link>
                  <Link to="/policies">Policies</Link>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
