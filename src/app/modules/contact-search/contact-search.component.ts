import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { EmployeesCountDialogComponent } from './employees-count-dialog/employees-count-dialog.component';
import { BranchesCountDialogComponent } from './branches-count-dialog/branches-count-dialog.component';
import { PlantAndMachineryDialogComponent } from './plant-and-machinery-dialog/plant-and-machinery-dialog.component';
import { GenderDialogComponent } from './gender-dialog/gender-dialog.component';
import { BankingWithDialogComponent } from './banking-with-dialog/banking-with-dialog.component';
import { EntityTypeDialogComponent } from './entity-type-dialog/entity-type-dialog.component';
import { AgeOfFirmDialogComponent } from './age-of-firm-dialog/age-of-firm-dialog.component';

export interface Companies {
  contact: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  imageUrl: string;
}

const SEARCH_DATA: Companies[] = [
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
  {contact: 'Pat Hurm', name: 'Apple Ince', title: 'CEO', phone: '(812) 479-5447', email: 'test@email.com', imageUrl: 'https://cnet3.cbsistatic.com/img/il6jwdZY19bL9QEDR5x6zNjd55Y=/0x404:828x1603/940x0/2020/05/18/ef3e4846-00d1-4b6b-8647-d876b73b6b3e/fb-avatar.jpg'},
];

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit, OnDestroy {
  showFiller = false;
  sidenavWidth = 18;

  displayedColumns: string[] = ['imageUrl', 'contact', 'name', 'title', 'phone', 'email'];
  dataSource = [];

  industrySub: Subscription;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  showSearcData = false;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

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
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Location Dialog
  onShowLocDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(LocationDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // AgeOfFirmDialog
  onShowAgeOfFirmDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(AgeOfFirmDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

   // Entity Type Dialog
   onShowEntityTypeDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(EntityTypeDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Gender Dialog
  onShowGendereDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(GenderDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Plant and Machinery Dialog
  onShowPlanAndMachineryDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(PlantAndMachineryDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Branches Count Dialog
  onShowBranchesCountDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(BranchesCountDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Employees Count Dialog
  onShowEmployeesCountDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(EmployeesCountDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  // Banking with Dialog
  onShowBankingWithDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    let rightPos = (target.nativeElement as HTMLElement).getBoundingClientRect().right;
    if (this.sidenavWidth === 4) {
      rightPos += 7;
    } else {
      rightPos += 17;
    }
    const dialogRef = this.dialog.open(BankingWithDialogComponent, {

      data: { trigger: target, leftPos: rightPos },
      backdropClass: 'backdropBackground',
      maxHeight: '80vh',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
    this.industrySub = dialogRef.componentInstance.flitersChanged.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any) {
    this.showSearcData = true;
    this.dataSource = SEARCH_DATA;
  }

  ngOnDestroy() {
    if (this.industrySub) {
      this.industrySub.unsubscribe();
    }
  }

}


// export interface GithubApi {
//   items: GithubIssue[];
//   total_count: number;
// }

// export interface GithubIssue {
//   created_at: string;
//   number: string;
//   state: string;
//   title: string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDatabase {
//   constructor(private _httpClient: HttpClient) {}

//   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
//     const href = 'https://api.github.com/search/issues';
//     const requestUrl =
//         `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

//     return this._httpClient.get<GithubApi>(requestUrl);
//   }
// }
