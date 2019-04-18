class Utils{
    // só pra demonstrar o uso de classes staticas
    static dateFormat(date){
        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+' '+date.getHours()+":"+date.getMinutes();
        //return date.toLocaleDateString()
    }
}