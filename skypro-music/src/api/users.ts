
const signupUrl = 'https://skypro-music-api.skyeng.tech/user/signup/'
const signinUrl = 'https://skypro-music-api.skyeng.tech/user/login/'
const tokenUrl = 'https://skypro-music-api.skyeng.tech/user/token/'
const refreshTokenUrl ='https://skypro-music-api.skyeng.tech/user/token/refresh/'

//ЗАРЕГИСТРИРОВАТЬСЯ

export async function signupUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const response = await fetch(signupUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Такой пользователь уже существует");
  }
  if (response.status === 500) {
    throw new Error("Сервер сломался");
  }


  return response.json();
}




//ВОЙТИ


export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(signinUrl, {
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
  if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  }
  if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  if (response.status===401){
    throw new Error("Пользователь с таким email или паролем не найден");
  }

  return response.json();
}



//ПОЛУЧИТЬ  TOKEN

export async function getToken({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(tokenUrl, {
  method: "POST",
  body: JSON.stringify({
    email,
    password,
  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})
if (response.status === 400) {
  throw new Error("Неверный логин или пароль");
}
if (response.status === 500) {
  throw new Error("Сервер сломался");
}
if (response.status===401){
  throw new Error("Пользователь с таким email или паролем не найден");
}
return response.json()
}





//ОБНОВИТЬ TOKEN


