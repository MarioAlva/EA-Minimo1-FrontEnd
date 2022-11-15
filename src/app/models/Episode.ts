export class Episode {
    id_serie: Number;
    name: String;
    air_date: Date;
    season_number: Number;
    episode_number: Number;
    
    constructor(id_serie: Number,
        name: String,
        air_date: Date,
        season_number: Number,
        episode_number: Number){
            this.id_serie= id_serie;
            this.name=name;
            this.air_date=air_date;
            this.season_number=season_number;
            this.episode_number=episode_number;
        }
}
