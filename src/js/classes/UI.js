"use stric";

//* Selectors
const resultEmpty = document.querySelector('.results-empty');

export default class UI {
	constructor () {}

	showResult(cuota, total) {
		const containerResult = document.querySelector("#results");
		const resultPrevius = document.querySelector("#results_repay");

		resultEmpty.style.display = "none";

		if(resultPrevius) resultPrevius.remove();

		const container = document.createElement("DIV");
		const titleResult = document.createElement("H2");
		const descriptionResult = document.createElement("P");
		const repayContainer = document.createElement("DIV");
		const repayMonthly = document.createElement("DIV");
		const titleMonthly = document.createElement("P");
		const amountMonthly = document.createElement("P");
		const symbolMonthly = document.createElement("SPAN");
		const repayTotal = document.createElement("DIV");
		const titleTotal = document.createElement("P");
		const amountTotal = document.createElement("P");
		const symbolTotal = document.createElement("SPAN");

		container.id = "results_repay"

		titleResult.classList.add("results_title", "results_title-filled");
		titleResult.textContent = "Your results";
		
		descriptionResult.classList.add("results_description","results_description-filled");
		descriptionResult.textContent = "Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.";

		repayContainer.classList.add("results_repay");

		repayMonthly.classList.add("results_repay-monthly");
		titleMonthly.textContent = "Your monthly repayments";
		amountMonthly.id = "amount-monthly";
		amountMonthly.textContent = `£${cuota}`;
		
		repayTotal.classList.add("results_repay-term");
		titleTotal.textContent = "Total you'll repay over the term";
		amountTotal.id = "amount-term";
		amountTotal.textContent = `£${total}`;
		
		amountMonthly.appendChild(symbolMonthly);
		amountTotal.appendChild(symbolTotal);
		
		repayMonthly.appendChild(titleMonthly);
		repayMonthly.appendChild(amountMonthly);
		
		repayTotal.appendChild(titleTotal);
		repayTotal.appendChild(amountTotal);
		
		repayContainer.appendChild(repayMonthly);
		repayContainer.appendChild(repayTotal);
		
		container.appendChild(titleResult);
		container.appendChild(descriptionResult);
		container.appendChild(repayContainer);

		containerResult.appendChild(container);
	}

	focusRadio(input) {
		let inputChecked = document.querySelector(".checked");
		if(inputChecked) inputChecked.classList.remove("checked");
		input.classList.add("checked");
	}

	focusInputs(event) {
		let input = event.parentElement;
		this.clearFocus(input);
		input.classList.add("focus");
	}

	clearAll() {
		const fieldInputs = document.querySelectorAll(".calculate_form-input > input");
		const alerts = document.querySelectorAll('.alert');
		const alertsInput = document.querySelectorAll('.alert_input');
		const radioChecked = document.querySelector('.checked');
		const resultRepay = document.querySelector("#results_repay");
		
		alerts.forEach(err => err.remove())

		alertsInput.forEach(input => input.classList.remove('alert_input'));

		if (radioChecked) {
			radioChecked.classList.remove('checked')
			radioChecked.firstElementChild.firstElementChild.checked = false;
		}

		for (const input of fieldInputs) input.value = "";

		if(resultRepay) {
			resultEmpty.style.display = "flex";
			resultRepay.remove();
		}
	}

	formatAmount() {
		let inputAmount = document.querySelector("#amount");

		inputAmount.addEventListener("keyup", e => {
			let value = inputAmount.value.split(',');
			let amount;
			value = value.join("");

			if(e.key !== ".") amount = this.formatMoney(value);

			if (parseFloat(amount)) inputAmount.value = amount;
		});
	}

	formatMoney(amount) {
		return new Intl.NumberFormat('en-US').format(amount);
	}

	printAlert(msg, input, type = false) {
		let containerInput = input.parentElement;

		this.clearAlert(containerInput, type);

		const alert = document.createElement("P");

		if(!type) containerInput.classList.add("alert_input");
		alert.classList.add("alert");
		alert.textContent = msg;

		containerInput.parentElement.appendChild(alert);
		return input.name;
	}

	clearFocus(input) {
		if(input.classList.contains("focus")) input.classList.remove("focus");
	}

	clearAlert(input, type = false) {
		const alert = input.parentElement.querySelector(".alert");

		if(alert) alert.remove();

		if(!type && input.classList.contains("alert_input")) input.classList.remove("alert_input")
		
	}
}
