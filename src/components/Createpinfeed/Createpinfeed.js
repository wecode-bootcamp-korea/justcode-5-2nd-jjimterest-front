import React from 'react';
import css from './Createpinfeed.module.scss';

function Createpinfeed({ index, deletepin }) {
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
          <p className={css.uploadText}>이미지를 업로드 하시오</p>
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
