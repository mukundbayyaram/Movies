import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [`
    .list-group-item { 
      cursor: pointer;
    }
    .titles {
      color: blue;
    }`
  ],
  providers: [FetchService]
})

export class ResultsComponent implements OnInit {

  moviesList: any[];
  detailsLoaded = false;
  spinner = false;
  selectedMovie = {'title': ''};
  movieDetails = {"imdb_id": ''};

  constructor(private fetchService: FetchService) { }

  ngOnInit() {}

  // this.fetchService.getMovies('capta').subscribe(res => this.moviesList = res.results, null,
  //     () => this.select(this.moviesList[0]));

  getMovies(title) {
    this.moviesList = [];
    this.fetchService.getMovies(title).subscribe(res => this.moviesList = res.results);
  }

  select(movie) {
    this.selectedMovie = movie;
    this.spinner = true;
    this.detailsLoaded = false;
    this.fetchService.getDetails(movie.id)
    .subscribe(res => this.movieDetails = res,
      null,
      () => this.fetchService.getimdb(this.movieDetails.imdb_id)
      .subscribe(res => this.movieDetails = res, 
        null, 
        () => { 
          this.spinner = false; 
          this.detailsLoaded = true;
        }));
    }
}