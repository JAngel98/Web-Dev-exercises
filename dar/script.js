const updateBtn = document.getElementById("updateBtn");
const plants = document.getElementById("plants");
const groups = document.getElementById("groups");
const operators = document.getElementById("operators");
const codes = document.getElementById("codes");
const numbers = document.getElementById('numbers');

let areas = {
	bn: "77",
	rf: "83",
	at: "81",
	lo: "82",
};

let operarios = {
	0: "Todos...",
	OH4002: "Alexander Romero",
	OH4004: "Vladimir Remedios",
	OH4006: "Raciel Tabares",
	OH4007: "Julio César",
	OH4101: "Antonio Perdomo",
	OH4202: "Noslin Periche Paz",
	OH4301: "Hector de la Cruz",
	OK4007: "Alejandro Sierra"
};

let asignaciones = {
	"OH4002": [{
		"centro": "bn",
		"fullzone": false,
		"centrales": [{
			"cables": "1,10,11,2B",
			"planta": "BANES"
		}]
	}],
	"OH4004": [{
		"centro": "bn",
		"fullzone": false,
		"centrales": [{
			"cables": "0,9,1F",
			"planta": "BANES"
		},
		{
			"cables": "Todos",
			"planta": "NICARAGUA"
		}
		]
	}],
	"OH4006": [{
		"centro": "bn",
		"fullzone": false,
		"centrales": [{
			"cables": "Todos",
			"planta": "GUARDALAVACA"
		},
		{
			"cables": "Todos",
			"planta": "EL_PROGRESO"
		}
		]
	},
	{
		"centro": "rf",
		"fullzone": false,
		"centrales": [{
			"cables": "Todos",
			"planta": "PESQUERO"
		},
		{
			"cables": "Todos",
			"planta": "AGUADA LA PIEDRA"
		},
		{
			"cables": "Todos",
			"planta": "RF_MELILLA"
		},
		{
			"cables": "Todos",
			"planta": "EL_PROGRESO"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL PESQUERO 1"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL PESQUERO 2"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL PESQUERO3"
		},
		{
			"cables": "Todos",
			"planta": "RF_YURAGUANAL"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL RIO DE ORO"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL PESQUERO 8"
		},
		{
			"cables": "Todos",
			"planta": "RF_HOTEL RIO LUNAS MARES"
		}
		]
	}
	],
	"OK4007": [{
		"centro": "bn",
		"fullzone": false,
		"centrales": [{
			"cables": "7,8,23,24,29,30,35,36,37,38",
			"planta": "BANES"
		}]
	}],
	"OH4007": [{
		"centro": "bn",
		"fullzone": false,
		"centrales": [{
			"cables": "1B,4",
			"planta": "BANES"
		}]
	}],
	"OH4101": [{
		"centro": "lo",
		"fullzone": true,
		"centrales": []
	}],
	"OH4202": [{
		"centro": "rf",
		"fullzone": false,
		"centrales": [{
			"cables": "Todos",
			"planta": "RAFAEL FREYRE"
		},
		{
			"cables": "Todos",
			"planta": "FRAY BENITO"
		},
		{
			"cables": "Todos",
			"planta": "RF _SANTA LUCIA"
		},
		{
			"cables": "Todos",
			"planta": "RF_VITA"
		}
		]
	}],
	"OH4301": [{
		"centro": "at",
		"fullzone": true,
		"centrales": []
	}]
};

let data = [];

let reports = [];

let plantas = ["Todos..."];

let grupos = ["Todos..."];

let claves = ["Todos..."];

let plantFilter = "Todos...";
let groupFilter = "Todos...";
let operatorFilter = "Todos...";
let codeFilter = "Todos...";
let numberFilter = "";

let par = "";
let terminal = "";
let dirTerm = "";

async function getPlantas() {
	for (let centro in areas) {
		try {
			const response = await fetch(`https://10.30.12.8/dar/ra/centrales?area_id=${areas[centro]}`);
			const responseToJson = await response.json();
			console.log("Plantas:", responseToJson)
		} catch (e) {
			console.log(e);
		}
	}
}

