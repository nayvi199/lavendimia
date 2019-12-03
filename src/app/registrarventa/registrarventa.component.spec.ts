import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarventaComponent } from './registrarventa.component';

describe('RegistrarventaComponent', () => {
  let component: RegistrarventaComponent;
  let fixture: ComponentFixture<RegistrarventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
