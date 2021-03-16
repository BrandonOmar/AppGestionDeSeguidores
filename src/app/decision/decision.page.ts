import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.page.html',
  styleUrls: ['./decision.page.scss'],
})
export class DecisionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  formulario()
    {
      this.router.navigate(['/formulario']);
    }

    pageFacebook()
    {
      location.href = "https://www.facebook.com/somosrwr";
    }

    logout()
    {
      this.router.navigate(['/login']);
    }

}
