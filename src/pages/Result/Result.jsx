import React, { useState, useEffect, useRef } from 'react';
import './Result.scss';
import { Pagination, message } from 'antd';
import Category from '../../components/Category/Category';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Result() {
  const location = useLocation();
  const [listData, setListData] = useState(
    location.state?.listData || []
  );
  const messageDisplayedRef = useRef(false);

  useEffect(() => {
    if (
      !messageDisplayedRef.current &&
      (!listData || listData.length === 0)
    ) {
      message.warning('찾는 결과가 없습니다');
      messageDisplayedRef.current = true;
    }
  }, [listData]);

  // 중복된 title 제거
  const uniqueListData = listData.reduce((acc, current) => {
    const x = acc.find(
      (item) => item.title === current.title
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // 날짜 기준 오름차순 정렬
  const sortedListData = uniqueListData.sort(
    (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
  );

  // 카테고리 추출 및 중복 제거
  const categories = Array.from(
    new Set(sortedListData.flatMap((item) => item.category))
  );

  // 클릭된 버튼 상태 관리
  const [selectedCategories, setSelectedCategories] =
    useState(
      categories.map(() => false) // 초기 상태는 모두 false (클릭되지 않은 상태)
    );

  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 선택되지 않은 카테고리 필터링
  const filteredListData = sortedListData.filter((item) =>
    item.category.some((cat) => {
      const catIndex = categories.indexOf(cat);
      return (
        catIndex !== -1 && !selectedCategories[catIndex]
      );
    })
  );

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = (index) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] =
      !newSelectedCategories[index]; // 클릭할 때마다 토글
    setSelectedCategories(newSelectedCategories);

    // 페이지를 다시 첫 페이지로 설정
    setCurrentPage(1);

    // 선택되지 않은 카테고리 목록 출력
    const unselectedCategories = newSelectedCategories
      .map((selected, i) =>
        selected ? null : categories[i]
      )
      .filter((category) => category !== null);

    console.log(
      '선택되지 않은 카테고리:',
      unselectedCategories
    );
  };

  // 카테고리 영역 가시성 상태 관리
  const [isCategoryVisible, setIsCategoryVisible] =
    useState(true);

  // 버튼 클릭 핸들러 - 카테고리 가시성 토글 및 아이콘 변경
  const handleCenterButtonClick = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  return (
    <div className="page">
      {isCategoryVisible && (
        <div className="category-background">
          <div className="categoryButtons">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${
                  selectedCategories[index]
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                # {category}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="center-box">
        <button
          className="center-button"
          onClick={handleCenterButtonClick}
        >
          <FontAwesomeIcon
            icon={
              isCategoryVisible ? faCaretUp : faCaretDown
            }
          />
        </button>
      </div>
      <div className="searchResults">
        {/* 공모전 검색 결과  */}
        {currentItems.map((item, index) => (
          <div key={index} className="result">
            <img
              className="post-image"
              src={item.imageUrl} //서버에서는 이걸로 가져오면 됨
              alt={`${item.title} 포스터`}
            />
            <div className="dataFlexColumn">
              {/* 해당 공모전 카테고리 정보들 */}
              <div className="categorys">
                {item.category.map((cat, idx) => (
                  <Category key={idx} CategoryName={cat} />
                ))}
              </div>
              <div className="data">
                <span className="title">{item.title}</span>
                <span className="host">{item.host}</span>
                <span
                  className="day"
                  style={{
                    color:
                      Math.ceil(
                        (new Date(item.deadLine) -
                          new Date()) /
                          (1000 * 60 * 60 * 24)
                      ) <= 10
                        ? 'red'
                        : 'inherit',
                  }}
                >
                  {Math.ceil(
                    (new Date(item.deadLine) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  ) <= 0
                    ? 'D-day'
                    : `D-${Math.ceil(
                        (new Date(item.deadLine) -
                          new Date()) /
                          (1000 * 60 * 60 * 24)
                      )}`}
                </span>
              </div>

              <div className="detail-box">
                <button
                  className="detail-button"
                  onClick={() =>
                    window.open(item.contestUrl, '_blank')
                  }
                >
                  자세히
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 0 ',
        }}
      >
        <Pagination
          current={currentPage}
          total={filteredListData.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