function setPlantas() {
	const objSet = new Set();
	for (let centro of reports) {
		centro.forEach(
			e => objSet.add(e[21])
		);
	}

	const array = Array(...objSet);

	plantas = ["Todos..."];
	plantas = [...plantas, ...array.sort()];
}

function setGrupos() {
	const objSet = new Set();
	for (let centro of reports) {
		centro.forEach(
			e => {
				if (e[17] != "") objSet.add(e[17])
			}
		);
	}

	const array = Array(...objSet);

	grupos = ["Todos..."];
	grupos = [...grupos, ...array.sort()];
}

function setCodes() {
	const objSet = new Set();
	for (let centro of reports) {
		centro.forEach(
			e => {
				if (e[24] != "") objSet.add(e[24])
			}
		);
	}

	const array = Array(...objSet);

	claves = ["Todos..."];
	claves = [...claves, ...array.sort()];
}

function updatePlants() {
	plants.innerHTML = "";
	setPlantas();

	for (let i = 0; i < plantas.length; i++) {
		let cant = 0;
		reports.forEach(
			e => {
				e.forEach(
					d => {
						if (plantas[i] == d[21]) cant++;
					}
				);
			}
		);

		let opt = document.createElement("option");
		opt.value = plantas[i];
		if (plantFilter == plantas[i]) opt.selected = true;
		opt.innerText = i == 0 ? plantas[i] : plantas[i] + " (" + cant + ")";

		plants.append(opt);
	}
}

function updateOperators() {
	operators.innerHTML = "";

	let values = Object.values(operarios);
	let keys = Object.keys(operarios);

	for (let i = 0; i < Object.keys(operarios).length; i++) {
		let opt = document.createElement("option");
		opt.value = keys[i];
		if (operatorFilter == keys[i]) opt.selected = true;
		opt.innerText = keys[i] == 0 ? values[i] : keys[i] + " - " + values[i];

		operators.append(opt);
	}
}

function updateGroups() {
	groups.innerHTML = "";
	setGrupos();

	for (let i = 0; i < grupos.length; i++) {
		let cant = 0;
		reports.forEach(
			e => {
				e.forEach(
					d => {
						if (grupos[i] == d[17]) cant++;
					}
				);
			}
		);

		let opt = document.createElement("option");
		opt.value = grupos[i];
		if (groupFilter == grupos[i]) opt.selected = true;
		opt.innerText = i == 0 ? grupos[i] : grupos[i] + " (" + cant + ")";

		groups.append(opt);
	}
}

function updateCodes() {
	codes.innerHTML = "";
	setCodes();

	for (let i = 0; i < claves.length; i++) {
		let cant = 0;
		reports.forEach(
			e => {
				//console.log(e)
				e.forEach(
					d => {
						if (claves[i] == d[24]) cant++;
					}
				);
			}
		);

		let opt = document.createElement("option");
		opt.value = claves[i];
		if (codeFilter == claves[i]) opt.selected = true;
		opt.innerText = i == 0 ? claves[i] : claves[i] + " (" + cant + ")";

		codes.append(opt);
	}
}

function updateNumbers() {
	numbers.value = numberFilter;
}

