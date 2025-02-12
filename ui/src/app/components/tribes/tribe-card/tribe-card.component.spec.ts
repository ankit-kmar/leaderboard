import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TribeCardComponent} from './tribe-card.component';

describe('TribeCardComponent', () => {
    let component: TribeCardComponent;
    let fixture: ComponentFixture<TribeCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TribeCardComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(TribeCardComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
