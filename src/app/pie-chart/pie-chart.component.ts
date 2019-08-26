import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import data from '../../data.js';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartColors = [
  //   {
  //     // backgroundColor: ['red', 'orange', 'yellow', 'green',
  //     //                   'blue', 'indigo', 'purple', 'black'],
  //   },
  // ];

  constructor() { }

  ngOnInit() {
    const alldata = data;

    const countTag = {};
    console.log(countTag)

    for (const x of alldata) {
      for (const tagName of x.tags) {
        if (countTag[tagName]) {
          countTag[tagName] += 1;
        } else {
          countTag[tagName] = 1;
        }
      }
    }

    for (const key in countTag) {
      this.pieChartLabels.push(key);
      const numPics = countTag[key];
      this.pieChartData.push(numPics);
    }



  }

}
