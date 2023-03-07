import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData, private userService: UserService) {
  }

  users: User[] = [];
  _users: User[] = [];


  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  getUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res.data.users
      this._users = this.users.splice(0, 5)

    })
  }




  ngOnInit(): void {
    this.initCharts();
    this.getUsers()
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
