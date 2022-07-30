import React, { useEffect, useRef, useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from './Commentmodal';
import CommentBtnmodal from './CommentBtnmodal';
import BoardLists from '../../components/BoardList/BoardLists';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';
import { token } from '../../components/Nav/Nav';

const Finfeedmodal = ({ setFeedOn, element, pinId }) => {
  const btn = useRef();
  const myImg = localStorage.getItem('myImg');
  const [boardtitle, setBoardTitle] = useState();
  const [onBoradList, setOnBoradList] = useState(false);
  const [boadData, setBoardData] = useState();
  const [on, setOn] = useState(false);
  const [onInput, setOnInput] = useState(false);
  const [pinData, setPinData] = useState();
  const [comment, setComment] = useState();
  const [followState, setFollowState] = useState();
  const [boardId, setBoardId] = useState();

  const navigate = useNavigate();

  const gotprofile = () => {
    navigate(`/${pinData[0].name}`);
  };

  const text = () => {
    if (boadData) {
      if (boadData[0].boards.length === 0) {
        return '보드를 만들어주세요';
      } else {
        return '보드를 선택해주세요';
      }
    }
  };
  useEffect(() => {
    fetch(`${BASE_URL}pin-make`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBoardData(data);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`${BASE_URL}follow/${pinData[0].user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setFollowState(data.is_follow);
        });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`${BASE_URL}pins/${pinId[0]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setPinData(data);
        });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [pinId]);

  useEffect(() => {
    fetch(`${BASE_URL}pins/${pinId[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPinData(data);
      });
  }, [pinId]);

  const onToggle = e => {
    setOn(prev => !prev);
    if (!on) {
      e.target.style.transform = `rotate(135deg)`;
    } else {
      e.target.style.transform = `rotate(45deg)`;
    }
  };
  const closePin = () => {
    setFeedOn(false);
    element.scrollIntoView(false);
  };
  const commentOn = e => {
    setOnInput(true);
  };

  const UI = () => {
    if (pinData && pinData[0].comments) {
      return pinData[0].comments.filter(data => data.parent_id === null).length;
    } else {
      return 0;
    }
  };

  const proimg = () => {
    if (pinData) {
      return pinData[0].profile_image[0] === 'h'
        ? pinData[0].profile_image
        : BASE_URL + pinData[0].profile_image;
    } else {
      return 'https://i.pinimg.com/474x/6b/95/08/6b95083b8472a0e3c41ea2fa9297e5ec.jpg';
    }
  };

  const follow = () => {
    if (pinData && pinData[0].count) {
      return `팔로워 ${pinData[0].count}명`;
    } else {
      return '팔로워 0명';
    }
  };

  const followbtn = () => {
    fetch(`${BASE_URL}follow?followee_id=${pinData[0].user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const store = () => {
    fetch(`${BASE_URL}pin-organize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pin_id: pinData[0].id,
        board_id: boardId,
      }),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  if (pinData) {
    return (
      <div
        className={css.wraper}
        onClick={e => {
          if (e.target === btn.current) {
            return;
          } else {
            setOnBoradList(false);
          }
        }}
      >
        <div className={css.container}>
          <div className={css.imgWraper}>
            <img
              className={css.feedImg}
              src={BASE_URL + pinId[1]}
              alt="핀이미지"
            />
          </div>
          <div className={css.messenger}>
            <div className={css.toolbar}>
              <button
                ref={btn}
                className={css.boardBtn}
                onClick={() => {
                  setOnBoradList(prev => !prev);
                }}
              >
                {boardtitle ? boardtitle : text()}
                {onBoradList && (
                  <BoardLists
                    data={boadData[0].boards}
                    title={setBoardTitle}
                    setBoardId={setBoardId}
                  />
                )}
              </button>
              <button className={css.storeBtn} onClick={store}>
                저장
              </button>
              <button className={css.back} onClick={closePin}>
                X
              </button>
            </div>
            <h1 className={css.pinTitle}>
              {pinData !== undefined && pinData[0].title}
            </h1>
            <div className={css.pinAlt} />
            <div className={css.wrapUserContents}>
              <div className={css.userContents}>
                <img
                  className={css.userImg}
                  src={proimg()}
                  alt="유저사진"
                  onClick={gotprofile}
                />
                <div className={css.userText}>
                  <p className={css.userId} onClick={gotprofile}>
                    {pinData ? pinData[0].nickname : '익명'}
                  </p>
                  <p className={css.follow}>{follow()}</p>
                </div>
              </div>
              <button
                className={followState ? css.followAct : css.followBtn}
                onClick={followbtn}
              >
                {followState ? '팔로잉' : '팔로우'}
              </button>
            </div>
            <div className={css.wrapComment}>
              <div className={css.comment}>{`댓글 ${UI()} 개`}</div>
              <button className={css.plusBtn} onClick={onToggle} />
            </div>
            {on && (
              <Commentmodal pinData={pinData[0].comments} pinId={pinId[0]} />
            )}
            <div className={css.commentInputContainer}>
              <img className={css.myImg} src={myImg} alt="이미지" />
              <input
                className={css.commentInput}
                placeholder="댓글 추가"
                onFocus={commentOn}
                onChange={e => {
                  setComment(e.target.value);
                }}
              />
            </div>
            {onInput && (
              <CommentBtnmodal
                setOn={setOnInput}
                comment={comment}
                pinId={pinId[0]}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Finfeedmodal;
