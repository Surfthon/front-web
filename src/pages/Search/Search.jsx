import React, { useState } from 'react';
import './Search.scss';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

export default function Search() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 저장할 state
  const [productInfo, setProductInfo] = useState(''); // TextArea 값을 담을 state
  const [listData, setListData] = useState([]); // 검색 결과를 담을 state

  const handleTextChange = (e) => {
    setProductInfo(e.target.value); // TextArea의 값이 변경될 때 state 업데이트
  };

  const handleSubmit = async () => {
    if (productInfo.trim() === '') {
      navigate('/result');
      // productInfo가 빈 문자열인 경우 에러 메시지 표시
      // message.error('입력 해주세요!');
      return;
    }
    console.log('서버에 보내는 값', productInfo);
    setIsLoading(true); // 요청을 보내기 전 로딩 상태로 변경
    try {
      const response = await axios.post(
        'https://betatest.p-e.kr/api/question',
        {
          productDescription: productInfo,
        }
      );

      if (response.status === 201) {
        console.log('서버 응답:', response.data);
        setListData(response.data);
        navigate('/result', {
          state: { listData: response.data },
        });
      }
    } catch (error) {
      console.error('서버 요청 에러:', error); // 요청 중 에러 발생 시 콘솔에 에러 출력
      message.error('서버 요청 중 오류가 발생했습니다.'); // 요청 실패 메시지 표시
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div className="page-background">
      {isLoading && (
        <>
          <div className="overlay"></div>
          <Loading text={'후기 폼을 생성중입니다'} />
        </>
      )}
      <div className="search-page">
        <div className="page-title">
          <p className="page-title-text">제품 설명</p>
        </div>
        <TextArea
          rows={10}
          value={productInfo}
          onChange={handleTextChange}
        />

        <div className="buttons">
          <button
            className="detail-button"
            onClick={handleSubmit}
          >
            AI 요청
          </button>
        </div>
      </div>
    </div>
  );
}
