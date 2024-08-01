import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pageSize!: number
  pageIndex!: number
  totalNumberOfItems!: number
  total_pages !: number

  constructor() { }



  assignPaginationData() {
    const paginationData = localStorage.getItem('pagination');

    if (paginationData) {
      let { total_pages, total, per_page, page } = JSON.parse(paginationData)[0]
      this.pageSize = per_page
      this.totalNumberOfItems = total
      this.pageIndex = page - 1
      this.total_pages = total_pages
    }
  }


  getPaginationDataFromLocalStorage() {
    let pagination = localStorage.getItem('pagination')
  }
}
