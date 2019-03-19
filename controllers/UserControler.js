class UserController{
    constructor(formId,tableUserId){
        this.formEl = document.getElementById(formId);
        this.tableUserId = document.getElementById(tableUserId);

        this.onSubmit();
    }
    // adciona evento de submit ao form
    onSubmit(){
        
        
        this.formEl.addEventListener("submit", e=>{
            console.log(this.formEl);
            e.preventDefault();
            let btn_submit = this.formEl.querySelector('[type=submit]');
            btn_submit.disable = true;
            let user = this.getValues();
            this.getPhoto().then(
                (file)=>{
                    user.photo = file;
                    this.addLine(user);
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
                console.log('resolve');
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
        // poderia ser feito com Array.from
        [...this.formEl.elements].forEach( function(field, index){
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
        this.tableUserId.innerHTML += `<tr>
            <td>
                <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
            </td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin ? "Sim":"Não"}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
      </tr>`
      
    }
}