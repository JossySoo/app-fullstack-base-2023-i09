class Persona{
    public nombre: string;
    private dni: number;
  
    constructor(nombre:string, dni?: number) {
      this.dni = dni;
      this.nombre = nombre
    }
  }