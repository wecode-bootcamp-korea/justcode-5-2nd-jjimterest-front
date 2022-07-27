// export const refreshaleFetch = async (url, option) => {
//   const firstResult = await fetch(url, option).then(res => res.json());

//   if (firstResult.status === 401) {
//     tokenResult = await fetch(tokenAPI, {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': localStorage.getItem('refresh_token')
//       }
//     });

//     //token이 있으면 저장
//     //token이 없으면 token 삭제

//     throw new Error('refresh_token 만료');
//   }

//   return firstResult;
// };
