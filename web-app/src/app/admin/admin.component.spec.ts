import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should create the app', () => {
    const fixture = TestBed.createComponent (AdminComponent);
    const app = fixture. componentInstance;
    expect(app).toBeTruthy();
  });

  it( "should have as values", () => {
    const fixture = TestBed. createComponent (AdminComponent);
    const app = fixture. componentInstance;
    expect (app.minValue).toBeGreaterThanOrEqual(0);
    expect (app.averageValue).toBeLessThanOrEqual(app.maxValue);
    expect (app.averageValue).toBeGreaterThanOrEqual(app.minValue);
    
  });


});