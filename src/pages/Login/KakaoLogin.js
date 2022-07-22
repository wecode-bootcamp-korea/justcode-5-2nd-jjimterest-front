import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_URI } from './OAuth';

const KakaoLogin = () => {
  let accessCode = new URL(window.location.href).searchParams.get('code');
  let accessToken;
  const navigate = useNavigate();

  //토큰 받기(Request)
  useEffect(() => {
    const bodyData = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: accessCode,
    };

    const queryStringBody = Object.keys(bodyData)
      .map(key => encodeURIComponent(key) + '=' + encodeURI(bodyData[key]))
      .join('&');

    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-url-urlencoded',
        Accept: 'application/json',
      },
      body: queryStringBody,
    })
      .then(res => res.json())
      .then(result => {
        accessToken = result.acess_token;
        accessToken &&
          fetch(``, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded ',
              Accept: 'application/json',
            },
            body: queryStringBody,
          })
            .then(response => response.json())
            .then(backData => {
              if (backData.MESSAGE === 'SUCCESS') {
                localStorage.setItem('back_token', backData.ACCESS_TOKEN);
                navigate('/Homepage');
                alert('로그인에 성공했습니다!');
              } else {
                alert('로그인에 실패했습니다!');
              }
            });
      });
  }, [navigate]);

  return <div>로그인 다이렉트 페이지</div>;
};

export default KakaoLogin;
