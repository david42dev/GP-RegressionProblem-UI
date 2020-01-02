import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OutputData} from '../../models/OutputData';

@Component({
  selector: 'app-result-graph',
  templateUrl: './result-graph.component.html',
  styleUrls: ['./result-graph.component.css']
})
export class ResultGraphComponent implements OnInit, OnChanges {

  @Input() outputData: OutputData[] = [];
  @Input() settingsId: number;

  // multi: any[];
  graphData: any[] = [];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Generations';
  yAxisLabel: string = 'Fitness';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    this.refresh();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {

  }

  private updateGraphData() {
    // Refresh graph data:
    this.graphData = [];
    // Push average data for the number of runs over the whole generation
    const avgSeries: any[] = [];
    for (let out of this.outputData) {
      avgSeries.push({
        name: out.generation.toString(),
        value: out.avgFitnessOverAll,
      });
    }
    this.graphData.push(
      {
        name: 'Avg. Adj. Fitness over all',
        series: avgSeries,
      }
    );
    // Push average of the best individual over the whole generation (adj fitness)
    const avgSeriesBest: any[] = [];
    for (let out of this.outputData) {
      avgSeriesBest.push({
        name: out.generation.toString(),
        value: out.avgAdjFitness,
      });
    }
    this.graphData.push(
      {
        name: 'Adj. Fitness over the best',
        series: avgSeriesBest,
      }
    );
    // Push the graph of the overall best individual from all runs:
    const avgSeriesOverallBest: any[] = [];
    for (let out of this.outputData) {
      avgSeriesOverallBest.push({
        name: out.generation.toString(),
        value: out.overallBest,
      });
    }
    this.graphData.push(
      {
        name: 'Overall Best Individual',
        series: avgSeriesOverallBest,
      }
    );
    console.log(this.graphData);
    return this.graphData;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refresh();
  }

  private refresh() {
    const graphData = this.updateGraphData();
    Object.assign(this, {graphData});
  }

}
