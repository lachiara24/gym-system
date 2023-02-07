import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() page: number;

  active = 0;

  pages

  ngOnInit() {
    console.log(this.page);
    this.pages = Array(6).fill(0).map((x, i) => i+1);
    console.log(this.pages);
    this.pages.pop()
  }

  constructor() {
    
  }

  get currentPage (){
    return this.active;
  }
}
