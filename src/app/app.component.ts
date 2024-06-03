import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Record {
  name: string;
  email: string;
  mobile: string;
  amount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  total: number = 0;
  userForm: FormGroup;
  listdata: Record[];

  constructor(private fb: FormBuilder) {
    this.listdata = [];

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  addItem(): void {
    if (this.userForm.valid) {
      const newRecord: Record = this.userForm.value;

      if (this.listdata.some(record => record.email === newRecord.email)) {
        alert('Email must be unique.');
        return;
      }

      this.listdata.push(newRecord);
      this.sortRecords();
      this.calculateTotal();
      this.userForm.reset();
    } else {
      alert('Please fill all fields correctly.');
    }
  }

  deleteItem(element: Record): void {
    const index = this.listdata.indexOf(element);
    if (index > -1) {
      this.listdata.splice(index, 1);
      this.calculateTotal();
    }
  }

  sortRecords(): void {
    this.listdata.sort((a: Record, b: Record) => b.amount - a.amount);
  }

  calculateTotal(): void {
    this.total = this.listdata.reduce((sum, record) => sum + record.amount, 0);
  }
}
