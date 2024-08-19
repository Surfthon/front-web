import React, { useState } from 'react';
import './Search.scss';
import { Input, Button, Modal, message } from 'antd';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const { TextArea } = Input;

export default function Search() {
  const navigate = useNavigate();
  const [isQustionId, setIsQustionId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 저장할 state
  const [productInfo, setProductInfo] = useState(''); // TextArea 값을 담을 state
  const [previewData, setPreviewData] = useState([]); // 서버에서 받은 데이터를 저장할 state
  const [isPreviewAvailable, setIsPreviewAvailable] =
    useState(false); // 미리보기 버튼 가시성 제어
  const [isModalVisible, setIsModalVisible] =
    useState(false); // 모달의 가시성 제어

  const handleTextChange = (e) => {
    setProductInfo(e.target.value); // TextArea의 값이 변경될 때 state 업데이트
  };

  const handleSubmit = async () => {
    if (productInfo.trim() === '') {
      // productInfo가 빈 문자열인 경우 에러 메시지 표시
      message.error('입력 해주세요!');
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

        // response.data에서 questionList를 추출하고 비어 있는 문자열 필터링
        const questionList =
          response.data?.questionList || [];
        const filteredQuestionList = questionList.filter(
          (q) => q.trim() !== ''
        ); // 비어 있는 문자열 필터링
        setIsQustionId(response.data.id);
        // 필터링된 questionList를 상태 업데이트
        setPreviewData(filteredQuestionList);
        setIsPreviewAvailable(
          filteredQuestionList.length > 0
        );
        if (filteredQuestionList.length > 0)
          message.success('AI 요청 완료!');
        // 요청 성공 시 메시지 출력
        else {
          message.error('AI 요청 실패!');
        }
      }
    } catch (error) {
      console.error('서버 요청 에러:', error); // 요청 중 에러 발생 시 콘솔에 에러 출력
      message.error('서버 요청 중 오류가 발생했습니다.'); // 요청 실패 메시지 표시
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  const handlePreview = () => {
    setIsModalVisible(true); // 미리보기 버튼 클릭 시 모달을 보여줌
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // 모달 닫기
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="overlay"></div>
          <Loading text={'후기 폼을 생성중입니다'} />
        </>
      )}
      <div className="page">
        <div className="page-title">
          <h3>제품 설명</h3>
          {isPreviewAvailable && (
            <h3
              onClick={() =>
                navigate('/review', {
                  state: {
                    questionId: isQustionId,
                  },
                })
              }
            >
              후기 작성
              <FontAwesomeIcon
                icon={faPencil}
                style={{ marginLeft: 10 }}
              />
            </h3>
          )}
        </div>
        <TextArea
          rows={10}
          value={productInfo}
          onChange={handleTextChange}
        />
        <div className="buttons">
          <Button
            type="primary"
            className="button"
            onClick={handleSubmit}
          >
            AI 요청
          </Button>
          {isPreviewAvailable && (
            <Button
              type="default"
              className="button"
              onClick={handlePreview}
            >
              미리보기
            </Button>
          )}
        </div>
        <Modal
          title={
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: 40,
              }}
            >
              미리보기
            </h2>
          }
          visible={isModalVisible}
          onCancel={handleModalClose}
          closable={false} // X 버튼을 제거하려면 이 속성을 추가
          footer={[
            <Button key="close" onClick={handleModalClose}>
              닫기
            </Button>,
          ]}
        >
          {previewData.map((item, index) => (
            <div key={index} className="preview-item">
              <p className="pre-title">{item}</p>
              <Input className="pre-input" />
            </div>
          ))}
        </Modal>
      </div>
    </>
  );
}