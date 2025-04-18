import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Library } from '../../types/Lib';
import { useGetLibraryDetail } from '../../hooks/useLibrary';
import { BookOutlined, SendOutlined } from '@ant-design/icons';
import styles from './card.module.css';

interface LibraryCardProps {
  lib: Library;
  viewMode: 'grid' | 'list';
}

const LibraryCard: React.FC<LibraryCardProps> = ({ lib, viewMode }) => {
  const navigate = useNavigate();
  const { libraryDetail } = useGetLibraryDetail(lib.id.toString());

  const wrapperClass = viewMode === 'grid'
    ? styles.cardContainer
    : `${styles.cardContainer} ${styles.listLayout}`;

  const handleClick = () => {
    navigate(`/library/${lib.id}`);
  };

  return (
    <div className='body'>
          <div className={wrapperClass} onClick={handleClick}>
      <div className={styles.cardTop}>
        <div className={styles.cardVisual}>
          {lib.image
            ? <img src={lib.image} alt={lib.name} className={styles.coverImage} />
            : (
              <div className={styles.placeholder}>
                <BookOutlined className={styles.iconPlaceholder} />
              </div>
            )
          }
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{lib.name}</h3>

        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <BookOutlined className={styles.detailIcon} />
            <span>{lib.total_books} Kitob</span>
          </div>
          
          <div className={styles.detailItem}>
            <SendOutlined className={styles.detailIcon} />
            <span>
              {libraryDetail?.results?.library?.social_media?.telegram ? (
                <a
                  href={`https://${libraryDetail.results.library.social_media.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{libraryDetail.results.library.social_media.telegram.replace(/^.*\//, '')}
                </a>
              ) : (
                'Telegram manzil yo\'q'
              )}
            </span>
          </div>
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default LibraryCard;
