import { Component, OnInit } from '@angular/core';
import { EmployeeActivityService } from '../../services/employee-activity.service';
import { HallOfFameModel } from '../../models/hallOfFame.model';
import { LoadingControllerService } from '../../services/loading-controller.service ';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.page.html',
  styleUrls: ['./hall-of-fame.page.scss'],
})
export class HallOfFamePage implements OnInit {
  mainPageLink = '/';
  hallOfFameLeaders: HallOfFameModel[];
  paginationLength: number;
  startIndexOfListForPage: number;
  lastIndexOfListForPage: number;

  constructor(private service: EmployeeActivityService, private loadingControllerService: LoadingControllerService) {
  }

  ngOnInit() {
    this.loadingControllerService.present({
      message: 'Loading the Leaderboard...',
      translucent: 'false',
      spinner: 'bubbles'
    });
    this.service.getHallOfFameData()
      .subscribe((data: HallOfFameModel[]) => {
        this.hallOfFameLeaders = [...data];
        this.paginationLength = Math.ceil(this.hallOfFameLeaders.length / 10);
        this.loadingControllerService.dismiss();
      }, (error) => {
        this.loadingControllerService.dismiss();
        console.log(error);
      });
    this.setListIndexForPage(0);
  }

  setListIndexForPage(pageIndex) {
    this.startIndexOfListForPage = pageIndex * 10;
    this.lastIndexOfListForPage = this.startIndexOfListForPage + 10;
  }
}
