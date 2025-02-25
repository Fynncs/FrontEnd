import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatarBugComponent } from './relatar-bug.component';

describe('RelatarBugComponent', () => {
  let component: RelatarBugComponent;
  let fixture: ComponentFixture<RelatarBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatarBugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatarBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
