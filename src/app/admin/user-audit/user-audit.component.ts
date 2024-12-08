import { Component, OnInit } from '@angular/core';
import { AdminUserService, UserAction } from '../../core/services/admin-user.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-audit',
  templateUrl: './user-audit.component.html',
  styleUrls: ['./user-audit.component.css'],
  imports: [FormsModule, NgFor, NgIf]
})
export class UserAuditComponent implements OnInit {
  allUserActions: UserAction[] = [];
  userActions: UserAction[] = [];
  userId!: number;

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.loadAllUserActions();
  }

  loadAllUserActions(): void {
    this.adminUserService.getAllUserActions().subscribe(actions => {
      this.allUserActions = actions;
    });
  }

  loadUserActions(): void {
    if (this.userId) {
      this.adminUserService.getUserActions(this.userId).subscribe(actions => {
        this.userActions = actions;
      });
    }
  }
}