async function getReports() {
	reports = [];

	updateBtn.style.cursor = "wait";
	updateBtn.disabled = true;
	document.getElementById('loading').style.display = "block";
	document.getElementById('container').style.opacity = "60%";

	for (let centro in areas) {
		switch (centro) {
			case "bn":
				loading.innerText = "Obteniendo datos... BANES";
				break;
			case "rf":
				loading.innerText = "Obteniendo datos... FREYRE";
				break;
			case "at":
				loading.innerText = "Obteniendo datos... ANTILLA";
				break;
			case "lo":
				loading.innerText = "Obteniendo datos... BAGUANOS";
				break;
		}

		try {
			await axios
				.get(`https://10.30.12.8/dar/ra/reportes?area_id=${areas[centro]}`, {
					headers: {
						"X-Requested-With": "XMLHttpRequest",
					},
				})
				.then((response) => {
					console.log("Respuesta del servidor:", response);
					const resp = response.data.data;

					resp.map(e => {
						e[23] = areas[centro];
						e[24] = e[24].replace(/\s+/g, '');
					})
					reports.push(resp);
					getData();
				});
		} catch (e) {
			console.log(e);
		}
	}

	updateBtn.style.cursor = "pointer";
	updateBtn.disabled = false;
	document.getElementById('updtime').innerText = new Date().toLocaleString();
	document.getElementById('loading').style.display = "none";
	document.getElementById('container').style.opacity = "100%";
}

function getData() {
	for (let j = 0; j < reports.length; j++) {
		data = reports[j];

		//console.log("data: ", data)

		if (plantFilter != "Todos...") {
			data = data.filter((e) => e[21] == plantFilter);
		}
		if (groupFilter != "Todos...") {
			data = data.filter((e) => e[17] == groupFilter);
		}
		if (codeFilter != "Todos...") {
			data = data.filter((e) => e[24] == codeFilter);
		}
		if (numberFilter != "") {
			data = data.filter((e) => e[1].includes(numberFilter));
		}
		if (operatorFilter != "Todos...") {
			let dataTemp1 = [];
			let dataTemp2 = [];
			let centrosOperario = asignaciones[operatorFilter];

			centrosOperario.forEach((centro) => {
				if (centro.fullzone) {
					dataTemp1 = data.filter((e) => e[23] == areas[centro.centro]);
					if (dataTemp1.length != 0) {
						dataTemp2 = [...dataTemp2, ...dataTemp1];
					}
				} else {
					let plantasOperario = centro.centrales;

					plantasOperario.forEach((zone) => {
						if (zone.cables == "Todos") {
							dataTemp1 = data.filter((e) => e[21] == zone.planta);
							if (dataTemp1.length != 0) {
								dataTemp2 = [...dataTemp2, ...dataTemp1];
							}
						} else {
							for (let cable of zone.cables.split(",")) {
								dataTemp1 = data.filter(
									(e) =>
										e[5] != null &&
										e[5] == cable &&
										e[21] == zone.planta
								);
								if (dataTemp1.length != 0) {
									dataTemp2 = [...dataTemp2, ...dataTemp1];
								}
							}
						}
						dataTemp1 = [];
					});
				}
			});

			data = dataTemp2;

		}

		data.sort((a, b) => {
			if (parseInt(a[18]) > parseInt(b[18])) {
				return -1;
			}
			if (parseInt(a[18]) < parseInt(b[18])) {
				return 1;
			}
			return 0;
		});

		let items = data.length;
		let tbody = document.createElement("body");

		for (let i = 0; i < items; i++) {
			let row = document.createElement("tr");

			let planta = document.createElement("td");
			planta.style.width = "200px";
			let servicio = document.createElement("td");
			servicio.style.width = "90px";
			let cliente = document.createElement("td");
			cliente.style.width = "500px";
			let direccion = document.createElement("td");
			direccion.style.width = "600px";
			let demora = document.createElement("td");
			demora.style.width = "30px";
			let grupo = document.createElement("td");
			grupo.style.width = "30px";
			let problema = document.createElement("td");
			problema.style.width = "300px";
			let clave = document.createElement("td");
			clave.style.width = "60px";
			let ruta = document.createElement("td");
			ruta.style.width = "160px";

			planta.innerText = data[i][21];
			row.append(planta);

			servicio.innerText = data[i][1];
			servicio.setAttribute("onclick", `showDetails(${data[i][0]})`)
			row.append(servicio);

			servicio.setAttribute("title", data[i][0]);

			cliente.innerText = data[i][2];
			row.append(cliente);
			if (data[i][20] != "") cliente.setAttribute("title", "Loc: " + data[i][20]);

			direccion.innerText = data[i][3];
			row.append(direccion);

			let dias = (data[i][18] / 24).toFixed(0).toString() + " d";
			let horas = data[i][18].toString() + " h";
			demora.innerText = horas;

			if (data[i][18] > 72) {
				demora.setAttribute("class", "bg-red bold");
				demora.innerText = dias;
			}
			if (data[i][18] <= 72 && data[i][18] > 60) {
				demora.setAttribute("class", "bg-org bold");
			} else if (data[i][18] <= 60 && data[i][18] > 48) {
				demora.setAttribute("class", "bg-yw bold");
			}

			row.append(demora);

			grupo.innerText = data[i][17];
			row.append(grupo);

			//grupo.setAttribute("title", data[i].descgrupo);

			problema.innerText = data[i][16] ? data[i][15] + " (" + data[i][16] + ")" : data[i][15];
			row.append(problema);

			problema.setAttribute("title", data[i][19]);

			clave.innerText = data[i][24];
			row.append(clave);

			if (data[i][24] == 24) {
				clave.setAttribute("class", "red bold bg-yw");
			} else {
				clave.setAttribute("class", "bold");
			}

			par = data[i][10] != "" ? data[i][10] : data[i][6];
			terminal = data[i][11] != "" ? data[i][11] : data[i][7];
			dirTerm = data[i][12] != "" ? data[i][12] : data[i][8];

			ruta.innerText = data[i][5] != "" ? "C" + data[i][5] + " P" + par + " T" + terminal : "";
			//ruta.innerText = data[i][4] != "" && data[i][5] != "" ? ruta.innerText + " " + data[i][4] : ruta.innerText;
			row.append(ruta);
			ruta.setAttribute("title", dirTerm);

			//if (data[i].tiposerv == "NHPLUS") row.setAttribute("class", "red bold");

			tbody.append(row);
		}

		switch (j) {
			case 0:
				document.getElementById("total_bn").innerText = items;
				document.getElementById("body_bn").innerHTML = tbody.innerHTML;
				break;
			case 1:
				document.getElementById("total_rf").innerText = items;
				document.getElementById("body_rf").innerHTML = tbody.innerHTML;
				break;
			case 2:
				document.getElementById("total_at").innerText = items;
				document.getElementById("body_at").innerHTML = tbody.innerHTML;
				break;
			case 3:
				document.getElementById("total_lo").innerText = items;
				document.getElementById("body_lo").innerHTML = tbody.innerHTML;
		}
	}
}

