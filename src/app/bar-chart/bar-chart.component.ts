import { Component, OnInit } from '@angular/core';
import data from '../../data.js';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    // { data: [2000, 1500, 1000], label: 'XPS' },
  ];
  constructor() { }

  ngOnInit() {
    const sourceData = data;
    const tempDataStore = {};

    for (const allrecord of sourceData) {
      const getmonth = new Date(allrecord.dateAdded).getMonth() + 1;
      for (const tagrecord of allrecord.tags) {
        if (tempDataStore[getmonth]) {
          if (tempDataStore[getmonth][tagrecord]) {
          tempDataStore[getmonth][tagrecord] += allrecord.likes;
          } else {
          tempDataStore[getmonth][tagrecord] = allrecord.likes;
          }
      } else {
          tempDataStore[getmonth] = {};
          tempDataStore[getmonth][tagrecord] = allrecord.likes;
      }
      }
    }

    const tagCount = {};

    for (const month in tempDataStore) {
      console.log(month)
      this.barChartLabels.push(month);
      for (const tag in tempDataStore[month]) {
        if (tagCount[tag]) {
          tagCount[tag].push(tempDataStore[month][tag])
        } else {
          tagCount[tag] = [tempDataStore[month][tag]]
        }
      }
    }

    for (const tag in tagCount){
      this.barChartData.push(
        {data: tagCount[tag], label: tag}
      )
    }

    
  }

}
