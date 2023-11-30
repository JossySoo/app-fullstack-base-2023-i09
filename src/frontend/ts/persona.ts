class Persona{
    public nombre: string;
    private dni: number;
  
    constructor(dni: number, nombre:string) {
      this.dni = dni;
      this.nombre = nombre
    }
  }