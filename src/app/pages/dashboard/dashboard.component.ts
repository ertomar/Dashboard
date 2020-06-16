import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { StatisticsService } from "app/services/statistics.service";

interface Array<T> {
  fill(value: T): Array<T>;
}
@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public chartLines;

  public data = {
    usersCount: Array<number>(12).fill(0),
    driversCount: Array<number>(12).fill(0),
    tripsCount: Array<number>(12).fill(0),
    revenueCount: Array<number>(12).fill(0),
    governsCount: Array<number>(5).fill(0),
    governsNames: Array<number>(5).fill(0),
    capacity: 0,
    errorsNumber: 0,
    totalRevenue: 0,
    index: 0,
    serverUpdates: 0,
  };

  constructor(private _StatisticsService: StatisticsService) {
    this.getStatistics();
  }

  refreshCharts() {
    this.chartHours.update();
    this.chartEmail.update();
    this.chartLines.update();
  }

  getStatistics() {
    this._StatisticsService.getStatistics().subscribe((statistics) => {
      console.log(statistics);
      statistics.usersActivity.usersNumber.forEach((element) => {
        this.data.usersCount[element.month - 1] = element.count;
      });
      statistics.usersActivity.driversNumber.forEach((element) => {
        this.data.driversCount[element.month - 1] = element.count;
      });
      statistics.usersActivity.tripsNumber.forEach((element) => {
        this.data.tripsCount[element.month - 1] = element.count;
      });
      this.data.capacity = statistics.capacity;
      //number of server errors
      this.data.errorsNumber = statistics.errorsNumber;
      this.data.serverUpdates = statistics.updatesNumber;
      this.data.totalRevenue = 0;
      statistics.revenue.forEach((element) => {
        //revenue statistics for all app
        this.data.revenueCount[element.month - 1] = element.revenue;
        // total revenue of app
        this.data.totalRevenue = this.data.totalRevenue + element.revenue;
        this.data.totalRevenue = Math.round(this.data.totalRevenue);
      });

      //number of users in every governs
      statistics.usersGoverns.forEach((element) => {
        this.data.governsCount[this.data.index] = element.count;
        this.data.index = this.data.index + 1;
      });

      //names of governs
      this.data.index = 0;
      statistics.usersGoverns.forEach((element) => {
        this.data.governsNames[this.data.index] = element.govern;
        this.data.index = this.data.index + 1;
      });

      this.refreshCharts();
    });
  }

  ngOnInit() {
    //this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");
    this.chartHours = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Passengers",
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.data.usersCount,
          },
          {
            label: "Drivers",
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.data.driversCount,
          },
          {
            label: "Trips",
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.data.tripsCount,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f",
              },
            },
          ],
        },
      },
    });
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              "#4acccd",
              "#fcc468",
              "#f1678b",
              "#ef80ff",
              "#fd9d78",
              "#7ffe8b",
            ],
            borderWidth: 0,
            data: this.data.governsCount,
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });

    let speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: this.data.revenueCount,
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    // let dataSecond = {
    //   data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
    //   fill: false,
    //   borderColor: "#51CACF",
    //   backgroundColor: "transparent",
    //   pointBorderColor: "#51CACF",
    //   pointRadius: 4,
    //   pointHoverRadius: 4,
    //   pointBorderWidth: 8,
    // };

    let speedData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [dataFirst],
    };

    let chartOptions = {
      legend: {
        display: false,
        position: "top",
      },
    };

    this.chartLines = new Chart(speedCanvas, {
      type: "line",
      hover: false,
      data: speedData,
      options: chartOptions,
    });
  }
}
