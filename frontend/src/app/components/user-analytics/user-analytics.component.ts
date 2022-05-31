import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  response : any = [];
  usersAnalytics : any = [];
  userlabels: any = [];
  userpuchases: any = [];
  maxValue: number = 0;

  constructor(private userSevice: UserService, ) { }

  ngOnInit(): void {
    this.setData();
  }

  setData(){
    this.userSevice.getUsersReport().subscribe(
      res=>{
        this.response = res;
        this.usersAnalytics = this.response.content;
        //console.log(this.usersAnalytics);
        //console.log(this.usersAnalytics[1]);
        for (const user of this.usersAnalytics) {
          this.userlabels.push((user[1].name +' '+user[1].lastname));
          this.userpuchases.push(Number(user[0]));
        }
        //console.log(this.userlabels);
        //this.maxValue = Math.max(...this.userpuchases);
        //console.log(maxValue);
        this.setchart();
        
      },
      err=>console.log(err)
    );
  }

  // -----------------------------------------------------------------------------------
  // BAR CHART
  // -----------------------------------------------------------------------------------

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    
    scales: {
      x: {},
      y: {
        min: 0,
        max: 5
        ticks: {
          stepSize: 1
       }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.userlabels,
    datasets: [
      { data: this.userpuchases, label: 'Compras realizadas',
        backgroundColor: '#E1A140' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public setchart(): void {
    this.barChartData.datasets[0].data = this.userpuchases;
    this.maxValue = Math.max(...this.userpuchases);
    this.chart?.update();
  }

}
