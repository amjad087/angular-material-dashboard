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
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {
  private readonly matDialogRef: MatDialogRef<ContactDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  leftPos: number;
  panelOpenState = false;
  flitersChanged = new Subject<{filters: string[]}>();

  agricultureTask: Task = {
    name: 'Agriculture',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Production Crops', completed: false, color: 'primary'},
      {name: 'Production Livestock', completed: false, color: 'accent'},
      {name: 'Services', completed: false, color: 'warn'},
      {name: 'Forestry', completed: false, color: 'warn'},
      {name: 'Fishing, Hunting & Trapping', completed: false, color: 'warn'},
    ]
  };

  miningTask: Task = {
    name: 'Mining',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Finance, Insurance, Real State', completed: false, color: 'primary'},
      {name: 'Services', completed: false, color: 'warn'},
      {name: 'Public Administration', completed: false, color: 'warn'},
      {name: 'Nonclassifiable Establishments', completed: false, color: 'warn'},
    ]
  };

  constructionTask: Task = {
    name: 'Construction',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Building, General, & Operative Builders', completed: false, color: 'primary'},
      {name: 'Heavy Other Than Building Contractors', completed: false, color: 'warn'},
      {name: 'Special Trade Contractors', completed: false, color: 'warn'}
    ]
  };

  manufacturingTask: Task = {
    name: 'Manufacturing',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Food & Kindred Products', completed: false, color: 'primary'},
      {name: 'Tobacco Products', completed: false, color: 'warn'},
      {name: 'Textile Mill Products', completed: false, color: 'warn'},
      {name: 'Apparel & Other Finished Products', completed: false, color: 'warn'},
      {name: 'Lumber & Wood Products, Except Furniture', completed: false, color: 'warn'},
      {name: 'Furniture & Fixtures', completed: false, color: 'warn'},
      {name: 'Paper & Allied Products', completed: false, color: 'warn'},
      {name: 'Printing, Publishing & Allied Industries', completed: false, color: 'warn'},
      {name: 'Chemicals & Allied Products', completed: false, color: 'warn'},
      {name: 'Petroleum Refining & Related Industries', completed: false, color: 'warn'},
      {name: 'Rubber & Miscellaneous Plastics Products', completed: false, color: 'warn'},
      {name: 'Leather & Leather Products', completed: false, color: 'warn'},
      {name: 'Primary Metal Industries', completed: false, color: 'warn'},
      {name: 'Transportation Equipment', completed: false, color: 'warn'},
      {name: 'Miscellaneous Manufacturing Industries', completed: false, color: 'warn'}
    ]
  };

  transportationTask: Task = {
    name: 'Transportation',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Railroad Transportation', completed: false, color: 'primary'},
      {name: 'Local & Suburban Transit & Interurban Highway Passenger Transportation', completed: false, color: 'warn'},
      {name: 'Motor Freight Transportation & Warehousing', completed: false, color: 'warn'},
      {name: 'United States Postal Service', completed: false, color: 'warn'},
      {name: 'Water Transportation', completed: false, color: 'warn'},
      {name: 'Transportation By Air', completed: false, color: 'warn'},
      {name: 'Pipelines, Except Natural Gas', completed: false, color: 'warn'},
      {name: 'Transportation Services', completed: false, color: 'warn'},
      {name: 'Communications', completed: false, color: 'warn'},
      {name: 'Electric, Gas & Sanitary Services', completed: false, color: 'warn'}
    ]
  };

  wholesaleTask: Task = {
    name: 'Wholesale',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Wholesale Trade-durable Goods', completed: false, color: 'primary'},
      {name: 'Wholesale Trade-non-durable Goods', completed: false, color: 'warn'}
    ]
  };

  retailTask: Task = {
    name: 'Retail',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Building Materials, Hardware, Garden Supply & Mobile Home Dealers', completed: false, color: 'primary'},
      {name: 'General Merchandise Stores', completed: false, color: 'warn'},
      {name: 'Food Stores', completed: false, color: 'warn'},
      {name: 'Automotive Dealers & Gasoline Service Stations', completed: false, color: 'warn'},
      {name: 'Apparel & Accessory Stores', completed: false, color: 'warn'},
      {name: 'Home Furniture, Furnishings & Equipment Stores', completed: false, color: 'warn'},
      {name: 'Eating & Drinking Places', completed: false, color: 'warn'},
      {name: 'Miscellaneous Retail', completed: false, color: 'warn'}
    ]
  };

  allAgricultureComplete = false;
  allMiningComplete = false;
  allConstructionComplete = false;
  allManufacturingComplete = false;
  allTransportationComplete = false;
  allWholesaleComplete = false;
  allRetailComplete = false;

  customCollapsedHeight = '30px';
  customExpandedHeight = '30px';

  constructor(matDialogRef: MatDialogRef<ContactDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, leftPos }) {
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

  // ------------------------------------
  // Agriculture Tasks
  updateAllAgricultureComplete() {
    this.allAgricultureComplete = this.agricultureTask.subtasks != null && this.agricultureTask.subtasks.every(t => t.completed);
  }

  someAgricultureComplete(): boolean {
    if (this.agricultureTask.subtasks == null) {
      return false;
    }
    return this.agricultureTask.subtasks.filter(t => t.completed).length > 0 && !this.allAgricultureComplete;
  }

  setAgricultureAll(completed: boolean) {
    this.allAgricultureComplete = completed;
    if (this.agricultureTask.subtasks == null) {
      return;
    }
    this.agricultureTask.subtasks.forEach(t => t.completed = completed);
  }

  // ------------------------------------
  // Mining Tasks
  updateAllMiningComplete() {
    this.allMiningComplete = this.miningTask.subtasks != null && this.miningTask.subtasks.every(t => t.completed);
  }

  someMiningComplete(): boolean {
    if (this.miningTask.subtasks == null) {
      return false;
    }
    return this.miningTask.subtasks.filter(t => t.completed).length > 0 && !this.allMiningComplete;
  }

  setMiningAll(completed: boolean) {
    this.allMiningComplete = completed;
    if (this.miningTask.subtasks == null) {
      return;
    }
    this.miningTask.subtasks.forEach(t => t.completed = completed);
  }

  // ------------------------------------
  // Construction Tasks
  updateAllConstructionComplete() {
    this.allConstructionComplete = this.constructionTask.subtasks != null && this.constructionTask.subtasks.every(t => t.completed);
  }

  someConstructionComplete(): boolean {
    if (this.constructionTask.subtasks == null) {
      return false;
    }
    return this.constructionTask.subtasks.filter(t => t.completed).length > 0 && !this.allConstructionComplete;
  }

  setConstructionAll(completed: boolean) {
    this.allConstructionComplete = completed;
    if (this.constructionTask.subtasks == null) {
      return;
    }
    this.constructionTask.subtasks.forEach(t => t.completed = completed);
  }

  // ------------------------------------
  // Manufacturing Tasks
  updateAllManufacturingComplete() {
    this.allManufacturingComplete = this.manufacturingTask.subtasks != null && this.manufacturingTask.subtasks.every(t => t.completed);
  }

  someManufacturingComplete(): boolean {
    if (this.manufacturingTask.subtasks == null) {
      return false;
    }
    return this.manufacturingTask.subtasks.filter(t => t.completed).length > 0 && !this.allManufacturingComplete;
  }

  setManufacturingAll(completed: boolean) {
    this.allManufacturingComplete = completed;
    if (this.manufacturingTask.subtasks == null) {
      return;
    }
    this.manufacturingTask.subtasks.forEach(t => t.completed = completed);
  }
  // ------------------------------------
  // Transportation Tasks
  updateAllTransportationComplete() {
    this.allTransportationComplete = this.transportationTask.subtasks != null && this.transportationTask.subtasks.every(t => t.completed);
  }

  someTransportationComplete(): boolean {
    if (this.transportationTask.subtasks == null) {
      return false;
    }
    return this.transportationTask.subtasks.filter(t => t.completed).length > 0 && !this.allTransportationComplete;
  }

  setTransportationAll(completed: boolean) {
    this.allTransportationComplete = completed;
    if (this.transportationTask.subtasks == null) {
      return;
    }
    this.transportationTask.subtasks.forEach(t => t.completed = completed);
  }
  // ------------------------------------
  // Wholesale Tasks
  updateAllWholesaleComplete() {
    this.allWholesaleComplete = this.wholesaleTask.subtasks != null && this.wholesaleTask.subtasks.every(t => t.completed);
  }

  someWholesaleComplete(): boolean {
    if (this.wholesaleTask.subtasks == null) {
      return false;
    }
    return this.wholesaleTask.subtasks.filter(t => t.completed).length > 0 && !this.allWholesaleComplete;
  }

  setWholesaleAll(completed: boolean) {
    this.allWholesaleComplete = completed;
    if (this.wholesaleTask.subtasks == null) {
      return;
    }
    this.wholesaleTask.subtasks.forEach(t => t.completed = completed);
  }
  // ------------------------------------
  // Retail Tasks
  updateAllRetailComplete() {
    this.allRetailComplete = this.retailTask.subtasks != null && this.retailTask.subtasks.every(t => t.completed);
  }

  someRetailComplete(): boolean {
    if (this.retailTask.subtasks == null) {
      return false;
    }
    return this.retailTask.subtasks.filter(t => t.completed).length > 0 && !this.allRetailComplete;
  }

  setRetailAll(completed: boolean) {
    this.allRetailComplete = completed;
    if (this.retailTask.subtasks == null) {
      return;
    }
    this.retailTask.subtasks.forEach(t => t.completed = completed);
  }

  applyFilters() {
    const filters: string[] = [];
    this.flitersChanged.next({filters});

    this.matDialogRef.close();
  }

}
