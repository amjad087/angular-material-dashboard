import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import { Subject } from 'rxjs';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {
  private readonly matDialogRef: MatDialogRef<LocationDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  leftPos: number;
  panelOpenState = false;
  flitersChanged = new Subject<{filters: string[]}>();

  customCollapsedHeight = '30px';
  customExpandedHeight = '30px';

  locationMessage = 'You\'re currently filtering by company location. To filter by contact location, please toggle right.';
  locationType = 'By Company Location';
  constructor(matDialogRef: MatDialogRef<LocationDialogComponent>,
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

  toggleLocation(event) {

    if (event.checked) {
      this.locationMessage = 'You\'re currently filtering by contact location. To filter by company location, please toggle left.';
      this.locationType = 'By Contact Location';
    } else {
      this.locationMessage = 'You\'re currently filtering by company location. To filter by contact location, please toggle right.';
      this.locationType = 'By Company Location';
    }
  }

}
