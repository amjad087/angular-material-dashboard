import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gender-dialog',
  templateUrl: './gender-dialog.component.html',
  styleUrls: ['./gender-dialog.component.css']
})
export class GenderDialogComponent implements OnInit {
  private readonly matDialogRef: MatDialogRef<GenderDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  leftPos: number;
  panelOpenState = false;
  flitersChanged = new Subject<{filters: string[]}>();

  customCollapsedHeight = '30px';
  customExpandedHeight = '30px';

  constructor(
    matDialogRef: MatDialogRef<GenderDialogComponent>,
    @Inject (MAT_DIALOG_DATA) data: { trigger: ElementRef, leftPos }) {
    this.matDialogRef = matDialogRef;
    this.triggerElementRef = data.trigger;
    this.leftPos = data.leftPos;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${this.leftPos}px`, top: `${rect.bottom - 50}px` };
    matDialogConfig.width = '450px';
    matDialogConfig.height = 'auto';
    this.matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.matDialogRef.updatePosition(matDialogConfig.position);
  }

  cancel(): void {
    this.matDialogRef.close(null);
  }

  applyFilters() {
    const filters: string[] = [];
    this.flitersChanged.next({filters});

    this.matDialogRef.close();
  }

}
