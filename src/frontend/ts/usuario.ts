class Usuario extends Persona{
  private rol: string;
  private password: string;
  
  constructor(nombre: string, dni:number, rol: string, passwornd: string) {
      super(dni, nombre);
      this.password = passwornd;
      this.rol = rol;
  }

  mostrar():string {
    return `${super.nombre} - ${this.rol}`; 
  }
}