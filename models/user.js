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
        this._id ;
    }
    static getUsersStorage() {
        let users = [];
        if (localStorage.getItem('users')) {
            //users = JSON.parse(sessionStorage.getItem('users'));
            users = JSON.parse(localStorage.getItem('users'));
            console.log(typeof(JSON.parse(localStorage.getItem('users'))));
        }
        return users;
    }
    getNewID() {
        let id = parseInt(localStorage.getItem('usersId'));
        console.log(id);
        if ( !id ) {
            console.log("entrei no if");
            id = 0;
        }
        id++;
        localStorage.setItem('usersId', id);
        return id;
    }
    save() {
        let users = User.getUsersStorage();
        
        // caso o entre no if, o dado está sendo alterado
        if (this.id > 0) {
            users.map(u => {
                console.log(u);
                if (u._id == this.id) {
                    Object.assign(u, this);
        
                }
                return u;
            });
            
        } 
        // caso de entrar no else, significa que o dado está sendo salvo pela primeira 
        else {
            this.id = this.getNewID();
            users.push(this);
        }
        localStorage.setItem("users", JSON.stringify(users));
    }
    loadFromJSON(json) {
    
        for (let name in json) {
                        
            if (name == '_register') {
                this.register = new Date(json[name]);
                continue;
            } else {
                this[name.replace('_','')] = json[name];
            }
        }
        
    }
    exclude(){
        let users = User.getUsersStorage();
        users.forEach((u, index) => {
            if(u._id == this.id){
            
                users.splice(index,1);
            }
            
        });
        localStorage.setItem("users", users);
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
    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
    }
}