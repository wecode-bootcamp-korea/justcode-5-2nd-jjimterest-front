import React, { useRef, useState, useEffect } from 'react';
import css from './Setting.module.scss';
import styled from 'styled-components';
import Modal from '../../components/Myprofile/Modal';
import Profilefooter from '../../components/Profilefooter/Profilefooter';
import BASE_URL from '../../config';
import Nav from '../../components/Nav/Nav';

function Setting() {
  const [switchBtn, setSwitchBtn] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const imgInput = useRef();
  const [fileImage, setFileImage] = useState('');
  const [userName, setUserName] = useState();
  const [desc, setDesc] = useState();
  const [nickName, setNickName] = useState();
  const [imgUpload] = useState(new FormData());
  const reader = new FileReader();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M';

  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`${BASE_URL}edit-profile`, {
          method: 'GET',
          headers: {
            // Authorization: localStorage.getItem('login-token'),
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      setUserName(`${result[0].name}`);
      setNickName(`${result[0].nickname}`);
      setFileImage(`${result[0].profile_image}`);
    };
    fetchData();
  }, []);

  const view = imgInput => {
    if (imgInput.current.files[0]) {
      reader.readAsDataURL(imgInput.current.files[0]);

      reader.onload = e => {
        imgInput.current.src = e.target.result;
      };
      imgUpload.append('image', URL.createObjectURL(imgInput.current.files[0]));
    }
  };

  const profileEdit = () => {
    imgUpload.append('name', userName);
    imgUpload.append('nickname', nickName);
    imgUpload.append('intro', desc);

    fetch(`${BASE_URL}edit-profile`, {
      headers: {
        // Authorization: localStorage.getItem('login-token'),
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: imgUpload,
    }).then(res => {
      if (res.ok) {
        alert('????????????!');
      } else {
        alert('????????? ??????????????????!');
      }
    });
  };

  const saveFileImage = event => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
    view(imgInput);
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
        <div className={css.modalHeader}>?????? ??????</div>
        <div className={css.modalBtn} onClick={onImgInputBtnClick}>
          ?????? ??????
        </div>
      </Modal>
      <Nav />
      <div className={css.innerContainer}>
        <div className={css.sideBar}>
          <div className={css.sideBarContents}>
            <Div onClick={goToPublic} isSelected={switchBtn}>
              ?????? ?????????
            </Div>
            <Divv onClick={goToMan} isSelected={switchBtn}>
              ?????? ??????
            </Divv>
          </div>
        </div>
        <div className={css.mainContents}>
          <h1>?????? ?????????</h1>
          <div>
            ???????????? ???????????? ???????????? ??????????????? ?????? ????????? ???????????????.
          </div>
          <div className={css.inputContainer}>
            <div>??????</div>
            <div className={css.imgBox}>
              <div className={css.imgWrapper}>
                {fileImage &&
                  (fileImage !== null ? (
                    <img alt="sample" src={fileImage} className={css.mePhoto} />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/normal.png`}
                      className={css.mePhoto}
                    ></img>
                  ))}
              </div>
              <div className={css.imgBtn} onClick={openCreateModal}>
                ??????
              </div>
            </div>
            <div>??????</div>
            <input
              className={css.nameInput}
              onChange={inputHandlerU}
              value={userName && userName}
            />
            <div>??????</div>
            <textarea
              className={css.descInput}
              placeholder="???????????? ???????????? ???????????????."
              onChange={inputHandlerD}
              value={desc}
            />
            <div>???????????????</div>
            <input
              className={css.nickNameInput}
              onChange={inputHandlerN}
              value={nickName}
            />
          </div>
        </div>
      </div>
      <Profilefooter btn={profileEdit}></Profilefooter>
    </div>
  );
}

export default Setting;
