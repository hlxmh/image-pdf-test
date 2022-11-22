import { Component, ViewChildren, OnInit } from "@angular/core";
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "image pdf test";
  public imgs: string[];

  @ViewChildren('highlight') highlights: any;

  public constructor(private captureService: NgxCaptureService) { this.imgs = []; }

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

  public makePDF() {
    let pdf = new jsPDF();
    let x = 0;
    let y = 0;
    for (const img of this.imgs) {
      var img_ = new Image();
      img_.src = img;
      pdf.addImage(img, "PNG",x,y,img_.naturalWidth/3,img_.naturalHeight/3);
      y+=img_.naturalHeight/3;
    }
    pdf.output("datauri");
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

