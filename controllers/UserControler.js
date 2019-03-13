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
            let user = this.getValues();
            this.addLine(user);

        });
    }
    // recupera os valores dos campos do form
    getValues(){
        let user = {};
        Array.from(this.formEl.elements).forEach( function(field, index){
            if(field.name == 'gender'){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }else{
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
        console.log(dataUser);
        this.tableUserId.innerHTML += `<tr>
            <td>
                <img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm">
            </td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
      </tr>`
      
    }
}