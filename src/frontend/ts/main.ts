
var M;
class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {

   
        for (let u of this.usuarios) {
            console.log(u.mostrar(),this.usuarios.length);
        }
    }
    public buscarDevices() {
        
        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta);
                    
                    let ul = document.getElementById("listaDisp"); 
                    let switch_status:string;
                    ul.innerHTML ="";
                    for (let d of datos) {
                        if (d.state) {
                            switch_status= "checked"
                        } else {
                            switch_status=""
                        }

                        let itemList =
                        `<li class="collection-item avatar">
                            <div class="row">
                                <div class="col s6 m6 l6">
                                    <img src="./static/images/lightbulb.png" alt="" class="circle">
                                    <span class="title">${d.name}</span>
                                    <p>${d.description}</p>
                                </div>
                                <div class="col s6 m6 l6">
                                    <div class="row">
                                        <div class="col s12 m12 l6 center">
                                            <div class="switch">
                                            <label>
                                            Off
                                            <input type="checkbox" nuevoAtt="${d.id}" id="cb_${d.id}"${switch_status}>
                                            <span class="lever"></span>
                                            On
                                            </label>
                                            </div>
                                        </div>
                                        <div class="col s12 m12 l6 center">
                                            <button class="btn edit_btn modal-trigger" id="edit_${d.id}" nuevoAtt="${d.id}" href="#modal_edit">
                                                <i class="material-icons" id="edit_icon_${d.id}" nuevoAtt="${d.id}">edit</i></button>
                                            <button class="btn edit_btn" id="delete_${d.id}" nuevoAtt="${d.id}">
                                                <i class="material-icons" id="delete_icon_${d.id}" nuevoAtt="${d.id}">delete</i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`
                       
                        ul.innerHTML += itemList;

                    }
                    for (let d of datos) {
                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);

                        let edit_btn = document.getElementById("edit_" + d.id);
                        edit_btn.addEventListener("click", this);

                        let delete_btn = document.getElementById("delete_" + d.id);
                        delete_btn.addEventListener("click", this);
                    }

                }else{
                    console.log("no encontre nada");
                }
            }
            
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

    private ejecutarPost(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
        }
        
        xmlRequest.open("POST", "http://localhost:8000/device_state", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: state   };
        xmlRequest.send(JSON.stringify(s));
    }

    private cargarUsuario(): void{
        let iNombre =<HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value,23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";
           
            
            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className ="textoCorrecto";
            
        } else {
            pInfo.innerHTML = "Usuario o contraseña incorrecta!!!";
            pInfo.className ="textoError";
        }
    }

    private editDevices(dev_id:number):void {
        console.log(`Editar dispositivo ${dev_id}`);
        
        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let device:Device = JSON.parse(respuesta)[0];
                    
                    let input_nombre =<HTMLInputElement>document.getElementById("Nombre_disp");
                    input_nombre.value = device.name

                    let input_description =<HTMLInputElement>document.getElementById("Descripcion_disp");
                    input_description.value = device.description

                    let select_type =<HTMLSelectElement>document.getElementById("select_tipo");
                    select_type.value = String(device.type);
                    M.FormSelect.init(select_type);
                    console.log("El valor del select es ",select_type.value);

                    let btn_guardar =<HTMLElement>document.getElementById("btnGuardarDev");
                    btn_guardar.setAttribute("nuevoAtt",String(dev_id))

                }else{
                    console.log("no encontre nada");
                }
            }
            
        }
        xmlRequest.open("GET",`http://localhost:8000/otraCosa/${dev_id}`,true)
        xmlRequest.send();
    
    }

    private saveEdit (dev_id:number) {
        let input_nombre =<HTMLInputElement>document.getElementById("Nombre_disp");
        let input_description =<HTMLInputElement>document.getElementById("Descripcion_disp");
        let select_type =<HTMLSelectElement>document.getElementById("select_tipo");

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal el post");
                }
            }
        }
        
        xmlRequest.open("POST", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id:dev_id,
            name:input_nombre.value,
            description:input_description.value,
            type: parseInt(select_type.value) };
        console.log("post: ",s)
        xmlRequest.send(JSON.stringify(s)) ;
    }

    private saveNew () {
        let input_nombre =<HTMLInputElement>document.getElementById("Nombre_new");
        let input_description =<HTMLInputElement>document.getElementById("Descripcion_new");
        let select_type =<HTMLSelectElement>document.getElementById("Tipo_new");
        let checkbox = <HTMLInputElement>document.getElementById("checkbox_new");

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal el post");
                }
            }
        }
        
        xmlRequest.open("POST", "http://localhost:8000/device_new", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json"); 
        let s = {
            name:input_nombre.value,
            description:input_description.value,
            state: checkbox.checked,
            type: parseInt(select_type.value) };
        console.log("post: ",s);
        xmlRequest.send(JSON.stringify(s));
    }

    private deleteDevices (dev_id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta",xmlRequest.responseText);        
                } else {
                    alert("Salio mal el post");
                }
            }
        }
        xmlRequest.open("POST", "http://localhost:8000/delete_device", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json"); 
        xmlRequest.send(JSON.stringify({id:dev_id}));
    }

    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;
        
        
        if ("btnListar" == elemento.id) {
            this.buscarDevices();

            
        } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario();
        } else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"),checkbox.checked, elemento.id.substring(3, elemento.id.length));
            this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);

        } else if (elemento.id.startsWith("edit_")) {
            let edit_btn = <HTMLElement>elemento;
            this.editDevices(parseInt(edit_btn.getAttribute("nuevoAtt")));
        } else if (elemento.id.startsWith("delete_")) {
            let delete_btn = <HTMLElement>elemento;
            this.deleteDevices(parseInt(delete_btn.getAttribute("nuevoAtt")));
        } else if ("btnGuardarDev" == elemento.id) {
            let botonGuardarDev = <HTMLElement>elemento;
            this.saveEdit(parseInt(botonGuardarDev.getAttribute("nuevoAtt")));
        } else if ("btnAgregar" == elemento.id) {
            this.saveNew();
        }

    }

}

    
window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, "");
    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");

    let main1: Main = new Main();
    let boton = document.getElementById("btnListar");
    
    boton.addEventListener("click", main1);   

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1);

    let botonGuardarDev = document.getElementById("btnGuardarDev");
    botonGuardarDev.addEventListener("click",main1);

    let botonNewDev = document.getElementById("btnAgregar");
    botonNewDev.addEventListener("click",main1);
    
    main1.buscarDevices()

});

