import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrowdopComponent } from './search-drowdop.component';

describe('SearchDrowdopComponent', () => {
  let component: SearchDrowdopComponent;
  let fixture: ComponentFixture<SearchDrowdopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDrowdopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDrowdopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
