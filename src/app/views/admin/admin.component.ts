import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User as Admin } from '../../interfaces/user.interface';
import { ConfirmDialogConfig } from '../../interfaces/confirm-dialog-config';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public admins: Admin[] = [];
  public _admins: Admin[] = this.admins.slice(0, 5);
  public search: string = '';
  public searchFields: string[] = [];
  public searchForm: Partial<Admin> = <Admin>{
    first_name: '',
    last_name: '',
    email: '',
  };

  private adminIndexForDelete: number = 0;
  private dialogConfig: ConfirmDialogConfig = <ConfirmDialogConfig>{};

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private adminService: AdminService
  ) {
    this.adminService.getAll().subscribe({
      next: (resp) => {
        this.admins = resp.data.users;
      },
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.admins.length) endIndex = this.admins.length;

    this._admins = this.admins.slice(startIndex, endIndex);
  }

  searchAdminHandler(): void {
    this.searchFields = [];
    // TODO implement logic to search
  }

  resetSearchHandler() {
    this.searchFields = [];
  }

  updateAdminHandler(id: string) {
    this.router.navigate(['admins', 'update', id]);
  }

  deleteAdminHandler(id: string) {
    this.adminIndexForDelete = this.admins.findIndex(
      (user: Admin) => user._id == id
    );

    this.dialogConfig = {
      message: `Are you sure you want to delete ${
        this.admins[this.adminIndexForDelete].first_name
      } ${this.admins[this.adminIndexForDelete].last_name}`,
      callback: this.deleteAdmin,
    };

    this.dialog.open(ConfirmDialogComponent, { data: this.dialogConfig });
  }

  deleteAdmin(user: Admin): void {
    // TODO implement logic for delete
  }
}
