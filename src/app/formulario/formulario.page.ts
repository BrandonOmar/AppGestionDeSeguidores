import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms'


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  constructor(

    private router: Router

  ) { }

  ngOnInit() {
  }


  form()
  {
    alert("Estás haciendo clic en form");
  }

  face()
  {
    alert("Vas hacia la pagina de facebook");
  }

}
