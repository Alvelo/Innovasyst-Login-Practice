import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	//@ViewChild(MatPaginator) paginator: MatPaginator;
	pageSize = 25;
  displayedColumns: string[] = ['fullName'];
  dataSource: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
		
    this.userService.getUser().subscribe((jesuschrist) => {
			console.log(jesuschrist);
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = jesuschrist;
    });
  }
}
