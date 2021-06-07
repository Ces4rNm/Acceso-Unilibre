import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(date: any, type: number): any {
    switch (type) {
      case 1:
        // (Date from database to application):string
        try {
          date = new Date(date);
          return date.toLocaleString([], { hour12: true });
        } catch (error) {
          console.log('FormatDatePipe:1', error);
          return date = '';
        }
      case 2:
        // ((Date from database + 6h) >= current Date):boolean
        try {
          let current = new Date();
          date = new Date(date);
          date.setHours(date.getHours() + 6);
          console.log('(', current.getTime(), date.getTime(), ')', (current.getTime() >= date.getTime()));
          return (current.getTime() >= date.getTime());
        } catch (error) {
          console.log('FormatDatePipe:2', error);
          return date = true;
        }
      default:
        return date
    }
  }
}
