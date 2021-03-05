import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleSeguidorPage } from './detalle-seguidor.page';

describe('DetalleSeguidorPage', () => {
  let component: DetalleSeguidorPage;
  let fixture: ComponentFixture<DetalleSeguidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSeguidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleSeguidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
