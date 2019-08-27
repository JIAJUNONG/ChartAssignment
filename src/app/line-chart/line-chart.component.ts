import { Component, OnInit } from '@angular/core';
import data from '../../data.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartColors: Color[] = [

  ];


  constructor() { }

  ngOnInit() {
    const sourceData = data;
    const tempDataStore = {};

    for (const allrecord of sourceData) {
      const getmonth = new Date(allrecord.dateAdded).getMonth() + 1;
      if (tempDataStore[getmonth]) {
            tempDataStore[getmonth] += 1;
            } else {
              tempDataStore[getmonth] = 0;
              tempDataStore[getmonth] += 1;
              }
    }

    console.log(tempDataStore);

    this.lineChartLabels = Object.keys(tempDataStore);

    console.log(this.lineChartLabels);

    // tslint:disable-next-line: forin
    for (const num in tempDataStore) {
      this.lineChartData.push(
        {data: tempDataStore[num], label: 'Number Of Pic'}
      );
    }
    console.log(this.lineChartData)
  }

}