function findByFolio(folio) {
	let report = [];

	reports.forEach((centro) => {
		centro.forEach((e => {
			if (e[0] == folio) report = e;
		}));
	});

	return report;
}

function getReportDate(horas) {
	let time = horas * 60 * 60 * 1000;
	let fechaReporte = new Date(new Date().getTime() - time);

	return fechaReporte.toLocaleString().split(",")[0];
}

function showDetails(folio) {
	//console.log("Entro al detalle", findByFolio(e));
	const reporte = findByFolio(folio);
	const popup = window.open('', 'popup', 'width=320,height=600');

	if (!popup) {
		alert('El navegador bloqueó la ventana emergente. Permítela para ver el ticket.');
		return;
	}

	const contenido = `
    <html>
    <head>
      <title>Servicio: ${reporte[1]}</title>
      <style>
    	body {
			font-family: Arial, sans-serif;
			font-size: 12px;
			max-width: 300px;
		}

		h3 {
			margin-top: 0;
		}

		ul {
			padding-left: 20px;
		}

		li {
			margin-bottom: 5px;
		}

		hr {
			border-top: dotted 1px;
		}

		.flex {
			display: flex;
		}

		.sp-btw {
			justify-content: space-between;
		}

		.sp-around {
			justify-content: space-around;
		}

		#ticket {
			margin-left: 20px;
			margin-right: 20px;
			margin-bottom: 40px;
		}

		#ticket * {
			margin: 5px 0;
		}

		@media print {
			body * {
				visibility: hidden;
			}

			#ticket,
			#ticket * {
				visibility: visible;
			}

			#ticket {
				position: absolute;
				top: 0;
				left: 0;
			}
		}
      </style>
    </head>
    <body>
		<div id="ticket">
			<p><strong>REPORTE DE AVERIA - DAR</strong></p>
			
			<div class="flex sp-btw">
				<p>Servicio: ${reporte[1]}</p>
				<p>Fecha: ${getReportDate(reporte[18])}</p>
				<p>Folio: ${reporte[0]}</p>
			</div>
			<hr>
			<p>Cliente: ${reporte[2]}</p>
			<p>Direccion: ${reporte[3]}</p>
			<p>Tipo Serv: ${reporte[25]}</p>
			<hr>
			<p>Circuito de línea: ${reporte[4]}</p>
			<hr>
			<p>Observaciones: ${reporte[19]}</p>
			<hr>
			<div class="flex sp-btw">
				<p>Prueba: ${reporte[16]}</p>
				<p>Problema: ${reporte[15]}</p>
			</div>
			<p>Pendiente por: ${reporte[17]}</p>
			<hr>
			<p>Central: ${reporte[21]}</p>
			<div class="flex sp-btw">
				<p>CableP: ${reporte[5]}</p>
				<p>ParP: ${reporte[6]}</p>
				<p>TermP: ${reporte[7]}</p>
				<p>(${reporte[13]} al ${reporte[14]})</p>
			</div>
			<p>DirTermP: ${reporte[8]}</p>
			<div class="flex sp-btw">
				<p>CableS: ${reporte[9]}</p>
				<p>ParS: ${reporte[10]}</p>
				<p>TermS: ${reporte[11]}</p>
			</div>
			<p>DirTermS: ${reporte[12]}</p>
			<hr>
			<p>Contacto: ${reporte[20]}</p>
			
			<div>
				<br>
				<p class="flex sp-around">*** #EtecsaConCuba *** </p>
				<p> </p>
			</div>
			
      </div>
		<div id="marco" class="flex sp-around">
			<button onclick="window.print()">Imprimir</button>
			<button onclick="window.close()">Cerrar</button>
		</div>
    </body>
    </html>
  `;

	/*<ul>
		  ${info.items.map(item => `<li>${item.descripcion} - $${item.precio}</li>`).join('')}
		</ul>*/

	popup.document.open();
	popup.document.write(contenido);
	//popup.document.close();

}

