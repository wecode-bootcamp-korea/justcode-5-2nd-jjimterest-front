import React, { useEffect, useRef, useState } from 'react';
import BoardList from '../BoardList/BoardList';
import css from './Createpinfeed.module.scss';
import BASE_URL from '../../config';

function Createpinfeed({ index, deletepin }) {
  const [boadData, setBoardData] = useState({});
  const [altBtnOn, setAltBtnOn] = useState(true);
  const [altOn, setAltOn] = useState(false);
  const input = useRef();
  const img = useRef();
  const [on, setOn] = useState(false);
  const reader = new FileReader();
  const imgUpload = new FormData();
  const [onBoradList, setOnBoradList] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/pin-make`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setBoardData(data);
      });
  }, []);

  const view = input => {
    setOn(true);
    if (input.current.files[0]) {
      reader.readAsDataURL(input.current.files[0]);

      reader.onload = e => {
        img.current.src = e.target.result;
      };
      imgUpload.append('image', input.current.files[0]);
    }
  };
  const pinMake = () => {
    fetch(`${BASE_URL}/pin-make`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=something',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
      body: imgUpload,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };
  return (
    <div className={css.pageOutLine}>
      <button className={css.delete} onClick={() => deletepin(index)}>
        X
      </button>
      <div className={css.nav}>
        <div className={css.wrapBoardBtn}>
          <button
            className={css.selectBtn}
            onClick={() => {
              setOnBoradList(prev => !prev);
            }}
          >
            {onBoradList ? 'boardname' : '보드를선택하세요'}
            {onBoradList ? <BoardList /> : null}
          </button>
          <button className={css.storeBtn} onClick={pinMake}>
            저장
          </button>
        </div>
      </div>
      <div className={css.wrapContents}>
        <div className={css.upload}>
          {on ? <img ref={img} className={css.previewImage} /> : null}
          <input
            className={css.uploadInput}
            ref={input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={() => {
              view(input);
            }}
          />
          {on ? null : (
            <p className={css.uploadText}>드래그하거나 클릭하여 업로드</p>
          )}
          {on ? null : (
            <p className={css.uplodInfo}>
              권장 사항: 20MB 이하 고화질 .jpg 파일
            </p>
          )}
        </div>
        <div className={css.info}>
          <input className={css.title} placeholder="제목 추가"></input>
          <div className={css.userInfo}>
            <img className={css.userImg}>{boadData.img}</img>
            <p className={css.userName}>{boadData.name}</p>
          </div>
          <input
            className={css.pinInfo}
            placeholder="핀에 대해 설명해 주세요"
          />
          {altBtnOn ? (
            <button
              className={css.pinAltBtn}
              onClick={() => {
                setAltOn(true);
                setAltBtnOn(false);
              }}
            >
              alt 텍스트 추가
            </button>
          ) : null}
          {altOn ? <input /> : null}
          <input
            className={css.pinAltInput}
            placeholder="핀에 무엇이 표시되는지 설명합니다."
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Createpinfeed;
