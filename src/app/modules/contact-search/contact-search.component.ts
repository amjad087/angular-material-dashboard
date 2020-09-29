import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  email: string;
}

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
// const SEARCH_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', email: 'test@email.com'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', email: 'test@email.com'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', email: 'test@email.com'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', email: 'test@email.com'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', email: 'test@email.com'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', email: 'test@email.com'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', email: 'test@email.com'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', email: 'test@email.com'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', email: 'test@email.com'},
// ];

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit, OnDestroy {
  showFiller = false;
  sidenavWidth = 18;

  displayedColumns: string[] = ['contact', 'imageUrl', 'name', 'title', 'phone', 'email'];
  dataSource = [];

  industrySub: Subscription;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  showSearcData = false;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public dialog: MatDialog, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.resultsLength = data.total_count;

  //         return data.items;
  //       }),
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //     ).subscribe(data => this.data = data);
  // }

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
    })
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
