import React, { useRef, useState, useEffect } from 'react';
import css from './Setting.module.scss';
import styled from 'styled-components';
import Modal from '../../components/Myprofile/Modal';
import Profilefooter from '../../components/Profilefooter/Profilefooter';
import { BASE_URL } from '../../config';

function Setting() {
  const [switchBtn, setSwitchBtn] = useState(false);
  const [userName, setUserName] = useState('');
  const [desc, setDesc] = useState('');
  const [web, setWeb] = useState('');
  const [nickName, setNickName] = useState('');
  const [createModal, setCreateModal] = useState(false);
  const imgInput = useRef();
  const [fileImage, setFileImage] = useState('');
  const [setting, SetSetting] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjU4MTk0OTQzfQ.NCdRjQSoDGLAKuarZU7WTXDWnYWwwc6JLEjoFNEMyM0';

  useEffect(() => {
    fetch(`http://localhost:10010/edit-profile`, {
      method: 'GET',
      headers: {
        // Authorization: localStorage.getItem('access_token'),
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        SetSetting(res);
      });
  }, []);
  console.log(setting);

  const saveFileImage = event => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const onImgInputBtnClick = event => {
    event.preventDefault();
    imgInput.current.click();
    setCreateModal(false);
  };

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const inputHandlerU = e => {
    setUserName(e.target.value);
  };
  const inputHandlerD = e => {
    setDesc(e.target.value);
  };
  const inputHandlerW = e => {
    setWeb(e.target.value);
  };
  const inputHandlerN = e => {
    setNickName(e.target.value);
  };

  const goToPublic = () => {
    setSwitchBtn(false);
  };
  const goToMan = () => {
    setSwitchBtn(true);
    window.location.href = `/settings/account-settings`;
  };

  const Div = styled.div`
    padding: 8px;
    font-weight: 700;
    margin: 10px;
    border-bottom: ${switchBtn ? 'none' : 'solid black 4px'};
    ${switchBtn
      ? `&:hover {
        cursor: pointer;
      border-radius: 5px;
      background-color: #efefef;
    }`
      : ''}
  `;
  const Divv = styled.div`
    padding: 8px;
    font-weight: 700;
    margin: 10px;
    border-bottom: ${switchBtn ? 'solid black 4px' : 'none'};
    ${switchBtn
      ? ''
      : ` &:hover {
      cursor: pointer;
      border-radius: 5px;
      background-color: #efefef;
    }`}
  `;
  return (
    <div className={css.container}>
      <input
        className={css.imgInput}
        name="imggeUpload"
        type="file"
        accept="image/*"
        onChange={saveFileImage}
        ref={imgInput}
      />
      <Modal visible={createModal} onClose={closeCreateModal}>
        <div className={css.modalHeader}>사진 변경</div>
        <div className={css.modalBtn} onClick={onImgInputBtnClick}>
          사진 선택
        </div>
      </Modal>
      <div className={css.innerContainer}>
        <div className={css.sideBar}>
          <div className={css.sideBarContents}>
            <Div onClick={goToPublic} isSelected={switchBtn}>
              공개 프로필
            </Div>
            <Divv onClick={goToMan} isSelected={switchBtn}>
              계정 관리
            </Divv>
          </div>
        </div>
        <div className={css.mainContents}>
          <h1>공개 프로필</h1>
          <div>
            회원님의 프로필을 방문하는 사용자에게 다음 정보가 표시됩니다.
          </div>
          <div className={css.inputContainer}>
            <div>사진</div>
            <div className={css.imgBox}>
              <div className={css.imgWrapper}>
                {fileImage ? (
                  <img alt="sample" src={fileImage} className={css.mePhoto} />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/KakaoTalk_Photo_2022-07-12-14-22-49.jpeg`}
                    className={css.mePhoto}
                  ></img>
                )}
              </div>
              <div className={css.imgBtn} onClick={openCreateModal}>
                변경
              </div>
            </div>
            <div>이름</div>
            <input
              className={css.nameInput}
              onChange={inputHandlerU}
              value={userName}
            />
            <div>소개</div>
            <textarea
              className={css.descInput}
              placeholder="회원님의 이야기를 들려주세요."
              onChange={inputHandlerD}
              value={desc}
            />
            <div>웹사이트</div>
            <input
              className={css.webInput}
              placeholder="회원님의 사이트로 트래픽을 유도하는 링크를 추가하세요."
              onChange={inputHandlerW}
              value={web}
            />
            <div>사용자이름</div>
            <input
              className={css.nickNameInput}
              onChange={inputHandlerN}
              value={nickName}
            />
          </div>
        </div>
      </div>
      <Profilefooter></Profilefooter>
    </div>
  );
}

export default Setting;
