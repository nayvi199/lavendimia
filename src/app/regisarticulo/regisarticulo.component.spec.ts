import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisarticuloComponent } from './regisarticulo.component';

describe('RegisarticuloComponent', () => {
  let component: RegisarticuloComponent;
  let fixture: ComponentFixture<RegisarticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisarticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisarticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
