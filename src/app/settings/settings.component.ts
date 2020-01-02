import {Component, OnInit} from '@angular/core';
import {Settings} from '../models/settings';
import {HttpLibService} from '../services/http-lib.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  listOfTerminals: string[] = [];
  listOfFunctions: string[] = [];

  constructor(private httpLibService: HttpLibService) {
    // Get List of Terminals and Functions from Server
    httpLibService.getListOfTerminals().subscribe(res => {
      this.listOfTerminals = res;
    });
    httpLibService.getListOfFunctions().subscribe(res => {
      this.listOfFunctions = res;
    });
  }

  // define default Setting Object:
  settings: Settings = {
    id: -1,
    numberOfRuns: 10,
    functions: [],
    terminals: [],
    initialTreeDepthMin: 2,
    initialTreeDepthMax: 6,
    initialGrowProbability: 0.5,
    maxTreeSizeCrossover: 17,
    populationSize: 2000,
    generationSize: 60,
    crossoverProbability: 0.75,
    mutationProbability: 0.2,
    reproductionProbability: 0.05,
    selectionNonTerminals: 0.9,
    selectionTerminals: 0.1,
    tournamentSize: 3,
    elitism: 0
  };

  ngOnInit() {
  }

}
