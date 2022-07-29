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
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import Nav from '../../components/Nav/Nav';

function Boardpage() {
  const params = useParams();
  const { boardname } = params;
  const [createModal, setCreateModal] = useState(false);
  const [bdName, setBdName] = useState('');
  const [desc, setDesc] = useState('');
  const [showBoard, setShowBoard] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.boardData;

  const editBoard = () => {
    fetch(`${BASE_URL}board`, {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        cover_image_url: null,
        title: bdName.length ? bdName : boardname,
        intro: desc.length ? desc : null,
        board_id: data.id,
      }),
    }).then(res => {
      if (res.ok) {
        alert('수정완료!');
      } else {
        alert('수정 실패!');
      }
    });
    closeCreateModal();
  };

  const deleteBoard = id => {
    fetch(`${BASE_URL}board/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        alert('삭제완료!');
      } else {
        alert('삭제 실패!');
      }
    });
    closeCreateModal();
    gotoMypage();
  };
  const gotoMypage = () => {
    navigate('/main');
  };

  const showSimple = () => {
    setShowBoard(true);
  };
  const closeSimple = () => {
    setShowBoard(false);
  };

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
      <Nav />
      <Modal visible={createModal} onClose={closeCreateModal}>
        <div className={css.modalHeader}>보드 수정하기</div>
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
          <div className={css.editBBtn} onClick={editBoard}>
            수정하기
          </div>
          <div
            className={css.delName}
            onClick={e => {
              deleteBoard(data.id);
            }}
          >
            보드 삭제
          </div>
          <div className={css.delContent}>
            이 보드와 모든 핀을 영구적으로 삭제합니다.
            <br />이 작업은 취소할 수 없습니다!
          </div>
        </div>
      </Modal>
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <span className={css.headerBdName}>{boardname}</span>
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
          <Link to={`/main`} className={css.linkLay}>
            <div className={css.iconBox}>
              <FontAwesomeIcon icon={faStar} className={css.faStar} />
            </div>
          </Link>
          <p>아이디어 더 보기</p>
        </div>
        <div>
          <Link
            to={`/mypage/${boardname}/_tools`}
            className={css.linkLay}
            state={{ data: data }}
          >
            <div className={css.iconBox}>
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={css.faSquareCheck}
              />
            </div>
          </Link>
          <p>정리하기</p>
        </div>
      </div>
      <div className={css.uiNav}>
        <div className={css.pinCnt}>
          핀 {data.length === 1 ? 0 : data.pins.length}개
        </div>
        <Dropdown fonticon={1} location={10}>
          <p>옵션 보기</p>
          <li onClick={showSimple}>기본</li>
          <li onClick={closeSimple}>간단히</li>
        </Dropdown>
      </div>
      <div className={css.pinList}>
        <Created showBoard={showBoard} myDate={data && data.pins} />
      </div>
      <div className={css.linkToPinW}>
        <div className={css.linkToPin}>
          <Link to={`/main`} className={css.linkLay}>
            이 보드를 위한 아이디어를 찾아 볼까요?
            <div></div>
          </Link>
        </div>
      </div>
      <div className={css.bottonUi}>
        <Dropdown fonticon={0} botton={'123'}>
          <p>만들기</p>
          <Link to={`/finpage`} className={css.linkLay}>
            <li>핀</li>
          </Link>
        </Dropdown>
      </div>
    </div>
  );
}

export default Boardpage;
