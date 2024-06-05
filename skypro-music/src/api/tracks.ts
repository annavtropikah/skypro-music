const apiUrl= 'https://skypro-music-api.skyeng.tech/catalog/track/all/'
const apiUrlPlaylist = 'https://skypro-music-api.skyeng.tech/catalog/selection/'
const apiUrlTrack ='https://skypro-music-api.skyeng.tech/catalog/track/'
const apiUrlFavouriteTracks ='https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/'


const apiUrlToken = 'https://skypro-music-api.skyeng.tech/user/token/'



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

    const data = await res.json();
    return data.items
  }
/////////////
  

export async function postFavoriteTracks(id: string) {
  const res = await fetch(apiUrlTrack + id + "/favourite", {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

export async function getFavoriteTracks(token: any) {
  const res = await fetch(apiUrlFavouriteTracks, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error("Ошибка при получении данных")
  }
  const data = await res.json();
  return data.items
}



export async function getToken({ email, password }: any) {
  const res = await fetch(apiUrlToken, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}