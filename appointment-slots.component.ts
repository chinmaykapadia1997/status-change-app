import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-appointment-slots',
  templateUrl: './appointment-slots.component.html',
  styleUrls: ['./appointment-slots.component.css'],
})
export class AppointmentSlotsComponent implements OnInit {

  form: FormGroup;
  @Input() slotTimeArray: any = []; // time array
  @Input() selectedDay: string;
  idField = 1;
  //slotEndTimeArray: any = [];
  slot: any = [];

  selectedOptionIndex;
  selectedStartTime;
  selectedEndTime;
  enableAddButton: boolean;

  valueChange: any;

  slotArray = [];
  currentDay: string;
  enableAppointments: boolean;
  enableAddBetweenAppt: boolean;

  index: any;
  //removeElementCnt: number = 0;
  //removedIndexValue: number[] = [];
  //removedId: any = [];
  //removedData: any = [];

  prevIndEnd;
  nextIndStart;
  addBtnIndex: number;

  cntDeleted: boolean = true;

  constructor(private fb: FormBuilder, private service: CommonServiceService) {}

  ngOnInit() {
    this.enableAppointments = false;
    //this.enableAddBetweenAppt = false;
    // this.service.day$.subscribe((data) => {
    //   this.currentDay = data;
    //   console.log(data.day);
    // });
    this.enableAddButton = true;

    this.form = this.fb.group({
      controlsArray: this.fb.array([this.getFormGroup()]),
    });

    // this.slotTimeArray = this.service.slotTimeArray;
    this.valueChange = this.form.valueChanges.subscribe((val) => {
      console.log(val);
    });
    console.log('Changed Value:-', this.valueChange);

    //this.slotEndTimeArray = this.slotTimeArray;
  }

  private getFormGroup() {
    return this.fb.group({
      start: [''],
      end: [''],
      id: [],
      isDeleted: ["false"],
    });
  }

  public get getFormArray(): FormArray {
    return this.form.get('controlsArray') as FormArray;
  }

  onSelectTime($event, i: number) {
    let indexAfterAdd;
   
    this.selectedStartTime = $event.target.value;
    console.log('Selected Start Time:-', this.selectedStartTime);

    indexAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime) + 30;
    console.log(indexAfterAdd);

    //this.selectedEndTime = this.slotTimeArray[indexAfterAdd];

    //this.slotArray.splice(i,1);      //It will allow to set the select/change value of last slot
    console.log(this.form.get('controlsArray').value);

    // this.prevIndEnd = selectPrevEndInd;
    // console.log(this.nextIndStart, "and", this.prevIndEnd);

