import React, { useState } from 'react';
import './Result.scss';
import { Pagination } from 'antd';
import Category from '../../components/Category/Category';

export default function Result() {
  // 버튼 배열
  const categories = [
    'AI',
    '디자인',
    '개발',
    '기획',
    '기타',
  ];

  // 클릭된 버튼 상태 관리
  const [selectedCategories, setSelectedCategories] =
    useState(
      categories.map(() => false) // 초기 상태는 모두 false (클릭되지 않은 상태)
    );

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = (index) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] =
      !newSelectedCategories[index]; // 클릭할 때마다 토글
    setSelectedCategories(newSelectedCategories);

    // false인 값들만 console.log로 출력
    const unselectedCategories = newSelectedCategories
      .map((selected, i) =>
        selected ? null : categories[i]
      )
      .filter((category) => category !== null);

    console.log('살아 남은 값:', unselectedCategories);
  };

  return (
    <div className="page">
      <div className="category-background">
        <div className="categoryButtons">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-button ${
                selectedCategories[index] ? 'selected' : ''
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              # {category}
            </button>
          ))}
        </div>
      </div>
      <div className="searchResults">
        {/* 공모전 검색 결과  */}
        <div className="result">
          <img
            src="https://cf-cpi.campuspick.com/activity/1723091338188966.jpg"
            alt="공모전 포스터 사진"
          />
          <div className="dataFlexColumn">
            {/* 해당 공모전 카테고리 정보들 */}
            <div className="categorys">
              {<Category CategoryName={'AI'} />}
              {<Category CategoryName={'AI'} />}
            </div>
            <div className="data">
              <span className="title">공모전 타이틀</span>
              <span className="host">공모전 주최</span>
              <span className="day">D-12</span>
            </div>
            <button>자세히</button>
          </div>
        </div>
        {/*  */}
        <div className="result">
          <img
            src="https://cf-cpi.campuspick.com/activity/1723091338188966.jpg"
            alt="공모전 포스터 사진"
          />
          <div className="dataFlexColumn">
            {/* 해당 공모전 카테고리 정보들 */}
            <div className="categorys">
              {<Category CategoryName={'AI'} />}
              {<Category CategoryName={'AI'} />}
            </div>
            <div className="data">
              <span className="title">공모전 타이틀</span>
              <span className="host">공모전 주최</span>
              <span className="day">D-12</span>
            </div>
            <button>자세히</button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 0 ',
        }}
      >
        <Pagination defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}
