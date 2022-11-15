export class Event{
    title: String;
    image:String;
    description: String;
    owner:String;
    date: Date;
    location: String;
    participants: [];
    comments: [];
    vote_average: Number;
    vote_count: Number;

    constructor(title: String,
        image:String,
        description: String,
        owner: String,
        date: Date,
        location: String,
        participants: [],
        comments: [],
        vote_average: Number,
        vote_count: Number){
            this.title=title;
            this.image=image;
            this.description= description;
            this.owner=owner;
            this.date=date;
            this.location=location;
            this.participants= participants;
            this.comments= comments;
            this.vote_average=vote_average;
            this.vote_count=vote_count;
        }
}