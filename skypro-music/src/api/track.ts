const apiUrl= 'https://skypro-music-api.skyeng.tech/catalog/track/all/'

export async function getTracks() {
    const res = await fetch(apiUrl);
  
    if (!res.ok) {
      throw new Error('Ошибка при получении данных')
    }
  
    return res.json();
  }
  

  
// export async function getTracks() {
//  return fetch(apiUrl)
//  .then((res)=>{
//   if (!res.ok) {
//     throw new Error('Ошибка при получении данных')
//   }
//   return res.json();
//     })
// }