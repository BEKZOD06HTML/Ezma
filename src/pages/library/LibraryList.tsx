import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { useGetLibrary } from '../../hooks/useLibrary';
import LibraryCard from './card';
import styles from './LibraryList.module.css';

const ITEMS_PER_PAGE = 8;

const LibrariesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { library, libraryError } = useGetLibrary();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (libraryError) {
    return (
      <div className={styles.errorMessage}>
        Xatolik: {libraryError.message}
      </div>
    );
  }

  const matchedLibraries = (library || []).filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = matchedLibraries.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = matchedLibraries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Kutubxonalar ro'yxati</h1>

        <div className={styles.searchWrap}>
          <SearchOutlined className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Nom bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchField}
          />
        </div>

        <div className={styles.gridWrapper}>
          {visibleItems.length > 0 ? (
            visibleItems.map((lib: any) => (
              <LibraryCard key={lib.id} lib={lib} viewMode="grid" />
            ))
          ) : (
            <p className={styles.emptyMessage}>Hech qanday natija topilmadi.</p>
          )}
        </div>

        {totalItems > ITEMS_PER_PAGE && (
          <Pagination
            className={styles.pager}
            current={currentPage}
            total={totalItems}
            pageSize={ITEMS_PER_PAGE}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        )}
      </div>
    </section>
  );
};

export default LibrariesPage;
