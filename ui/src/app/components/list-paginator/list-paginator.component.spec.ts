import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ListPaginatorComponent } from './list-paginator.component';

describe('ListPaginatorComponent', () => {
  let component: ListPaginatorComponent;
  let fixture: ComponentFixture<ListPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaginatorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPaginatorComponent);
    component = fixture.componentInstance;
  }));

  it('should create and emplty list of length same as paginatorLength', () => {
    component.paginatorLength = 3;
    component.ngOnInit();
    expect(component.paginatorList.length).toEqual(3);
  });
});
