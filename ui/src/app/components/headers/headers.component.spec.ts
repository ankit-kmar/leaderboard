import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {HeadersComponent} from './headers.component';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeadersComponent', () => {
    let component: HeadersComponent;
    let fixture: ComponentFixture<ParentComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeadersComponent, ParentComponent],
            imports: [IonicModule.forRoot(), RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ParentComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have title TEST', () => {
        expect(component.title).toEqual('LEADERBOARD');
    });

});

@Component({
    selector: 'parent',
    template: '<app-headers></app-headers>'
})
class ParentComponent {
}
