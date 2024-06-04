const apiUrl= 'https://skypro-music-api.skyeng.tech/catalog/track/all/'
const apiUrlPlaylist = 'https://skypro-music-api.skyeng.tech/catalog/selection/'

export async function getTracks() {
    const res = await fetch(apiUrl);
  
    if (!res.ok) {
      throw new Error('Ошибка при получении данных');
    }
  
    return res.json();
  }
  

  export async function getPlaylistTracks(id:string) {
    const res = await fetch(apiUrlPlaylist + id);

    if (!res.ok) {
      throw new Error('Ошибка при получении данных');
    }

    return res.json();
  }
//   // Обратите внимание, что функция компонента также является асинхронной
//   export default async function HomePage() {
//     const data = await getData();
  
//     return <main>/* Некий контент */</main>;
//   }
  