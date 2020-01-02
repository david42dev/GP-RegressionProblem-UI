import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultExportComponent } from './result-export.component';

describe('ResultExportComponent', () => {
  let component: ResultExportComponent;
  let fixture: ComponentFixture<ResultExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
