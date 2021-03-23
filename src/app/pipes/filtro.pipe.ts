import { Pipe, PipeTransform } from '@angular/core';
import { DatosI } from '../models/datosSeguidor.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {


  transform(arrayColeccionDatos: any, texto : string): any {
    
    if (texto.length === 0) { return arrayColeccionDatos; }

    texto = texto.toLocaleLowerCase();
    
    return arrayColeccionDatos.filter( seguidor =>{
       return seguidor.data.nombre.toLocaleLowerCase().includes(texto)
       || seguidor.data.estado.toLocaleLowerCase().includes(texto);
    });
  }

}
