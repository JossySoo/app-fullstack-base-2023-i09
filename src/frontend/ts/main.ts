

class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {
        let usuari1: Usuario = new Usuario("user1", "user", "1234");
        let usuario2: Usuario = new Usuario("admin1", "admin", "1235");
        this.usuarios.push(usuari1);
        this.usuarios.push(usuario2);
        for (let u of this.usuarios) {
            console.log(u.mostrar,this.usuarios.length);
        }
    }
    handleEvent(object: Event): void {
        this.buscarPersonas();
    }

}

    
window.addEventListener("load", () => {

    let main1: Main = new Main();
    let boton = document.getElementById("btnSaludar");

    boton.addEventListener("click", main1);   

    


});

