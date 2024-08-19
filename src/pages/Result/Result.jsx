import React from 'react';
import './Result.scss';
import { Pagination } from 'antd';
import Category from '../../components/Category/Category';

export default function Result() {
  // 검색 결과를 통한 카테고리 내용 받기

  // 검색 결과를 통해 받은 게시물 내용 받기


  return (
    <div className="page">
      <div className="categoryButtons">
        <button className="category-button"># AI</button>
        <button className="category-button">
          # 디자인
        </button>
        <button className="category-button"># 개발</button>
        <button className="category-button"># 기획</button>
        <button className="category-button"># 기타</button>
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
          <img src="" alt="공모전 포스터 사진" />
          <div className="dataFlexColumn">
            {/* 해당 공모전 카테고리 정보들 */}
            <div className="categorys">
              {<Category CategoryName={'AI'} />}
              {<Category CategoryName={'AI'} />}
            </div>
            <h1>공모전 제목</h1>
            <span>공모전 주최</span>
            <span>D-12</span>
            <button>자세히</button>
          </div>
        </div>
      </div>
    </div>
  );
}
