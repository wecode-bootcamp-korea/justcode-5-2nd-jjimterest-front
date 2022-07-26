import React, { useEffect, useRef, useState } from 'react';
import css from './Stored.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEquals } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import Boardcard from './Boardcard';
import BASE_URL from '../../config';
import Allboardcard from './Allboardcard';

function Stored({
  idea,
  navOnOff,
  myDate,
  myPins,
  allPins,
  linkNav,
  nickname,
}) {
  const [bdList, setBoardList] = useState(myDate);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M';

  const arrRef = useRef();
  const creRef = useRef();
  const [arrangeDisplay, setArrangeDisplay] = useState(false);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [bdName, setBdName] = useState('');
  const [noIdea, setNoIdea] = useState(true);

  const createBoard = async () => {
    await fetch(`${BASE_URL}board`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: localStorage.getItem('login-token'),
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        title: bdName,
      }),
    }).then(res => {
      if (res.ok) {
        alert('보드 생성 완료!');
      }
    });
  };

  //가나다 순 정렬
  const abcSortHandle = () => {
    let stringArray = [...bdList];
    stringArray = stringArray.sort((x, y) => x.title.localeCompare(y.title));
    setBoardList(stringArray);
  };
  // 마지막 저장일 기준 정렬

  const lastDaySortHandle = () => {
    let intArray = [...bdList];
    intArray = intArray.sort((a, b) => b.id - a.id);
    setBoardList(intArray);
  };
  useEffect(() => {}, [bdList]);

  // modal 동작 함수

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
            <Link
              to={`/mypage/${bdName}`}
              state={{
                boardData: [
                  {
                    id: bdList[bdList.length - 1].id + 100,
                    pins: [{ image: '' }],
                  },
                ],
              }}
            >
              <Button onClick={createBoard} disabled={bdName ? false : true}>
                만들기
              </Button>
            </Link>
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
              <li onClick={abcSortHandle}>알파벳 순</li>
              <li onClick={lastDaySortHandle}>마지막 저장일</li>
            </Arrange>
          </div>
          <div
            className={`${css.iconWrapper} ${css.createBtn}`}
            onClick={onClickCreate}
          >
            <FontAwesomeIcon icon={faPlus} className={css.icon} />
            <Create ref={creRef}>
              <p>만들기</p>
              <Link to={`/finpage`} className={css.linkLay}>
                <li>핀</li>
              </Link>
              <li onClick={openCreateModal}>보드</li>
            </Create>
          </div>
        </div>
      )}
      <div className={css.boardContainer}>
        <Allboardcard
          nickname={nickname}
          firstImg={allPins[0].image}
          boardName={'모든 핀'}
          pinCnt={allPins && allPins.length}
          linkNav={linkNav}
          allPin={allPins}
        />
        {bdList &&
          bdList.map((data, index) => (
            <Boardcard
              boardData={data}
              firstImg={data.pins[0].image}
              boardName={data.title}
              pinCnt={data.pins.length}
              linkNav={linkNav}
              nickname={nickname}
              key={index}
            />
          ))}
      </div>
      {idea && noIdea && (
        <>
          <div className={css.arrangeNav}>
            <div className={css.one}>정리되지 않은 아이디어</div>
            <div className={css.twoBtn}>
              <div className={css.two}>정리하기</div>
            </div>
          </div>
          <div className={css.pinContainer}>
            {myPins.length
              ? myPins.map(data => {
                  return (
                    <img alt="핀 이미지" src={`${BASE_URL}${data.image}`} />
                  );
                })
              : setNoIdea(false)}
          </div>
        </>
      )}
    </div>
  );
}

export default Stored;
