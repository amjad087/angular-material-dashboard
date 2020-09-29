import { Component, ElementRef, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Options } from 'ng5-slider';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-branches-count-dialog',
  templateUrl: './branches-count-dialog.component.html',
  styleUrls: ['./branches-count-dialog.component.css']
})
export class BranchesCountDialogComponent implements OnInit {
  private readonly matDialogRef: MatDialogRef<BranchesCountDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  leftPos: number;
  panelOpenState = false;
  flitersChanged = new Subject<{filters: string[]}>();

  customCollapsedHeight = '30px';
  customExpandedHeight = '30px';

  value = 1981;
  highValue = 2020;
  options: Options = {
    hidePointerLabels: true,
    hideLimitLabels: true,
    floor: 1981,
    ceil: 2020
  };
  slidersRefresh: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    matDialogRef: MatDialogRef<BranchesCountDialogComponent>,
    @Inject (MAT_DIALOG_DATA) data: { trigger: ElementRef, leftPos }) {
    this.matDialogRef = matDialogRef;
    this.triggerElementRef = data.trigger;
    this.leftPos = data.leftPos;
    this.matDialogRef.afterOpened().subscribe(() => {
      this.slidersRefresh.emit();
    });
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${this.leftPos}px`, top: `${rect.bottom - 50}px` };
    matDialogConfig.width = '450px';
    matDialogConfig.height = 'auto';
    this.matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.matDialogRef.updatePosition(matDialogConfig.position);
    this.matDialogRef.afterOpened().subscribe(() => {
      this.slidersRefresh.emit();
    });
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