    // if(this.nextIndStart - this.prevIndEnd > 60){
    //   setTimeout(() => {
    //     this.slotArray[i] = { start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd], isDeleted: "false" };
    //     this.getFormArray.at(i).patchValue(this.slotArray[i]);
    //   }, 200);
    // }
    // else{
      if(this.cntDeleted == true){

        this.slotArray.push({ start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd], id: this.idField++, isDeleted: "false" });
        this.getFormArray.patchValue(this.slotArray);
      }
      else{
        this.prevIndEnd = this.slotTimeArray.indexOf(this.selectedStartTime) + 30;
        console.log("Slot Value:-",this.slot.value);
        
        let startT = this.slot.value[i+2].start;
        this.nextIndStart = this.slotTimeArray.indexOf(startT);
        this.slotArray[i] = { start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd], id: i+1, isDeleted: "false" };
        setTimeout(() => {
          if( this.nextIndStart - this.prevIndEnd < 60 ) {
            console.log("prev and next:-- ", this.prevIndEnd, "and", this.nextIndStart, i, startT);
            this.slot.removeAt(i+1);
            //console.log("Next Index:====", i+1);
            console.log("Slot Value:-",this.slot.value);
          }
        }, 200);
        this.getFormArray.at(i).patchValue({ start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd], isDeleted: "false" });
      }
    //}

    //this.slotArray.splice(i,0,{start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd]});       //It will allow to set the select/change value of last slot
    //this.getFormArray.at(i).patchValue({ start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd], isDeleted: "true" });
    //this.getFormArray.patchValue(this.slotArray);
    console.log(this.slotArray);
    console.log('ahlfhas:', this.getFormArray);

    this.enableAddButton = true;
  }

  addItem(action: string, ind) {
    
    if(action == "add"){

      let formObject = this.form.value;
      // console.log(formObject);
      // let formObjectIndex
      let indexOfStartTimeAfterAdd: number; //storing selected start time index
      //let indexAfterAdd;
  
      this.slot = <FormArray>this.form.controls['controlsArray'];
  
      this.slot.push(this.getFormGroup());
      console.log(this.slot);
      console.log(this.selectedStartTime);
  
      this.selectedStartTime =
        this.slotTimeArray[
          this.slotTimeArray.indexOf(this.selectedStartTime) + 45
        ]; //Setting start time.
  
      indexOfStartTimeAfterAdd = this.slotTimeArray.indexOf(
        this.selectedStartTime
      ); //storing selected start time index.
      console.log(indexOfStartTimeAfterAdd);
      console.log(this.slotTimeArray[indexOfStartTimeAfterAdd]);
      //this.idField++;
  
      //pushing into array and then patching it to control:---
      //this.slotArray.sort((a,b)=>a.start.localeCompare(b.start));
      this.slotArray.push({
        start: this.slotTimeArray[indexOfStartTimeAfterAdd],
        end: this.slotTimeArray[indexOfStartTimeAfterAdd + 30],
        id: this.idField++,
        isDeleted: "false",
      });
      setTimeout(() => {
        this.getFormArray.patchValue(this.slotArray);
      }, 200);
  
      // this.idField+=1;
      console.log('Form Array Value:---', this.form.get('controlsArray'));
      console.log(this.slotArray);
      console.log('Form:', this.form);
    }

    else
    {
        let indx = ind;
      console.log(indx);

      this.addBtnIndex = ind;
      //console.log("id:-",this.removedData[indx].id);

      let indexPrevStart: number;
      let indexPrevEnd: number;
      let indexNextStart: number;
      let indexNextEnd: number;

      //ind = this.index;

      console.log(this.index);

      indexPrevStart = this.slotTimeArray.indexOf(this.slotArray[indx - 1].start); //Gives index of previous slot/record's end time.

      indexPrevEnd = this.slotTimeArray.indexOf(this.slotArray[indx - 1].end); //Gives index of previous slot/record's end time.
      console.log('Prev Data End Index:--', indexPrevEnd);

      indexNextStart = this.slotTimeArray.indexOf(this.slotArray[indx + 1].start); //Gives index of next slot/record's start time.
      console.log('Next Data Start Index:--', indexNextStart);

      indexNextEnd = this.slotTimeArray.indexOf(this.slotArray[indx + 1].end); //Gives index of next slot/record's end time.

      console.log('All Values:--',this.slotTimeArray[indexPrevEnd],this.slotTimeArray[indexNextStart],this.slotTimeArray[indexNextEnd]);

      console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextStart]));
      console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextEnd]));

      console.log(ind, this.index);

      this.nextIndStart = indexNextStart;  // Setting next start value for select after adding.
      this.prevIndEnd = indexPrevEnd;     // Setting previoud end value for select after adding.

      if (indexNextStart - indexPrevEnd == 60) {
      // if (indexNextStart - indexPrevEnd == 60) {
          this.slot.insert(indx, this.getFormGroup());
          console.log('Start:--',this.slotTimeArray[this.slotTimeArray.indexOf(indexNextStart)]);
          //this.slotArray.push({ start: this.slotTimeArray[indexPrevStart + 45], end: this.slotTimeArray[indexPrevEnd + 45], id: this.removedId[ind] });

          this.slotArray[indx] = { start: this.slotTimeArray[indexPrevStart + 45], end: this.slotTimeArray[indexPrevEnd + 45], id: this.slotArray[indx].id, isDeleted: "false" };
          this.slot.removeAt(indx+1);
            //this.slotArray.slice(indx, this.slotArray[indx]);
          //this.slotArray.splice(indx, 0, {start: this.slotTimeArray[indexPrevStart + 45],end: this.slotTimeArray[indexPrevEnd + 45], id: this.slotArray[indx].id, isDeleted: "false"});
          console.log(this.slotArray);
          console.log(this.getFormArray.at(indx));
          
          setTimeout(() => {
            //this.getFormArray.at(indx).patchValue({ start: this.slotArray[indx].start, end: this.slotArray[indx].end });
            //this.getFormArray.at(indx).patchValue({ start: this.slotTimeArray[indexPrevStart + 45], end: this.slotTimeArray[indexPrevEnd + 45], isDeleted: "false" });
            //this.getFormArray.patchValue(this.slotArray);
            this.getFormArray.at(indx).patchValue(this.slotArray[indx]);
          }, 200);

        console.log(this.slotArray[this.index]);
        console.log(this.index);
        //if((indexNextStart - indexPrevEnd) == 60){
        this.enableAddBetweenAppt = false;
        //}
      }
      else{
        this.slot.insert(indx,this.getFormGroup());
        this.slotArray[indx] = { start: this.slotTimeArray[indexPrevStart + 45], end: this.slotTimeArray[indexPrevEnd + 45], id: this.slotArray[indx].id, isDeleted: "false" };
        console.log("next:", this.slotTimeArray.indexOf(this.slot.value[indx+2].start), "prev:", this.slotTimeArray.indexOf(this.slotArray[indx].end));
        
        //this.slot.removeAt(indx+1);
        setTimeout(() => {
          this.getFormArray.at(indx).patchValue(this.slotArray[indx]);
          if((this.slotTimeArray.indexOf(this.slot.value[indx+2].start) - this.slotTimeArray.indexOf(this.slotArray[indx].end) < 60)){
            setTimeout(() => {
              this.slot.removeAt(indx+1);
            }, 200);
          }
        }, 200);

      }
      
      console.log(ind);
    }
  }

  removeItem(id, index) {

    let findIndex = this.slotArray.findIndex(x=>x.id == id);
    console.log(findIndex);
    

    let removdControlIndex = [];
    let indexNextStart: number;
    let indexNextEnd: number;
    console.log(this.slot[index]);

    this.index = index;

    console.log("removed index:-", index);
    
    //this.slot.removeAt(index); // Removes control from array.
    //this.removedIndexValue.push(index); // Array storing index of removed value.

    this.slotArray[findIndex].isDeleted = "true";
    this.slotArray[findIndex].start = "";
    this.slotArray[findIndex].end = "";
    console.log('this.slotArray', this.slotArray);

    this.getFormArray.at(index).patchValue({ start: "", end: "", isDeleted: "true" });

    this.slotArray.forEach(element=> {
      setTimeout(() => {
        if(element.isDeleted == "true"){
          console.log("ELEMENT:-",element);
          if(element.id == index ){
            setTimeout(() => {
              this.slot.removeAt(index);
            }, 200);
          }
        }
      }, 200);
    });

    this.slotArray.slice().reverse().forEach(val=>{ 
      setTimeout(() => {
        if(val.id == "true"){
          if(val.id == index-1){
            setTimeout(() => {
              this.slot.removeAt(index-1);
            }, 200);
          }
        }
      }, 200);
      console.log(val); 
    });

    //this.form.at(index).patchValue(this.slotArray);
    console.log('form', this.form);

    // this.removedId.push(this.slotArray[index].id); //Store removed values id.
    // this.removedData.push(this.slotArray[index]);

    //this.slotArray.splice(index, 1); // Remove value of that control from arrary.

    console.log("SlotArray:-", this.slotArray);
    console.log("SlotControlArray:-", this.slot);

    // this.prevIndEnd = this.slotTimeArray.indexOf(
    //   this.slotArray[this.index - 1].end
    // );
    // this.nextIndStart = this.slotTimeArray.indexOf(
    //   this.slotArray[this.index].start
    // );

    console.log('Prev AND Next:--', this.prevIndEnd, this.nextIndStart);
    this.cntDeleted = false;
    // let removed;
    // removed.push({start:this.slotArray[index].start,end:this.slotArray[index].end});
    // console.log("Removed",removed);
    
    //this.removeElementCnt += 1;
    //if(this.index < this.slotArray.length){
    //this.enableAddBetweenAppt = true;
    //}
  }

  download() {
    this.currentDay = this.currentDay;
    this.enableAppointments = true;
    console.log(this.selectedDay);
    this.slot.value.map((res)=>{
      delete res.id;
      delete res.isDeleted;
    })
    
  }

  showAddBtn(endTime, startTime, i) {
    console.log('START TIME', startTime);
    console.log('END TIME', endTime);
    console.log(i);

    //this.index = i;
    if (startTime - endTime == 60) {
      this.enableAddBetweenAppt = true;
    }
  }
}




















































































 // this.removedIndexValue.forEach(element => {
    //   if(element+1 == index ){
    //     console.log("yes");

    //     setTimeout(() => {
    //       if(element+1 == index){
    //         this.slot.removeAt(element+1);
    //       }
    //       else{
    //         //this.slot.removeAt(element-1);
    //       }
    //     }, 200);
    //   }
    //  if(element-1 == index){
    //     console.log("No");
    //     setTimeout(() => {
    //       this.slot.removeAt(element+1);
    //     }, 200);
    //   }
    //   console.log();
      
   // });



    // let indexForSelectingNewTime = this.form.get('controlsArray').value;
    // let selectPrevEndInd;
    // indexForSelectingNewTime.forEach(element => {
    //   if(element.isDeleted == "true"){
    //     if(element.id == i-1){
    //       selectPrevEndInd = element.end;
    //     }
    //   }
    // });
    // console.log(selectPrevEndInd);




