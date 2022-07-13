import React, { useRef, useState } from 'react';
import css from './Createpinfeed.module.scss';

function Createpinfeed({ index, deletepin }) {
  const input = useRef();
  const img = useRef();
  const [on, setOn] = useState(false);

  const view = input => {
    setOn(true);
    if (input.current.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        img.current.src = e.target.result;
      };

      reader.readAsDataURL(input.current.files[0]);
    }
  };

  return (
    <div className={css.pageOutLine}>
      <button className={css.delete} onClick={() => deletepin(index)}>
        X
      </button>
      <div className={css.nav}>
        <div className={css.addBtn}>...</div>
        <div className={css.wrapBoardBtn}>
          <button className={css.selectBtn}>보드를선택하세요</button>
          <button className={css.storeBtn}>저장</button>
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
            <img className={css.userImg}></img>
            <p className={css.userName}>user name</p>
          </div>
          <input
            className={css.pinInfo}
            placeholder="핀에 대해 설명해 주세요"
          ></input>
          <button className={css.pinAltBtn}>alt 텍스트 추가</button>
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
