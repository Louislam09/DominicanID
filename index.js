// const fetch = require('node-fetch');

// DOM
var btn = document.getElementById('btn');
var inputID = document.getElementById('inputID');
var username = document.getElementById('username');
var lastname = document.getElementById('lastname');
var birth = document.getElementById('birth');
var from = document.getElementById('from');
var id = document.getElementById('id');
var photo = document.getElementById('img');
var age = document.getElementById('age');

async function getData(id) {
	const url = `http://173.249.49.169:88/api/test/consulta/${id}`;
	const res = await fetch(url);
	const json = await res.json();

	if (res.status !== 200) throw Error(`This ID ${id} do not exist`);
	return json;
}

async function search() {
	try {
		const info = await getData(inputID.value);
		var data = {
			name: info.Nombres,
			Lastname1: info.Apellido1,
			Lastname2: info.Apellido2,
			birth: info.FechaNacimiento,
			source: info.LugarNacimiento,
			img: info.Foto,
			id: info.Cedula
		};

		data.birth.substr(0);

		username.innerHTML = `Nombre:  ${data.name}`;
		lastname.innerHTML = `Apellido: ${data.Lastname1 + ' ' + data.Lastname2}`;
		birth.innerHTML = `Fecha Nacimiento: ${data.birth.substr(0, 10)}`;
		from.innerHTML = `Lugar Nacimiento: ${data.source}`;
		id.innerHTML = `Cedula: ${data.id}`;
		photo.src = data.img;

		var values = data.birth.substr(0, 10).split('-');
		var dia = values[2];
		var mes = values[1];
		var ano = values[0];

		age.innerText = `Edad: ${calculate_age(mes, dia, ano)} años`;

		function calculate_age(birth_month, birth_day, birth_year) {
			today_date = new Date();
			today_year = today_date.getFullYear();
			today_month = today_date.getMonth();
			today_day = today_date.getDate();
			age = today_year - birth_year;

			if (today_month < birth_month - 1) {
				age--;
			}
			if (birth_month - 1 == today_month && today_day < birth_day) {
				age--;
			}
			return age;
		}

		console.log(data);
	} catch (e) {
		alert(`Posible errores: \n 
                1) La Cedula No Existe.\n
                2) No Tiene Conexion.`);
		console.log(e);
	}
}

btn.onclick = search;
