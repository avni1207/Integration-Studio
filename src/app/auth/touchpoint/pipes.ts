
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items)  return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
  for (let key in it )
  if((""+it[key]).toLowerCase().includes(searchText)){
      return true
  }
  for (let key in it.address )
  if((""+it.address[key]).toLowerCase().includes(searchText)){
      return true
  }
  for (let key in it.company )
  if((""+it.company[key]).toLowerCase().includes(searchText)){
      return true
  }
  return false;

    });
   }
}
