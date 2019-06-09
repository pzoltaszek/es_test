var utils = {
    loginValidator : function loginValidator(login) {
        if(login === '' || login === null || login === undefined) {
            return false;
        }
        return true;
   },
   
    passwordValidator : function passwordValidator(pass){
        if(pass === '' || pass === null || pass === undefined) {
        return false;
        }
        return true;
    },

   encrypt: function encrypt(text){
        return text;
       //TODO
   }
};
   
export default utils 