// addItemBetween(){
//   // let prevIndexEndData;
//   // let nextIndexStartData;

//   let indexPrevStart: number;
//   let indexPrevEnd: number;
//   let indexNextStart: number;
//   let indexNextEnd: number;

//   //this.slot.insert(this.index,this.getFormGroup());
//   // prevIndexEndData = this.slotArray[this.index - 1].end;
//   // nextIndexStartData = this.slotArray[this.index + 1].start;
//   console.log(this.index);

//   indexPrevStart = this.slotTimeArray.indexOf(this.slotArray[this.index -1].start);  //Gives index of previous slot/record's end time.

//   indexPrevEnd = this.slotTimeArray.indexOf(this.slotArray[this.index - 1].end);  //Gives index of previous slot/record's end time.
//   console.log("Prev Data End Index:--",indexPrevEnd);

//   indexNextStart = this.slotTimeArray.indexOf(this.slotArray[this.index].start); //Gives index of next slot/record's start time.
//   console.log("Next Data Start Index:--",indexNextStart);

//   indexNextEnd = this.slotTimeArray.indexOf(this.slotArray[this.index].end);   //Gives index of next slot/record's end time.

//   console.log("All Values:--",this.slotTimeArray[indexPrevEnd],this.slotTimeArray[indexNextStart],this.slotTimeArray[indexNextEnd]);

