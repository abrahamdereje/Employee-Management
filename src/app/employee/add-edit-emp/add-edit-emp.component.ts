import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

 
  constructor(private service1:SharedService) { }
@Input() emp:any;


EmployeeId:string;
EmployeeName:string;
Department:string;
DateOfJoining:string;
PhotoFileName:string;
PhotoFilePath:string;
DepartmentList:any=[];
  ngOnInit(): void {
    this.loadDepartmentList();
  }


  loadDepartmentList(){
    this.service1.getAllDepartmentNames().subscribe((data:any)=>{

      this.DepartmentList=data; 

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining= this.emp.DateOfJoining;
      this.PhotoFileName= this.emp.PhotoFileName;
      this.PhotoFilePath=this.service1.PhotoUrl+this.PhotoFileName;
     
    });
  }

  addEmployee(){
var val= {
  EmployeeId:this.EmployeeId,
   EmployeeName:this.EmployeeName,
  Department:this.Department,
 DateOfJoining:this.DateOfJoining,
 PhotoFileName:this.PhotoFileName
};
this.service1.addEmployee(val).subscribe(res=>{
  alert(res.toString());
});

  }

  updateEmployee(){
    var val= {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
     Department:this.Department,
    DateOfJoining:this.DateOfJoining,
    PhotoFileName:this.PhotoFileName
    };
    this.service1.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }


  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formdata:FormData=new FormData();
    formdata.append('upoadFile',file,file.name);

    this.service1.UploadPhoto(formdata).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service1.PhotoUrl+this.PhotoFileName;
    })

  }

}
