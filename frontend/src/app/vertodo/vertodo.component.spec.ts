import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertodoComponent } from './vertodo.component';

describe('VertodoComponent', () => {
  let component: VertodoComponent;
  let fixture: ComponentFixture<VertodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VertodoComponent]
    });
    fixture = TestBed.createComponent(VertodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