//   console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextStart]));
//   console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextEnd]));

//   //if(this.removeElementCnt == 1){

//     this.slot.insert(this.index,this.getFormGroup());
//     if((indexNextStart - indexPrevEnd) >= 60){
//       //this.slot.insert(this.index,this.getFormGroup());

//       console.log("Start:--",this.slotTimeArray[this.slotTimeArray.indexOf(indexNextStart)]);
//       //console.log("End:--",this.slotTimeArray[this.slotTimeArray.indexOf(indexNext)]);

//       this.slotArray.splice(this.index,0,{ start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] });

//       console.log(this.slotArray);

//       setTimeout(() => {
//         this.getFormArray.setValue(this.slotArray);
//       }, 200);
//       console.log(this.slotArray[this.index]);
//       console.log(this.index);
//       this.removeElementCnt = 0;

//       if((indexNextStart - indexPrevEnd) == 60){
//         this.enableAddBetweenAppt = false;

//       }

//     }
//   //}
//   // else{
//   //   if((indexNextStart - indexPrevEnd) >= 60){

//   //     this.slot.insert(this.index,this.getFormGroup());
//   //     console.log("index",this.index,this.selectedStartTime);
//   //     // this.slotArray.splice(this.index,0,{ start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] });
//   //     // setTimeout(() => {
//   //     //   this.getFormArray.setValue(this.slotArray);
//   //     // }, 200);
//   //   }else{
//   //     setTimeout(() => {
//   //       this.enableAddBetweenAppt = false;
//   //     }, 200);
//   //   }
//   //   //this.removeElementCnt -= 1;
//   // }
//   this.removeElementCnt = 0;
//   //this.index += 1;
//   console.log(this.slotArray[this.slotArray.length - 1]);

// }

//this.selectedEndTime = this.getFormArray.at(i).patchValue({ end: this.slotTimeArray[indexAfterAdd] });

// onChangeEndTime($event, i: number){
//   this.selectedStartTime = $event.target.value;
//   let indexOfStartTimeAfterAdd;
//   indexOfStartTimeAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime) + 45;
//   this.getFormArray.at(i+1).patchValue({ start: this.slotTimeArray[indexOfStartTimeAfterAdd] });
// }

// this.form = this.fb.group({
//   controlsArray: this.fb.array([this.getFormGroup()]),
//   // controlsArray: this.fb.array([
//     //   this.fb.group({
//       //     start: [''],
//       //     end: ['']
//       //   })
//       // ])
//     });

//
// });
