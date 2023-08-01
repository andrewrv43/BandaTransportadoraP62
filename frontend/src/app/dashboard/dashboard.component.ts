import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ImpresionService } from '../impresion.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsersService } from '../users.service';
import { fonts } from 'pdfmake/build/pdfmake';
(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;
  private chart: Chart | null = null;
  @ViewChild('pastelChartCanvas') pastelChartCanvas!: ElementRef;
  private pieChart: Chart | null = null;



  constructor(private impr: ImpresionService,private loginService:LoginService,private rutas:Router,private userservice:UsersService) {
    
  
  }
  n:boolean=false;
  ngOnInit(): void {

         
    this.loginService.currentUserLoginOn.subscribe(b=>{
      {
       this.n=b;
      }
    })
if(!this.n){
  this.rutas.navigateByUrl('/Login');
  alert("ANTES DE CONTINUAR DEBE INICIAR SESION");
}


    setInterval(() => {
      this.updateCharts();
    }, 2000);
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.createPastel();
  }
  updateCharts() {
    this.createBarChart();
    this.createPastel();
  }
  createBarChart() {
    this.impr.obtenerDash().subscribe((data: any) => {
      let r = 0;
      let g = 0;
      let b = 0;
console.log(data);
      for (const item of data) {
        if (item.color === 'ROJO') {
          r = r + 1;
        } else if (item.color === 'VERDE') {
          g = g + 1;
        } else if (item.color === 'AZUL') {
          b = b + 1;
        }
      }

      const canvas = this.barChartCanvas.nativeElement;
      if (!canvas) {
        console.error('Canvas element not found.');
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for canvas.');
        return;
      }
console.log(r);
      const dato = {
        labels: ['ROJO', 'VERDE', 'AZUL'],
        datasets: [
          {
            label: 'COLORES REGISTRADOS',
            backgroundColor: [
              'rgba(255, 0, 0, 1)',
              'rgba(60, 179, 113, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderColor: 'rgba(1, 1, 1, 1)',
            borderWidth: 1,
            data: [r, g, b],
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 0
        }
      };

      
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: dato,
        options: options,
      });
    });
  }

  createPastel() {
    this.impr.obtenerFechas().subscribe((data: any) => {
      const ultimos = data.slice(-3);
      const miArreglo: string[] = [];
      let n3: string = '';
      let n2: string = '';
      let n1: string = '';
      ultimos.forEach((item: any) => {
        miArreglo.push(item.color);
      });
      for (let i = 0; i < 3; i++) {
        if (miArreglo[i] === 'azul' && i === 0) {
          n3 = 'rgb(0,0,1)';
        } else if (miArreglo[i] === 'verde' && i === 0) {
          n3 = 'rgb(0,1,0)';
        } else if (miArreglo[i] === 'rojo' && i === 0) {
          n3 = 'rgb(1,0,0)';
        }

        if (miArreglo[i] === 'azul' && i === 1) {
          n2 = 'rgb(0,0,1)';
        } else if (miArreglo[i] === 'verde' && i === 1) {
          n2 = 'rgb(0,1,0)';
        } else if (miArreglo[i] === 'rojo' && i === 1) {
          n2 = 'rgb(1,0,0)';
        }

        if (miArreglo[i] === 'azul' && i === 2) {
          n1 = 'rgb(0,0,1)';
        } else if (miArreglo[i] === 'verde' && i === 2) {
          n1 = 'rgb(0,1,0)';
        } else if (miArreglo[i] === 'rojo' && i === 2) {
          n1 = 'rgb(1,0,0)';
        }
      }

      const canvas = this.pastelChartCanvas.nativeElement;
      if (!canvas) {
        console.error('Canvas element not found.');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for canvas.');
        return;
      }
      console.log(n3);
      const datas = {
        labels: [miArreglo[0], miArreglo[1], miArreglo[2]],
        datasets: [
          {
            label: 'ULTIMO INGRESADO',
            data: [3, 2, 1],
            borderColor: 'rgb(75, 192, 192)',
            hoverOffset: 4,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0 
        }
      };

      if (this.pieChart) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart(ctx, {
        type: 'line',
        data: datas,
        options: options as any,
      });
    });
  }

  
  exportToPdf() {
    this.impr.obtTodo().subscribe(data => {
      const pdfDefinition = {
        content: [
          { text: 'Todos los datos registrados:', style: 'header' },
          { text: JSON.stringify(data) }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true
          }
        }
      };

      pdfMake.createPdf(pdfDefinition).download('datos_de_color.pdf');
    });
  }

}
