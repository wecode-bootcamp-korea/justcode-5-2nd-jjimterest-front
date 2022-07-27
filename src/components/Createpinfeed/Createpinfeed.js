import React, { useEffect, useRef, useState } from 'react';
import BoardList from '../BoardList/BoardList';
import css from './Createpinfeed.module.scss';
import BASE_URL from '../../config';

function Createpinfeed({ index, deletepin }) {
  const btn = useRef();
  const [boadData, setBoardData] = useState();
  const [altBtnOn, setAltBtnOn] = useState(true);
  const [altOn, setAltOn] = useState(false);
  const [imgUpload] = useState(new FormData());
  const input = useRef();
  const img = useRef();
  const [on, setOn] = useState(false);
  const reader = new FileReader();
  const [onBoradList, setOnBoradList] = useState(false);
  const myImg = localStorage.getItem('myimg');
  const [boardtitle, setBoardTitle] = useState();
  const [pinInfo, setPinInfo] = useState({
    title: null,
    intro: null,
    alt: null,
    category: null,
    board_id: 2,
  });

  const handleInput = e => {
    const { value, name } = e.target;
    setPinInfo(prev => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    fetch(`${BASE_URL}pin-make`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjU4OTA1MjA0fQ.x_jRAVfJ1F72Z7gfmQOTspY5B3Hi8I-ko6_DFasLwnY',
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
    imgUpload.append('title', pinInfo.title);
    imgUpload.append('alt', pinInfo.alt);
    imgUpload.append('intro', pinInfo.intro);
    imgUpload.append('boardId', pinInfo.board_id);
    imgUpload.append('category', pinInfo.category);

    fetch(`${BASE_URL}pin-make`, {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjU4OTA1MjA0fQ.x_jRAVfJ1F72Z7gfmQOTspY5B3Hi8I-ko6_DFasLwnY',
      },
      body: imgUpload,
    })
      .then(res => res.json())
      .then(data => {
        imgUpload.delete('title');
        imgUpload.delete('alt');
        imgUpload.delete('intro');
        imgUpload.delete('boardId');
        imgUpload.delete('category');
        // imgUpload.delete('image');
        alert(data.message);
        setPinInfo({
          title: '',
          intro: '',
          alt: '',
          category: '',
          board_id: 2,
        });
        setOn(false);
      });
  };
  return (
    <div
      className={css.pageOutLine}
      onClick={e => {
        if (e.target === btn.current) {
          return;
        } else {
          setOnBoradList(false);
        }
      }}
    >
      <button className={css.delete} onClick={() => deletepin(index)}>
        X
      </button>
      <div className={css.nav}>
        <div className={css.wrapBoardBtn}>
          <button
            ref={btn}
            className={css.selectBtn}
            onClick={() => {
              setOnBoradList(prev => !prev);
            }}
          >
            {boardtitle ? boardtitle : '보드를선택하세요'}
            {onBoradList ? (
              <BoardList data={boadData[0].boards} title={setBoardTitle} />
            ) : null}
          </button>
          <button className={css.storeBtn} onClick={pinMake}>
            저장
          </button>
        </div>
      </div>
      <div className={css.wrapContents}>
        <div className={css.upload}>
          {on ? (
            <img ref={img} className={css.previewImage} alt="이미지" />
          ) : null}
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
          <input
            name="title"
            className={css.title}
            placeholder="제목 추가"
            onChange={handleInput}
            value={pinInfo.title}
          />
          <div className={css.userInfo}>
            <img className={css.userImg} alt="이미지" src={myImg} />
            <p className={css.userName}>
              {boadData !== undefined && boadData[0].name}
            </p>
          </div>
          <input
            name="intro"
            type="text"
            className={css.pinInfo}
            placeholder="사람들에게 회원님의 핀에 대해 설명해 보세요"
            onChange={handleInput}
            value={pinInfo.intro}
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
          {altOn ? (
            <input
              name="alt"
              className={css.pinAltInput}
              placeholder="핀에 무엇이 표시되는지 설명합니다."
              onChange={handleInput}
              value={pinInfo.alt}
            />
          ) : null}
          <input
            name="category"
            type="text"
            placeholder="카테고리를 입력해주세요"
            className={css.category}
            onChange={handleInput}
            value={pinInfo.category}
          />
        </div>
      </div>
    </div>
  );
}

export default Createpinfeed;
