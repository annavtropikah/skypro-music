
const signupUrl = 'https://skypro-music-api.skyeng.tech/user/signup/'
const signinUrl = 'https://skypro-music-api.skyeng.tech/user/login/'
const tokenUrl = 'https://skypro-music-api.skyeng.tech/user/token/'
const refreshTokenUrl ='https://skypro-music-api.skyeng.tech/user/token/refresh/'



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
      email: email,
      password: password,
      username: username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Такой пользователь уже существует");
  }

  return response.json();
}







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
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Неправильный логин или пароль");
  }

  return response.json();
}