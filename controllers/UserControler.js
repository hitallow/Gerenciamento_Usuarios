class UserController{
    constructor(formId,tableUserId){
        this.formEl = document.getElementById(formId);
        this.tableUserId = document.getElementById(tableUserId);

        this.onSubmit();
    }
    // adciona evento de submit ao form
    onSubmit(){
        this.formEl.addEventListener("submit", e=>{
            e.preventDefault();
            let btn_submit = this.formEl.querySelector('[type=submit]');
            btn_submit.disable = true;
            let user = this.getValues();
            this.getPhoto().then(
                (file)=>{
                    user.photo = file;
                    this.addLine(user);
                    this.formEl.reset();
                    btn_submit.disable = false;
                },
                (e)=>{
                    console.error(e);
                }
            );
             
        });
    }
    // pega o arquivo de foto que foi enviado e coloca o retorna!
    getPhoto(){
        return new Promise((resolve,reject)=>{
            let fileReader = new FileReader();
            
            let elements = [...this.formEl.elements].filter( element=>{

                if(element.name === 'photo')  
                    return element;

            });

            let photoFile = elements[0].files[0];
            fileReader.onload = ()=>{
                resolve(fileReader.result); 

            }
            fileReader.onerror = (e)=>{
                reject(e);
            }
            if(photoFile){
                fileReader.readAsDataURL(photoFile);
            }else{
                resolve("dist/img/boxed-bg.jpg");
            }
                        
            
        });
        
    }

    // recupera os valores dos campos do form
    getValues(){
        let user = {};
        let isValid = true;
        // poderia ser feito com Array.from
        [...this.formEl.elements].forEach( function(field, index){

            if(['name','email','password'].indexOf(field.name)>-1 && !field.value){
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if(field.name == 'gender'){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }else if(field.name == 'admin'){
                user[field.name] = field.checked;
            }
            else{
                user[field.name] = field.value;
            }   
        });

        // evita enviar o formulario nao valido
        if(!isValid){
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
    // adciona uma nova linha com o usuario que acabou de ser adcionado
    addLine(dataUser){
        let tr  = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = ` <td>
                <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
            </td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin ? "Sim":"Não"}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>`
        this.tableUserId.appendChild(tr);
        this.updateCount();
    }
    updateCount(){
        let numberUser = 0;
        let numberAdmin = 0;
        [...this.tableUserId.children].forEach(tr=>{
            numberUser++;
            let user = JSON.parse(tr.dataset.user);
            if(user._admin) numberAdmin++;
        });
        document.querySelector("#number-users").innerHTML = numberUser;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}