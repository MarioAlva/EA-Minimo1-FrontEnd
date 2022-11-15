export class User {
    _id?:String;
    name: String;
	username: String;
	password: String;
	birthdate: Date;
	email: String;
    constructor(id: String, name: String, username: String, passwors: String, birthdate: Date, email: String){
        this._id=id;
        this.name = name;
        this.username = username;
        this.password = passwors;
        this.birthdate = birthdate;
        this.email = email;
    }
}