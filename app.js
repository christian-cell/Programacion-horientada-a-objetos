class AlfombrasBuilder {
    constructor( pais , precio ,stock ){
        this.pais = pais ;
        this.precio = precio;
        this.stock = stock
    }
}

const alfombrasArray = [];

class UserInterface {

    methods = new Methods();

    ShowTotalPrice () {
        let prices = this.methods.PriceFilter();
        var precioTotal = prices.reduce(  (a,b)=> parseFloat(a) + parseFloat(b) );
        this.methods.input_total.value = precioTotal

    }

    ShowTotalAlfombras() {
        console.log(alfombrasArray);
        this.methods.input_total_alfombras.value = alfombrasArray.length;
    }

    DeleteAlfombras () {
        this.methods.input_total.value = "";
        this.methods.body.innerHTML = "";
        this.methods.input_total_alfombras.value = "";
    }

    AddAlfombra (alfombra) {
        let htmlTR = "";
        htmlTR += "<td>" + alfombra[alfombra.length - 1].pais + "</td>";
        htmlTR += "<td>" + alfombra[alfombra.length - 1].precio + "</td>";
        htmlTR += "<td>" + alfombra[alfombra.length - 1].stock + "</td>";
        this.methods.body.innerHTML += htmlTR;
    }

}

class Methods{

    body = document.getElementById('tbody');
    input_total = document.getElementById('input_total_precio');
    input_total_alfombras = document.getElementById('input_total');

    createNewAlfombra(){
        let pais = document.getElementById('input_pais')
        let precio = document.getElementById('input_precio');
        let stock = document.getElementById('input_stock');
        let stockAsnwer = "";
        stock.checked ? stockAsnwer = "YES" : stockAsnwer = "NO";
        let newAlfombra = new AlfombrasBuilder(pais.value , precio.value ,stockAsnwer);
        alfombrasArray.push(newAlfombra);
        let userInterface = new UserInterface();
        userInterface.AddAlfombra(alfombrasArray)
    }

    /* ShowTotalAlfombras() {
        console.log(alfombrasArray);
        this.input_total_alfombras.value = alfombrasArray.length;
    } */

    PriceFilter () {

        let preciosArray = [];
        for (let index = 0; index < alfombrasArray.length; index++) {
            const precios = alfombrasArray[index].precio;
            preciosArray.push(precios)
        }
        return preciosArray;
    }

    /* ShowTotalPrice () {
        let prices = this.PriceFilter();
        var precioTotal = prices.reduce(  (a,b)=> parseFloat(a) + parseFloat(b) );
        this.input_total.value = precioTotal

    } */

   /*  DeleteAlfombras () {
        this.input_total.value = "";
        this.body.innerHTML = "";
        this.input_total_alfombras.value = "";
    } */

   /*  AddAlfombra (alfombra) {
     let htmlTR = "";
     htmlTR += "<td>" + alfombra[alfombra.length - 1].pais + "</td>";
     htmlTR += "<td>" + alfombra[alfombra.length - 1].precio + "</td>";
     htmlTR += "<td>" + alfombra[alfombra.length - 1].stock + "</td>";
     this.body.innerHTML += htmlTR;
    } */
}