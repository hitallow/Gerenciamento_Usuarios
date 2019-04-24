class User {
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;

        this._register = new Date();
        this._id = 0;
    }
    static getUsersStorage() {
        let users = [];
        if (localStorage.getItem('users')) {
            //users = JSON.parse(sessionStorage.getItem('users'));
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }
    getNewID() {
        if (!window.id) {
            window.id = 0;
        }
        id++;
        return id;
    }
    save() {
        let users = User.getUsersStorage();

        if (this._id > 0) {
            users.map(u => {
                if (u._id === this._id) {
                    u = this;
                }
            });
        } else {
            this._id = this.getNewID();
            users.push(this);
        }
        localStorage.setItem("users", JSON.stringify(users));
    }
    loadFromJSON(json) {
        console.log(json);
        for (let name in json) {
            if (name == '_register') {
                this._register = Date(json[name]);
            } else {
                this.name = json[name];
            }
        }
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get gender() {
        return this._gender;
    }
    set gender(newGender) {
        this._gender = newGender;
    }
    get birth() {
        return this._birth;
    }
    set birth(newBirth) {
        this._birth = newBirth;
    }
    get country() {
        return this._country;
    }
    set country(newCountry) {
        this._country = newCountry;
    }
    get email() {
        return this._email;
    }
    set email(newEmail) {
        this._email = newEmail;
    }
    get password() {
        return this._password;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
    get photo() {
        return this._photo;
    }
    set photo(newPhoto) {
        this._photo = newPhoto;
    }
    get admin() {
        return this._admin;
    }
    set admin(newAdmin) {
        this._admin = newAdmin;
    }
    get register() {
        return this._register;
    }
    set register(newRegister) {
        this._register = newRegister;
    }
}