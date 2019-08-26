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

    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  




  constructor() { }

  ngOnInit() {
    const sourceData = data;
    const tempDataStore = {};

    for (const allrecord of sourceData) {
      const getmonth = new Date(allrecord.dateAdded).getMonth() + 1;
      // const numberCount = allrecord.id
          if (tempDataStore[getmonth]) {
            tempDataStore[getmonth] += 1;
          } else {
            tempDataStore[getmonth] = 1;
          }

    }

    const tagCount = {};

    for (const month in tempDataStore) {
      console.log(month)
      this.lineChartLabels.push(month);
      for (const tag in tempDataStore[month]) {
        if (tagCount[tag]) {
          tagCount[tag].push(tempDataStore[month])
        } else {
          tagCount[tag] = [tempDataStore[month]]
        }
      }
    }

    for (const tag in tagCount){
      this.lineChartData.push(
        {data: tagCount[tag], label: tag}
      )
    }
  }

}
