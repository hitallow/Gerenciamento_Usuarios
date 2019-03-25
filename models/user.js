class User{
    constructor(name, gender,birth, country, email, password, photo, admin){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get name(){
        return this._name;
    }
    set name(newName){
        this._name = newName;
    }
    get gender(){
        return this._gender;
    }
    set gender(newGender){
        this._gender = newGender;
    }
    get birth(){
        return this._birth;
    }
    set birth(newBirth){
        this._birth = newBirth;
    }
    get country (){
        return this._country;
    }
    set country(newCountry){
        this._country = newCountry;
    }
    get email(){
        return this._email;
    }
    set email(newEmail){
        this._email = newEmail;
    }
    get password(){
        return this._password;
    }
    set password(newPassword){
        this._password = newPassword;
    }
    get photo(){
        return this._photo;
    }
    set photo(newPhoto){
        this._photo = newPhoto;
    }
    get admin(){
        return this._admin;
    }
    set admin(newAdmin){
        this._admin = newAdmin;
    }
    get register(){
        return this._register;
    }
    set register(newRegister){
        this._register = newRegister;
    }
}