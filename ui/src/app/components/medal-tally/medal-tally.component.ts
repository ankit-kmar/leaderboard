import { Component, Input, OnInit } from '@angular/core';
import { MedalTallyModel } from '../../models/medalTally.model';

@Component({
  selector: 'app-medal-tally',
  templateUrl: './medal-tally.component.html',
  styleUrls: ['./medal-tally.component.scss'],
})
export class MedalTallyComponent implements OnInit {
  @Input() medalTally: MedalTallyModel;
  medalTallyKeys: string[];
  imageSrcMap = {
    gold: './assets/icon/gold-medal.svg',
    silver: './assets/icon/silver-medal.svg',
    bronze: './assets/icon/bronze-medal.svg'
  };

  ngOnInit() {
    this.medalTallyKeys = Object.keys(this.medalTally);
  }
}
