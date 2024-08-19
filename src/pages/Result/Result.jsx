import React, { useState, useEffect } from 'react';
import './Result.scss';
import { Pagination } from 'antd';
import Category from '../../components/Category/Category';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Result() {
  const location = useLocation();

  // 예시 데이터
  const exampleData = [
    {
      title: 'AI 공모전',
      imageUrl: 'https://example.com/image1.jpg',
      contestUrl: 'https://example.com/contest1',
      deadLine: '2024-12-31',
      host: 'AI 주최기관',
      category: [
        'AI',
        '데이터 분석',
        '머신러닝',
        '딥러닝',
        '기술',
      ],
    },
    {
      title: '디자인 혁신 공모전',
      imageUrl: 'https://example.com/image2.jpg',
      contestUrl: 'https://example.com/contest2',
      deadLine: '2024-11-30',
      host: '디자인 협회',
      category: [
        '디자인',
        'UI/UX',
        '그래픽 디자인',
        '제품 디자인',
        '브랜딩',
      ],
    },
    {
      title: '개발자 경진대회',
      imageUrl: 'https://example.com/image3.jpg',
      contestUrl: 'https://example.com/contest3',
      deadLine: '2024-10-15',
      host: 'IT 커뮤니티',
      category: [
        '개발',
        '프로그래밍',
        '웹 개발',
        '모바일 개발',
        '오픈소스',
      ],
    },
    {
      title: '기획 아이디어 공모전',
      imageUrl: 'https://example.com/image4.jpg',
      contestUrl: 'https://example.com/contest4',
      deadLine: '2024-09-20',
      host: '기획자 모임',
      category: [
        '기획',
        '창의성',
        '아이디어',
        '비즈니스',
        '마케팅',
      ],
    },
    {
      title: '환경 보호 공모전',
      imageUrl: 'https://example.com/image5.jpg',
      contestUrl: 'https://example.com/contest5',
      deadLine: '2024-08-25',
      host: '환경부',
      category: [
        '환경',
        '지속 가능성',
        '생태계 보호',
        '재활용',
        '에너지 절약',
      ],
    },
    // 예시 데이터 추가
  ];

  // location에서 listData를 받아옴, 없으면 예시 데이터로 설정
  const listData = location.state?.listData || exampleData;

  // 카테고리 추출 및 중복 제거
  const categories = Array.from(
    new Set(listData.flatMap((item) => item.category))
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
  const filteredListData = listData.filter((item) =>
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
              // src={item.imageUrl} 서버에서는 이걸로 가져오면 됨
              src="https://cf-cpi.campuspick.com/activity/1723091338188966.jpg"
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
                  D-
                  {Math.ceil(
                    (new Date(item.deadLine) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </span>
              </div>
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
