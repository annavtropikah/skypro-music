const allUrl = 'https://skypro-music-api.skyeng.tech/catalog/track/all/'
const categoryPlaylistUrl = 'https://skypro-music-api.skyeng.tech/catalog/selection/'
const trackUrl = 'https://skypro-music-api.skyeng.tech/catalog/track/'
const favouriteTracksUrl = 'https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/'

const tokenUrl = 'https://skypro-music-api.skyeng.tech/user/token/'

const refreshTokenUrl = 'https://skypro-music-api.skyeng.tech/user/token/refresh/'


//ПОЛУЧИТЬ СПИСОК ТРЕКОВ

export async function getTracks() {
  const res = await fetch(allUrl, {
    method: "GET",
  })
  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  return res.json();
}


//ПОЛУЧИТЬ СПИСОК ТРЕКОВ ОПРЕДЕЛЕННОЙ ПОДБОРКИ/КАТЕГОРИИ

export async function getCategoryPlaylistTracks(id: string) {
  const res = await fetch(categoryPlaylistUrl + id)
  if (!res.ok) {
    throw new Error('Ошибка при получении данных');
  }

  const data = await res.json();
  return data.items;
}


//ДОБАВИТЬ ТРЕК В ИЗБРАННОЕ ПО ID


export async function addFavoriteTracks(id: number, token: string) {
  const res = await fetch(trackUrl+ id + "/favorite", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error("Пользователь не авторизован")
  }
  const data = await res.json();
  return data.items;
}



//УДАЛИТЬ ТРЕК ИЗ ИЗБРАННОГО

export async function deleteFavoriteTracks(id: number, token: string) {
  const res = await fetch(trackUrl + id + "/favorite/", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Пользователь не авторизован");
  }

  return res.json();
}

//ПОЛУЧИТЬ ПЛЕЙЛИСТ ИЗБРАННЫХ ТРЕКОВ



export async function getFavoriteTracks(token: string) {
  const res = await fetch(favouriteTracksUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }

  return res.json()
}




// ПОЛУЧИТЬ TOKEN

export async function getToken({ email, password }: any) {
  const res = await fetch(tokenUrl, {
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


//ОБНОВИТЬ TOKEN

export async function refreshToken(token: string) {
  const res = await fetch(refreshTokenUrl, {
    method: "POST",
    body: JSON.stringify({
      refresh: token,
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