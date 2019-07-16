import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-reportview',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})
export class ReportviewComponent implements OnInit {
  dialogRef;
  month = [];
  price = [];
  chart: any;
  constructor(public dialogviewRef: MatDialogRef<ReportviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: Http, public dialog: MatDialog) { }

  ngOnInit() {

    const res = this.data.graphdata;
    // let count=0;
    // let graphdatas = [];
    // for(let i=0;i<=10;i++){
    //   count = count+20
    //   if(this.data.graphdata[i]){
    //     graphdatas.push({result:this.data.graphdata[i].result,normalResult:count});
    //   } else{
    //     graphdatas.push({normalResult:count+20})
    //   }
    // }
    // const res = [
    //   {
    //     "month": "Jan",
    //     "price": "180"
    //   },
    //   {
    //     "month": "Feb",
    //     "price": "200"
    //   },
    //   {
    //     "month": "March",
    //     "price": "210"
    //   },
    //   {
    //     "month": "April",
    //     "price": "190"
    //   },
    //   {
    //     "month": "May",
    //     "price": "1000"
    //   },
    //   {
    //     "month": "June",
    //     "price": "230"
    //   },
    //   {
    //     "month": "July",
    //     "price": "260"
    //   },
    //   {
    //     "month": "Aug",
    //     "price": "210"
    //   },
    //   {
    //     "month": "Sept",
    //     "price": "300"
    //   }]
    res.forEach(y => {
      this.month.push(y.normalResult);
      this.price.push(y.result);
      //});
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            // yAxes: [{
            //   display: true
            // }],
          }
        }
      });
    });

  }

  // reportviewpopupclose(): void {
  //   this.dialogviewRef.close();
  // }


  // graphicalview(): void {
  //   this.dialogviewRef.close();
  //   this.dialogRef = this.dialog.open(ReportgraphicalviewComponent, {
  //     data: {
  //       width: '600px',
  //     },
  //     disableClose: true
  //   })
  // }


}
