import 'jquery';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';

console.log('The \'validation\' bundle has been loaded!');

export function validatePassword(password:string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNonAlphabetic = /[^A-Za-z]/.test(password);
    return hasUpperCase && hasLowerCase && hasNonAlphabetic;
}
