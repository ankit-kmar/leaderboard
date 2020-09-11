import {AuthorModel} from './author.model';
import {LeaderModel} from './leader.model';

export interface HallOfFameModel {
    month: string;
    year: number;
    leaders: LeaderModel[];
}
