import React, { useEffect, useRef, useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from '../Commentmodal/Commentmodal';
import CommentBtnmodal from '../Commentmodal/CommentBtnmodal';
import BoardList from '../BoardList/BoardList';
import BASE_URL from '../../config';

const Finfeedmodal = ({ setFeedOn, element, pinId }) => {
  const btn = useRef();
  const myImg = localStorage.getItem('myimg');
  const [fuse, setFuse] = useState(true);
  const [followst, setFollowst] = useState(false);
  const [boardtitle, setBoardTitle] = useState();
  const [onBoradList, setOnBoradList] = useState(false);
  const [boadData, setBoardData] = useState();

  const [onInput, setOnInput] = useState(false);

  const [pinData, setPinData] = useState();
  const [comment, setComment] = useState();

  const commentOn = e => {
    setOnInput(true);
  };

  // const timer = setInterval(() => {
  //   fetch(`${BASE_URL}/pins/${pinId[0]}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setPinData(data);
  //       console.log('핀디테일', data);
  //     });
  // }, 5000);

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
        console.log('핀만들기 데이터', data);
      });
  }, []);

  useEffect(() => {
    if (fuse) {
      const timer = setInterval(() => {
        fetch(`${BASE_URL}/pins/${pinId[0]}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
          },
        })
          .then(res => res.json())
          .then(data => {
            setPinData(data);
            console.log('핀디테일', data);
          });
      }, 1000);
      return () => {
        console.log('인터벌종료');
        setFuse(false);
        clearInterval(timer);
      };
    }
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/pins/${pinId[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => {
        setPinData(data);
        console.log('핀디테일', data);
      });
  }, []);

  const [on, setOn] = useState(false);

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

  const UI = () => {
    if (pinData && pinData[0].comments) {
      return pinData[0].comments.filter(data => data.parent_id === null).length;
    } else {
      return 0;
    }
  };

  const proimg = () => {
    if (pinData) {
      console.log(`${BASE_URL}` + '/' + pinData[0].profile_image);
      return pinData[0].profile_image[0] === 'h'
        ? pinData[0].profile_image
        : `${BASE_URL}` + '/' + pinData[0].profile_image;
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
    fetch(`${BASE_URL}/follow?followee_id=${pinData[0].user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('팔로우데이터', data);
      });
    setFollowst(prev => !prev);
  };

  const store = () => {
    fetch(`${BASE_URL}/pin-organize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
      body: JSON.stringify({
        pin_id: pinData[0].id,
        board_id: 3,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };
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
            src={BASE_URL + '/' + pinId[1]}
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
              {boardtitle ? boardtitle : '보드를선택하세요'}
              {onBoradList ? (
                <BoardList data={boadData[0].boards} title={setBoardTitle} />
              ) : null}
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
          <div className={css.pinAlt}></div>
          <div className={css.wrapUserContents}>
            <div className={css.userContents}>
              <img className={css.userImg} src={proimg()} alt="유저사진" />
              <div className={css.userText}>
                <p className={css.userId}>
                  {pinData ? pinData[0].nickname : '익명'}
                </p>
                <p className={css.follow}>{follow()}</p>
              </div>
            </div>
            <button
              className={followst ? css.followAct : css.followBtn}
              onClick={followbtn}
            >
              {followst ? '팔로잉' : '팔로우'}
            </button>
          </div>
          <div className={css.wrapComment}>
            <div className={css.comment}>{`댓글 ${UI()} 개`}</div>
            <button className={css.plusBtn} onClick={onToggle}></button>
          </div>
          {on ? <Commentmodal pinData={pinData[0].comments} /> : null}
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
          {onInput ? (
            <CommentBtnmodal
              setOn={setOnInput}
              comment={comment}
              pinId={pinId[0]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Finfeedmodal;
