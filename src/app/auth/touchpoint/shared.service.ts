import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class AppState {
   public formData;
   public formDatasource = new Subject();
   formdata$ = this.formDatasource.asObservable();

  setData(value){
     //console.log("set data",value);
     this.formDatasource.next(value);
     //console.log(this.formdata$);
    //this.formData = value;

  }

}
