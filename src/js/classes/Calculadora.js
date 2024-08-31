"use stric";

//* Imports 
import UI from "./UI.js";

//* Instancias
const ui = new UI();

//* Objects
const mistakes = {
	empty : [],
	checked : false
}

export default class Calculadora {
	constructor () {}

	sendForm() {
		const sendBtn = document.querySelector(".calculate_form-btn");
		sendBtn.addEventListener("click", e => {
			if(e.target.tagName === "INPUT") e.preventDefault();

			this.validarForm();

			if(mistakes.empty.length === 0 && !mistakes.checked) this.getResult();
		});

		sendBtn.addEventListener("keypress", e => {
			if(e.key === "Enter") {
				if(e.target.tagName === "INPUT") e.preventDefault();

				this.validarForm();
	
				if(mistakes.empty.length === 0 && !mistakes.checked) this.getResult();
			}
		});
	}

	funtionsCal() {
		const containerInput = document.querySelectorAll(".inputs_radio");
		const fieldInputs = document.querySelectorAll(".calculate_form-input > input");
		const btnClearAll = document.querySelector("#clear-all");

		btnClearAll.addEventListener('click', e => {
			ui.clearAll();
		});

		ui.formatAmount();

		fieldInputs.forEach(input => {
			input.addEventListener("focus", e => {
				ui.focusInputs(e.target);
			}); 

			input.addEventListener("focusout", e => {
				ui.clearFocus(e.target.parentElement);
			})
		});
	
		containerInput.forEach(input => {
			input.addEventListener("click", () => {
				ui.focusRadio(input);
				ui.clearAlert(input.parentElement, "radio");

				if(mistakes.checked) mistakes.checked = false;
			});

			input.addEventListener("keypress", e => {
				if(e.key === "Enter") {
					ui.focusRadio(input);
					ui.clearAlert(input.parentElement, "radio");
					input.firstElementChild.firstElementChild.checked = true;
	
					if(mistakes.checked) mistakes.checked = false;
				}
			})
		});
	}

	validarForm() {
		const fieldInputs = document.querySelectorAll(".calculate_form-input > input");

		this.validateRadio();

		fieldInputs.forEach(input => {
			input.addEventListener("keypress", e => {
				ui.clearAlert(input.parentElement);

				if(mistakes.empty.includes(e.target.name)) {
					let newEmpty = mistakes.empty.filter(name => name !== e.target.name);
					mistakes.empty = newEmpty;
				}
			})

			if(input.value === "") {
				let msg = "This filed is requeried";
				const err = ui.printAlert(msg, input);
				if(!mistakes.empty.includes(input.name)) mistakes.empty.push(err);
			}
		});
	}

	validateRadio() {
		const radioInputs = document.querySelectorAll("input[type=radio]");

		if(!radioInputs[0].checked && !radioInputs[1].checked) {
			let msg = "This field is requeried";
			ui.printAlert(msg, radioInputs[0].parentElement.parentElement, "radio");
			mistakes.checked = true;
		}
	}

	getResult() {
		const amount = document.querySelector("#amount").value;
		const time = document.querySelector("#term").value;
		const interest = document.querySelector("#interest").value;
		const typeRadio = document.querySelectorAll("input[type=radio]");

		let newAmount = amount.split(",");
		let typeSelect, cuotaMth, total, interestMth, timeMth;

		newAmount = newAmount.join("");
		interestMth = interest / 12;
		timeMth = time * 12;
		
		for (const type of typeRadio) {
			if(type.checked) typeSelect = type.value;
		}

		cuotaMth = newAmount * (Math.pow(1+interestMth/100, timeMth)*interestMth/100)/(Math.pow(1+interestMth/100, timeMth)-1);

		total = cuotaMth * timeMth;

		total = Number(total.toFixed(2));
		cuotaMth = Number(cuotaMth.toFixed(2));
		
		if(typeSelect === "1") {
			total = ui.formatMoney(total);
			cuotaMth = ui.formatMoney(cuotaMth);

			ui.showResult(cuotaMth, total);
		} else if(typeSelect === "2") {
			total = total - newAmount;
			cuotaMth = total / timeMth;

			total = ui.formatMoney(total);
			cuotaMth = ui.formatMoney(cuotaMth);

			ui.showResult(cuotaMth, total);
		}
	}
}
