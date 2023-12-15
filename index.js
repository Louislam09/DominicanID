import { API_URL } from "./config/index.js";

const apiKey = API_URL;
const randomRobotImageUrl = `https://robohash.org`;

const cardDiv = document.getElementById("card");
const btn = document.getElementById("btn");
const inputID = document.getElementById("inputID");
const username = document.getElementById("username");
const lastname = document.getElementById("lastname");
const birthDiv = document.getElementById("birth");
const from = document.getElementById("from");
const idElement = document.getElementById("id");
const photo = document.getElementById("img");
const ageElement = document.getElementById("age");

async function fetchUserDataByID({ id }) {
  const url = `${apiKey}/user/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data for ID ${id}: ${response.statusText}`);
  }

  return response.json();
}

function calculateUserAge(birthMonth, birthDay, birthYear) {
  const today = new Date();
  const age =
    today.getFullYear() -
    birthYear -
    (today.getMonth() < birthMonth - 1 ||
      (today.getMonth() === birthMonth - 1 && today.getDate() < birthDay));
  return age;
}

function loading() {
  username.innerHTML = `loading...`;
  lastname.innerHTML = `loading...`;
  birthDiv.innerHTML = `loading...`;
  from.innerHTML = `loading...`;
  idElement.innerHTML = `loading...`;
  photo.src = "";
  ageElement.innerText = `loading...`;
}

function hideAndShow({ element, shouldDisplay = true }) {
  if (shouldDisplay) {
    element.style.display = ''
    return
  }
  element.style.display = 'none'
}

async function getUserData() {
  try {
    hideAndShow({ element: cardDiv, shouldDisplay: false })
    const { status, result } = await fetchUserDataByID({
      id: inputID.value.replaceAll("-", "").trim(),
    });

    if (!status) {
      throw new Error("User Not Found");
    }

    hideAndShow({ element: cardDiv })
    const {
      nombres: name,
      cedula: id,
      apellido1: lastName1,
      apellido2: lastName2,
      fechaNacimiento: birth,
      lugarNacimiento: source,
    } = result;

    const birthDate = birth.substr(0, 10);

    username.innerHTML = `Nombre:  ${name}`;
    lastname.innerHTML = `Apellido: ${lastName1} ${lastName2}`;
    birthDiv.innerHTML = `Fecha Nacimiento: ${birthDate}`;
    from.innerHTML = `Lugar Nacimiento: ${source}`;
    idElement.innerHTML = `Cedula: ${id}`;
    photo.src = `${randomRobotImageUrl}/${name}`;

    const [year, month, day] = birthDate.split("-");
    ageElement.innerText = `Edad: ${calculateUserAge(month, day, year)} años`;
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

btn.addEventListener("click", getUserData);
