class AlfombrasBuilder {
    constructor( pais , precio ,stock ){
        this.pais = pais ;
        this.precio = precio;
        this.stock = stock
    }

}

const alfombrasArray = [];


class Methods{

    

    createNewAlfombra(){
        let pais = document.getElementById('input_pais')
        let precio = document.getElementById('input_precio');

        let stock = document.getElementById('input_stock');
        let stockAsnwer = "";
        stock.checked ? stockAsnwer = "YES" : stockAsnwer = "NO";

        let newAlfombra = new AlfombrasBuilder(pais.value , precio.value ,stockAsnwer);

        
        alfombrasArray.push(newAlfombra);
        console.log(alfombrasArray);

        this.AddAlfombra(alfombrasArray)
    }

        
    




    AddAlfombra (alfombra) {


     let body = document.getElementById('tbody');
     let htmlTR = "";
     
     htmlTR += "<td>" + alfombra[alfombra.length - 1].pais + "</td>";
     htmlTR += "<td>" + alfombra[alfombra.length - 1].precio + "</td>";
     htmlTR += "<td>" + alfombra[alfombra.length - 1].stock + "</td>";
     
     body.innerHTML += htmlTR;
    }
    
    

   

}