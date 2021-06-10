class AlfombrasBuilder {
    constructor( pais , precio ,stock ,id){
        this.pais = pais ;
        this.precio = precio;
        this.stock = stock;
        this.id = id
    }
}

let alfombrasArray = [];

class UserInterface {

    methods = new Methods();

    ShowTotalPrice () {
        let prices = this.methods.PriceFilter();
        console.log(prices);
        if ( prices.length > 0 ){

            var precioTotal = prices.reduce(  (a,b)=> parseFloat(a) + parseFloat(b) );
            this.methods.input_total_precio.value = precioTotal

        } else {
            alert('Necesita Introducir almenos una alfombra para ver el Precio Toltal')
        }
    }

    TotalPriceStock () {
     let preciosStock = [] ;

        if ( alfombrasArray.length > 0 ){

            for (let i = 0; i < alfombrasArray.length; i++) {
                if ( alfombrasArray[i].stock === "YES") preciosStock.push(alfombrasArray[i].precio);
            }
            let precioStock = preciosStock.reduce(  (a,b)=> parseFloat(a) + parseFloat(b) );
            this.methods.input_total_precio.value = ""; 
            this.methods.input_total_precio.value = precioStock ;
        } else {
            alert('Introduce Una Alfombra con stock')
        }
    }

    ShowTotalAlfombras() {
        console.log(alfombrasArray.length)
        if (alfombrasArray.length > 0){
            this.methods.input_total_alfombras.value = alfombrasArray.length;
        } else {
            alert('No introdujo una alfombra aún')
        }
    }

    DeleteAlfombras () {
        this.methods.input_total.value = "";
        this.methods.body.innerHTML = "";
        this.methods.input_total_alfombras.value = "";
    }

    AddAlfombra (alfombra) {
        let htmlTR = "";
        htmlTR += ` <td class="pais_td" > ${alfombra[alfombra.length - 1].pais} </td> `;
        htmlTR += ` <td class="precio_td" > ${alfombra[alfombra.length - 1].precio} </td> `;
        htmlTR += ` <td class="stock_td" > ${alfombra[alfombra.length - 1].stock} </td> `;
        htmlTR += ` <td class="id_td" > ${alfombra[alfombra.length - 1].id} </td> `;
        htmlTR += ` <td> 
                        <button class="btn btn-danger" 
                            onclick="new Methods().borrar(this.parentElement.
                            parentElement,this.parentElement.previousElementSibling)"> 
                            Delete 
                        </button>  
                    </td> `
        this.methods.body.innerHTML += htmlTR;
    }

    /* showMessage(message , cssClass) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-`+ cssClass;
        const container = document.getElementById('container');
        const row = document.getElementById('row');
        container.insertBefore(div , row);
 
        setTimeout(() => {
            div.remove();
        }, 3000);
 
     };
 */
    ShowAlert ( message  ,className) {
        let alertContainer = document.getElementById('alert-container');
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.style.width = "100%";
        div.style.height = "50px";
        div.style.padding = "8px";
        div.style.fontSize = "20px";
        div.className =  className;
        alertContainer.appendChild(div)

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

}

class Methods {


    body = document.getElementById('tbody');
    input_total_precio = document.getElementById('input_total_precio');
    input_total_alfombras = document.getElementById('input_total');

    createNewAlfombra(){
        let pais = document.getElementById('input_pais')
        let precio = document.getElementById('input_precio');
        let stock = document.getElementById('input_stock');
        let identificador = document.getElementById('identificador');
        let stockAsnwer = "";

        stock.checked ? stockAsnwer = "YES" : stockAsnwer = "NO";

        console.log(pais.value)
        console.log(precio.value)
        console.log(identificador.value)

        if ( pais.value === "" || precio.value === "" || identificador.value === ""  ){
            let userInterface = new UserInterface();
             // alert('Revise y complete los campos Pais , Precio e Identificador')
 
            userInterface.ShowAlert('Revise y complete los campos Pais , Precio e Identificador',
            'btn btn-warning')
        } else {

            let newAlfombra = new AlfombrasBuilder(pais.value , precio.value ,stockAsnwer , identificador.value);
            let newAlfombraResp = true ;

            for (let i = 0; i < alfombrasArray.length; i++) {
                newAlfombra.id === alfombrasArray[i].id ? newAlfombraResp = false : newAlfombraResp = true ;
            }

            
            if(newAlfombraResp){
                /* podemos añadir nueva alfombra */
                alfombrasArray.push(newAlfombra);
                let userInterface = new UserInterface();
                userInterface.AddAlfombra(alfombrasArray)
                stock.checked = false;
                pais.value = "";
                precio.value = "";
                identificador.value = "";
                // let userInterface = new UserInterface();
                userInterface.ShowAlert('Alfombra Guardada',
                'btn btn-success')
            } else {
                // alert('No puede introducir alfombra con IDENTIFICADOR repetido')
                let userInterface = new UserInterface();
                userInterface.ShowAlert('No puede introducir alfombra con IDENTIFICADOR repetido',
                'btn btn-danger')
            }
        }
    }

    
    borrar(parent,precioBorrar){
        parent.remove();
        let idToFilter = precioBorrar.textContent;
        let newArray = alfombrasArray.filter((alfombra)=> parseInt(alfombra.id) !== parseInt(idToFilter))
        alfombrasArray = newArray;
    }
    
    PriceFilter () {

        let preciosArray = [];
        for (let index = 0; index < alfombrasArray.length; index++) {
            const precios = alfombrasArray[index].precio;
            preciosArray.push(precios)
        }
        return preciosArray;
    }
}