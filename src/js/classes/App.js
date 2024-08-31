"use stric";

//* Import
import Calculadora from "./Calculadora.js";

//* Instancias
const cal = new Calculadora();

export default class App {
    constructor () {}

    initApp() {
        cal.sendForm();
        cal.funtionsCal();
    }
}