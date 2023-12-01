class Usuario extends Persona{
  private rol: string;
  private password: string;
  
  constructor(nombre: string, rol: string, passwornd: string, dni?:number) {
      super(nombre, dni);
      this.password = passwornd;
      this.rol = rol;
  }

  public mostrar():string {
    return `${this.nombre} - ${this.rol}`; 
  }
}