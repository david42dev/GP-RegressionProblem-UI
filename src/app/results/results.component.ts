import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OutputData} from '../models/OutputData';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() outputData: OutputData[];
  @Input() settingsId: number;
  displayedColumns: string[] = ['generation', 'hits', 'adjFitness', 'avgFitness', 'stdFitness'];
  outputs = new MatTableDataSource<OutputData>(this.outputData);

  constructor() {
  }

  ngOnInit() {
    this.outputs.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refresh();
  }

  private refresh() {
    this.outputs = new MatTableDataSource<OutputData>(this.outputData);
    this.outputs.paginator = this.paginator;
  }

}

