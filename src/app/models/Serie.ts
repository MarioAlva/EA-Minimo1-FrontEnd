export class Serie {
    title: String;
    overview: String;
    poster_path: String;
    trailer_path: String;
    vote_average: Number;
    vote_count: Number;
    number_of_seasons: Number;
    number_of_episodes: Number;
    genres: [];
    status: String;
    networks: [];
    episodes: [];
    comments: [];

    constructor(title: String, overview: String, poster_path: String, trailer_path: String, vote_average: Number, vote_count: Number, number_of_seasons: Number, number_of_episodes: Number, genres: [], status: String, networks: [], episodes: [], comments: []){
        this.title = title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.trailer_path = trailer_path;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.number_of_seasons = number_of_seasons;
        this.number_of_episodes = number_of_episodes;
        this.genres = genres;
        this.status = status;
        this.networks = networks;
        this.episodes = episodes;
        this.comments = comments;
    }
}