updateBtn.addEventListener("click", () => {
	clearInterval(intervalId);
	init();
	intervalId = setInterval(init, 120000);
});

plants.addEventListener("change", () => {
	plantFilter = plants.value;
	getData();
});

groups.addEventListener("change", () => {
	groupFilter = groups.value;
	getData();
});

codes.addEventListener("change", () => {
	codeFilter = codes.value;
	getData();
});

operators.addEventListener("change", () => {
	operatorFilter = operators.value == 0 ? "Todos..." : operators.value;
	getData();
});

numbers.addEventListener('input', () => {
	numberFilter = numbers.value;
	console.log("selected numbers: " + numberFilter);

	getData();
})

document.addEventListener("scroll", () => {
	if (window.scrollY > 10) {
		document.getElementById("filters").setAttribute("class", "shadow");
	} else {
		document.getElementById("filters").removeAttribute("class", "shadow");
	};
});

async function getAreas() {
	try {
			await axios
				.get(`https://10.30.12.8/dar/despachador/areas`, {
					headers: {
						"X-Requested-With": "XMLHttpRequest",
					},
				})
				.then((response) => {
					console.log("Areas del usuario:", response);
					const resp = response.data.data;
				});
		} catch (e) {
			console.log(e);
		}
}

async function init() {
	await getAreas();
	
	await getReports();

	updatePlants();
	updateGroups();
	updateOperators();
	updateCodes();
	updateNumbers();
}

init();

let intervalId = setInterval(init, 120000);
