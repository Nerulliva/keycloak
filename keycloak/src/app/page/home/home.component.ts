import {Component, OnInit, ViewChild} from '@angular/core';
import {Movie, MovieBackendService} from "../../services/movie-backend.service";
import {MatTable} from "@angular/material/table";
import {KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = []
  displayedColumns: string[] = ['title', 'director', 'year'];

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(
    private keycloakService: KeycloakService,
    private backend: MovieBackendService,
    private snackBar: MatSnackBar) {

  }

  logout() {
    this.keycloakService.logout();
  }

  getAllMovies() {
    this.backend.getAllMovies().subscribe(

      response => {
        this.movies = response
        // @ts-ignore
        this.table.renderRows();
      },

      error => {
        this.handleError(error.error)
      })
  }

  onMovieIdChange(event: any){
    this.getMovieById(event.value);
  }

  private getMovieById(id: number) {
    this.backend.getMovieById(id).subscribe(

      response => {
        this.movies = [response]
        // @ts-ignore
        this.table.renderRows();
      },

      error => {
        this.handleError(error.error)
      })
  }

  private handleError(error: any) {
    this.displayError(error.code + ' ' + error.reason + ". " + error.message)
  }

  private displayError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000})
  }

  ngOnInit(): void {
  }

}
