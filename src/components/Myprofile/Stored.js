import React, { useEffect, useRef, useState } from 'react';
import css from './Stored.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEquals } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';

function Stored({ idea, navOnOff }) {
  const arrRef = useRef();
  const creRef = useRef();
  const [arrangeDisplay, setArrangeDisplay] = useState(false);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [bdName, setBdName] = useState('');

  const moveCreate = () => {
    window.location.href = `/mynickname/:boardname`;
  };

  //modal 동작 함수

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  //드랍다운 창

  const onClickArrange = () => {
    return arrangeDisplay ? setArrangeDisplay(false) : setArrangeDisplay(true);
  };
  const onClickCreate = () => {
    return createDisplay ? setCreateDisplay(false) : setCreateDisplay(true);
  };

  //마우스 밖으로 클릭 했을 때 창 닫는 로직
  useEffect(() => {
    document.addEventListener('mousedown', clickArrOutside);

    return () => {
      document.removeEventListener('mousedown', clickArrOutside);
    };
  });
  useEffect(() => {
    document.addEventListener('mousedown', clickCreOutside);

    return () => {
      document.removeEventListener('mousedown', clickCreOutside);
    };
  });

  const clickArrOutside = event => {
    if (arrangeDisplay && !arrRef.current.contains(event.target)) {
      setArrangeDisplay(false);
    }
  };
  const clickCreOutside = event => {
    if (createDisplay && !creRef.current.contains(event.target)) {
      setCreateDisplay(false);
    }
  };

  //input handler
  const inputHandler = e => {
    setBdName(e.target.value);
  };

  //components styles
  const Button = styled.button`
      font-size: 20px;
      font-weight: 700;
      border: none;
      margin-top: 30px;
      margin-left: 70%;
      background-color: #efefef;
      border-radius: 10px;
      cursor: pointer;
    }
    &:hover {
      background-color: #e0e0e0;
    }
  `;

  const Arrange = styled.div`
    display: ${arrangeDisplay ? 'block' : 'none'};
    position: absolute;
    top: 60px;
    left: 20px;
    background-color: white;
    min-width: 160px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;
  const Create = styled.div`
    display: ${createDisplay ? 'block' : 'none'};
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: white;
    min-width: 160px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;
  return (
    <div className={css.contentsContainer}>
      <Modal visible={createModal} onClose={closeCreateModal}>
        <div className={css.modalHeader}>보드 만들기</div>
        <div className={css.modalInner}>
          <div className={css.modalName}>이름</div>
          <input
            placeholder="예 : 가고 싶은 곳 또는 요리법"
            onChange={inputHandler}
            value={bdName}
          />
          <div className={css.buttonWrap}>
            <Button disabled={bdName ? false : true} onClick={moveCreate}>
              만들기
            </Button>
          </div>
        </div>
      </Modal>
      {navOnOff && (
        <div className={css.boardUi}>
          <div
            className={`${css.iconWrapper} ${css.arrangeBtn}`}
            onClick={onClickArrange}
          >
            <FontAwesomeIcon icon={faEquals} className={css.icon} />
            <Arrange ref={arrRef}>
              <p>정렬기준</p>
              <li>알파벳 순</li>
              <li>마지막 저장일</li>
            </Arrange>
          </div>
          <div
            className={`${css.iconWrapper} ${css.createBtn}`}
            onClick={onClickCreate}
          >
            <FontAwesomeIcon icon={faPlus} className={css.icon} />
            <Create ref={creRef}>
              <p>만들기</p>
              <li>핀</li>
              <li onClick={openCreateModal}>보드</li>
            </Create>
          </div>
        </div>
      )}
      <div className={css.boardContainer}>
        <div className={css.allPinContainer}>
          <div className={css.allPinImg}>
            <div className={css.firstImg}>
              <img
                alt="핀이미지"
                src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
          <div className={css.allPinContents}>
            <div className={css.boardName}>모든 핀</div>
            <div className={css.pinCnt}>핀 3개</div>
          </div>
        </div>
        {/* 보드뿌려주기 */}
      </div>
      {idea && (
        <>
          <div className={css.arrangeNav}>
            <div className={css.one}>정리되지 않은 아이디어</div>
            <div className={css.twoBtn}>
              <div className={css.two}>정리하기</div>
            </div>
          </div>
          <div className={css.pinContainer}>
            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1600277259675-0edbcb3182d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1532796107-d570a19405ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://i.pinimg.com/474x/5d/80/dc/5d80dc96b01e9caddd299338a4fa2d75.jpg"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1533749968753-1a9994823766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            />

            <img
              alt="핀이미지"
              src="https://images.unsplash.com/photo-1625887803552-9a80d55f37fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Stored;
