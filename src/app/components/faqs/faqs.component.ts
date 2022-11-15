import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faqs: any[];
  modalOpened = false;
  faq_id: String;
  updateForm: FormGroup;
  addForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.faqs = [];
    this.updateForm = this.formBuilder.group({});
    this.addForm = this.formBuilder.group({});
    this.faq_id = "";
  }

  ngOnInit(): void {
    this.getFaqs();
    this.updateForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer: ['', Validators.required],
    });
    this.addForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer: ['', Validators.required],
      Likes: [0, Validators.required],
      Date: [new Date(), Validators.required],
      User: ['', Validators.required],
    });
  }

  getFaqs() {
    const response = axios.get('http://localhost:5432/api/faqs/', {
    }).then((response) => {
      this.faqs = response.data;
    }).catch((error) => {
      console.log("error");
    });
  }

  editFaq(id: String) {
    this.faq_id = id;
    this.modalOpened = true;
  }

  cancelEditFaq() {
    this.faq_id = "";
    this.modalOpened = false;
  }

  deleteFaq(id: String) {
    const response = axios.delete(`http://localhost:5432/api/faqs/${id}`)
    .then((response) => {
      this.getFaqs();
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  }

  onSubmit(id: String) {
    this.submitted = true;
    const response = axios.put(`http://localhost:5432/api/faqs/${id}`, {
      Question: this.updateForm.value.Question,
      Answer: this.updateForm.value.Answer,
    }).then((response) => {
      this.getFaqs();
      this.modalOpened = false;
    }).catch((error) => {
      console.log("error");
    });
  }

  addFaq() {
    this.submitted = true;
    const response = axios.post(`http://localhost:5432/api/faqs/`, {
      Question: this.addForm.value.Question,
      Answer: this.addForm.value.Answer,
      Likes: this.addForm.value.Likes,
      Date: this.addForm.value.Date,
      User: this.addForm.value.User,
    }).then((response) => {
      this.getFaqs();
    }).catch((error) => {
      console.log("error");
    });
  }
}
