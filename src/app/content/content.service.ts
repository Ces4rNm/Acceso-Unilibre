import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  title: string = '';
  showHeader: boolean = true;

  constructor() { }
}
