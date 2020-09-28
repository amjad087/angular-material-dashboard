import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  showFiller = false;
  sidenavWidth = 18;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  toggleNavWidth() {
    this.sidenavWidth = this.sidenavWidth === 4 ? this.sidenavWidth = 18.5 : this.sidenavWidth = 4;
  }

  onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(ContactDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

}
