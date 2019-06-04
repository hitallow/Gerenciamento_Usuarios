class UserController {
    constructor(formId, formUpdateId, tableUserId) {
        this.formEl = document.getElementById(formId);
        this.tableUserId = document.getElementById(tableUserId);
        this.formUpdateEl = document.getElementById(formUpdateId);
        this.onSubmit();
        this.onEdit();
        this.recoveryUsers();

    }
    // adciona evento de submit ao form
    onSubmit() {
        // adciona o evento de submi ao formulario de inscrição
        this.formEl.addEventListener("submit", e => {
            e.preventDefault();
            let btn_submit = this.formEl.querySelector('[type=submit]');
            btn_submit.disable = true;
            let user = this.getValues(this.formEl);
            this.getPhoto(this.formEl).then(
                (file) => {
                    user.photo = file;
                    // user sabe, se salvar no localStorage
                    user.save();
                    this.addLine(user);
                    this.formEl.reset();
                    btn_submit.disable = false;
                    // remover as classes de erro
                    document.querySelectorAll('.form-group').forEach(element => {
                        element.classList = ['form-group'];
                    })
                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }
    // eventos de edição
    onEdit() {

        // cancelamento de edicao
        document.querySelector("#box-user-update .btn-cancel").addEventListener('click', e => {
            this.showPanelCreate();
        });
        // salvar edicao
        this.formUpdateEl.addEventListener('submit', e => {

            e.preventDefault();

            let btn = this.formUpdateEl.querySelector('[type=submit]');

            btn.disable = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableUserId.rows[index];

            let oldUser = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, oldUser, values);
            
            this.getPhoto(this.formUpdateEl).then(
            
                (file) => {

                    result._photo = file;

                    tr.dataset.user = JSON.stringify(result);

                    //result._register = new Date(result._register);

                    let user = new User();
                    
                    user.loadFromJSON(result);
                    
                    user.save();
                    
                    this.insertHTML(tr, result);

                    this.addEventsTr(tr);

                    this.updateCount();

                    this.formUpdateEl.reset();

                    btn.disable = false;

                    this.showPanelCreate();

                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }

    // pega o arquivo de foto que foi enviado e coloca o retorna!
    getPhoto(formEl) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(element => {

                if (element.name === 'photo')
                    return element;

            });

            let photoFile = elements[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);

            }
            fileReader.onerror = (e) => {
                reject(e);
            }
            if (photoFile) {
                fileReader.readAsDataURL(photoFile);
            } else {
                resolve("dist/img/boxed-bg.jpg");
            }
        });
    }


    // recupera os valores dos campos do form
    getValues(formEl) {
        let user = {};
        let isValid = true;
        // poderia ser feito com Array.from
        [...formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (field.name == 'gender') {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == 'admin') {
                user[field.name] = field.checked;
            }
            else {
                user[field.name] = field.value;
            }
        });

        // evita enviar o formulario nao valido
        if (!isValid) {
            return false;
        }
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    }

    // insere o datauser no html
    insertHTML(contentTr, dataUser) {
        contentTr.innerHTML =
            `<td>
                <img src="${dataUser._photo}" alt="User Image" class="img-circle img-sm">
            </td>
                <td class="name-user">${dataUser._name}</td>
                <td>${dataUser._email}</td>
                <td>${dataUser._admin ? "Sim" : "Não"}</td>
                <td>${Utils.dateFormat(dataUser._register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat btn-delete">Excluir</button>
            </td>`;
        //console.log(contentTr);
    }

    // adciona vários eventos a tr
    addEventsTr(tr) {
        tr.querySelector(".btn-edit").addEventListener('click', e => {
            this.showPanelUpdate();
            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for (name in json) {
                let field = this.formUpdateEl.querySelector('[name= ' + name.replace("_", "") + ']');
                if (field) {
                    switch (field) {
                        case 'file':
                            continue;
                        case 'radio':
                            field = this.formUpdateEl.querySelector('[name= ' + name.replace("_", "") + '][value=' + json[name] + ']');
                            field.checked = true;
                            break;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                    }
                }
                this.formUpdateEl.querySelector('.photo').src = json._photo;
            }
        });
        tr.querySelector('.btn-delete').addEventListener('click', e => {
            e.preventDefault();
            let name = tr.querySelector(".name-user").innerHTML;
            if (confirm(`Deseja excluir o registro de ${name}  ?`)) {
                let user = new User();
                user.loadFromJSON(JSON.parse(tr.dataset.user));
                user.exclude();
                tr.remove();
                this.updateCount();
            }
        });
    }
    // pegar os usuários que estão na nossa sessionStorage
    getUsersStorage() {
        let users = [];
        if (localStorage.getItem('users')) {
            //users = JSON.parse(sessionStorage.getItem('users'));
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }
    // colocar na nossa tabela, os valores da nossa SessionStorage
    recoveryUsers() {
        let users = User.getUsersStorage();
        users.forEach(dataUser => {
            let user = new User();
            user.loadFromJSON(dataUser);
            //user._register = new Date(user._register);
            this.addLine(user);
        });
    }
    // insere um novo usuário na nossa sessionStorage
    insertSession(user) {
        let users = User.getUsersStorage();
        users.push(user);
        //sessionStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users));
    }


    

    // adciona uma nova linha com o usuario que acabou de ser adcionado
    addLine(dataUser) {
        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser);
        this.insertHTML(tr, dataUser);
        this.addEventsTr(tr);
        this.tableUserId.appendChild(tr);
        this.updateCount();
    }

    updateCount() {

        let numberUser = 0;
        let numberAdmin = 0;
        [...this.tableUserId.children].forEach(tr => {
            numberUser++;
            let user = JSON.parse(tr.dataset.user);
            if (user._admin) numberAdmin++;
        });
        document.querySelector("#number-users").innerHTML = numberUser;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }

    showPanelUpdate() {
        document.getElementById('box-user-create').style.display = 'none';
        document.getElementById('box-user-update').style.display = 'block';
    }

    showPanelCreate() {
        document.getElementById('box-user-create').style.display = 'block';
        document.getElementById('box-user-update').style.display = 'none';
    }
}