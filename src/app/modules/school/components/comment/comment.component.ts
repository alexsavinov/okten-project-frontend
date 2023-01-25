import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../interfaces";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: IComment
  @Input()
  select: boolean

  constructor() {
  }

  ngOnInit(): void {
  }

}
