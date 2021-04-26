import { Component } from '@angular/core';
import {ItemServiceService} from './item-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adopisoft';
  item: any = {
    numberSale: 0,
    itemName:''
  }
  loading = true;
  items: any = [];
  public chartType1: string = 'bar';
  public chartType2: string = 'line';
  public chartType3: string = 'pie';

  public chartDatasets: Array<any> = [
    // { data: [65, 59, 80, 81, 56, 55], label: 'Number of Sales' }
    { data: [], label: 'Number of Sales' }
  ];

  // public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  public chartLabels: Array<any> = [];
  // public chartColors: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      // yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: Math.max(...this.datas) } }]
      // yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }]
    }
    // maintainAspectRatio: false
  };
  

  constructor(
    public service: ItemServiceService
    ){
      this.items =[]
      this.chartLabels = [];
      this.chartDatasets[0].data = []
      this.service.getItem().subscribe((data: any) => {
        console.log(data);
        this.item.numberSale = 0;
        this.item.itemName = '';
        console.log(data);
        this.items = data.data;
        let count = 1;
        if(data.data.length > 0){
          this.items.forEach(item => {
            var x = item.sales;
            var y: number = +x;
            this.chartDatasets[0].data.push(y)
            this.chartLabels.push(item.name)
            if(count === data.data.length){
              this.loading= false;
              this.chartOptions.yAxes[0].ticks.max = Math.max(...this.chartDatasets[0].data)
              console.log(this.chartDatasets, 'datasets');
              console.log(this.chartLabels, 'chart labels')
            }
            console.log(count, data.data.length)
            count++;
          });
        }else{
          this.loading= false;
          alert('no data;')
        }
        })
  }
  
  addItem(): void{
    if(this.item.numberSale != 0 && this.item.itemName != ''){
      this.items =[]
      this.chartLabels = [];
      this.chartDatasets[0].data = []
      this.service.addItem(this.item).subscribe((data: any) => {
        alert('Added!');
        // console.log(data.data, data.data.length)
        this.item.numberSale = 0;
        this.item.itemName = '';
        console.log(data);
        this.items = data.data;
        let count = 1;
        if(data.data.length > 0){
          this.items.forEach(item => {
            this.chartDatasets[0].data.push(item.sales)
            this.chartLabels.push(item.name)
            if(count === data.data.length){
              this.loading= false;
              // this.chartOptions.yAxes[0].ticks.max = Math.max(...this.chartDatasets[0].data)
              console.log(this.chartDatasets, 'datasets');
              console.log(this.chartLabels, 'chart labels')
            }
            count++;
          });
        }else{
          this.loading= false;
          alert('no data;')
        }
     
      })
    }else{
      alert('All fields are required!');
    }
  }
  cancelAddItem(): void{
    this.item.numberSale = 0;
    this.item.itemName = '';
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
