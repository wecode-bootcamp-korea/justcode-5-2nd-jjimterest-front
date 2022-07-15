import React, { useState } from 'react';
import css from './Boardpage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faSquareCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../components/Myprofiledropdown/Dropdown';
import Created from '../../components/Myprofile/Created';
import Modal from '../../components/Myprofile/Modal';

function Boardpage() {
  const [createModal, setCreateModal] = useState(false);
  const [bdName, setBdName] = useState('');
  const [desc, setDesc] = useState('');

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };
  const inputHandlerN = e => {
    setBdName(e.target.value);
  };
  const inputHandlerD = e => {
    setDesc(e.target.value);
  };

  return (
    <div className={css.container}>
      <Modal visible={createModal} onClose={closeCreateModal}>
        <div className={css.modalHeader}>보드 만들기</div>
        <div className={css.modalInner}>
          <div>보드 커버</div>
          <div className={css.faPlusBox}>
            <FontAwesomeIcon icon={faPlus} className={css.faPlus} />
          </div>
          <div>이름</div>
          <input
            className={css.nameInput}
            onChange={inputHandlerN}
            value={bdName}
          />
          <div>설명</div>
          <textarea
            className={css.descInput}
            placeholder="무엇에 관한 보드인가요?"
            onChange={inputHandlerD}
            value={desc}
          />
          <div className={css.delName}>보드 삭제</div>
          <div className={css.delContent}>
            이 보드와 모든 핀을 영구적으로 삭제합니다.
            <br />이 작업은 취소할 수 없습니다!
          </div>
        </div>
      </Modal>
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <span className={css.headerBdName}>보드 이름</span>
            <Dropdown fonticon={2}>
              <p>보드 옵션</p>
              <li onClick={openCreateModal}>보드 수정</li>
              <li>병합</li>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={css.uiToolBox}>
        <div>
          <div className={css.iconBox}>
            <FontAwesomeIcon icon={faStar} className={css.faStar} />
          </div>
          <p>아이디어 더 보기</p>
        </div>
        <div>
          <div className={css.iconBox}>
            <FontAwesomeIcon
              icon={faSquareCheck}
              className={css.faSquareCheck}
            />
          </div>
          <p>정리하기</p>
        </div>
      </div>
      <div className={css.uiNav}>
        <div className={css.pinCnt}>핀 1개</div>
        <Dropdown fonticon={1} location={10}>
          <p>옵션 보기</p>
          <li>기본</li>
          <li>간단히</li>
        </Dropdown>
      </div>
      <div className={css.pinList}>
        <Created />
      </div>
      <div className={css.linkToPinW}>
        <div className={css.linkToPin}>
          이 보드를 위한 아이디어를 찾아 볼까요?
        </div>
      </div>
      <div className={css.bottonUi}>
        <Dropdown fonticon={0} botton={'123'}>
          <p>만들기</p>
          <li>핀</li>
        </Dropdown>
      </div>
    </div>
  );
}

export default Boardpage;
