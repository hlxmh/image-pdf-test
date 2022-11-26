import { Component, ViewChildren, OnInit } from "@angular/core";
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";
import { jsPDF } from 'jspdf';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "image-pdf-test";
  public imgs: string[];

  @ViewChildren('highlight') highlights: any;

  public constructor(
    private captureService: NgxCaptureService,
    public httpClient: HttpClient) { this.imgs = []; }

  private f(): void {
    this.captureService
      .getImage(document.body, true)
      .pipe(
        tap(img => {
          this.imgs.push(img);
          console.log(img);
        })
      )
      .subscribe();
  }

  // client-side w/ jsPDF
  // public makePDF() {
  //   let pdf = new jsPDF();
  //   let x = 0;
  //   let y = 0;
  //   for (const img of this.imgs) {
  //     var img_ = new Image();
  //     img_.src = img;
  //     pdf.addImage(img, "PNG",x,y,img_.naturalWidth/3,img_.naturalHeight/3);
  //     y+=img_.naturalHeight/3;
  //   }
  //   pdf.output("datauri");
  // }

  public makePDF(): void{
    this.httpClient.put('http://localhost:8080/pdf', this.imgs, {responseType : 'blob'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            downloadLink.setAttribute('download', 'test.pdf');
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
}

  ngOnInit() {
    setTimeout(() => {
      for (const h of this.highlights) {
      this.captureService
        .getImage(h.nativeElement, true)
        .pipe(
          tap((img: string) => {
            this.imgs.push(img);
            console.log(img);
          })
        )
        .subscribe();
      }
    }, 100);
  }
}

