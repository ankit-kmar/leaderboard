import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../models/author.model';
import {EmployeeActivityService} from '../../services/employee-activity.service';
import {FormControl} from '@angular/forms';
import {EmployeeFilterPipe} from '../../pipe/employee-filter.pipe';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    employeeData: AuthorModel[];
    dataKeys: string[];
    pageTitle = 'Leaderboard';
    searchBar = new FormControl('');
    empFilterPipe = new EmployeeFilterPipe();
    filteredEmpData: AuthorModel[];

    constructor(private service: EmployeeActivityService) {
    }

    ngOnInit() {
        this.service.getData()
            .subscribe((data: AuthorModel[]) => {
                this.employeeData = data;
                this.dataKeys = (Object.keys(this.employeeData[0])).slice(1, 7);
                this.filteredEmpData = this.employeeData;
            });
    }

    filterEmp() {
        this.filteredEmpData = this.empFilterPipe.transform(this.employeeData, this.searchBar.value);
    }
}
