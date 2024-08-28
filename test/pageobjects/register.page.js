import LoginPage from "./login.page";

class RegisterPage{
    /**
     * define selectors using getter methods
     */
    get registerButton () {
        return $('//*[contains(@resource-id, "textViewLinkRegister")]');
    }

    get inputName () {
        return $('//*[contains(@resource-id, "textInputEditTextName")]');
    }

    get inputEmail () {
        return $('//*[contains(@resource-id, "textInputEditTextEmail")]');
    }

    get inputPassword () {
        return $('//*[contains(@resource-id, "textInputEditTextPassword")]');
    }

    get inputConfirmPassword () {
        return $('//*[contains(@resource-id, "textInputEditTextConfirmPassword")]');
    }
    
    get btnSubmitRegister () {
        return $('//*[contains(@resource-id, "appCompatButtonRegister")]');
    }

    get flashMessage () {
        return $('//*[contains(@resource-id, "snackbar_text")]');
    }

    get errorMessage () {
        return $('//*[contains(@class, "android.widget.TextView")]');
    }
    
    async registerPage () {
        await LoginPage.loginOK();
        await this.registerButton.click();
    }

    async registerData (name,email,password,confirm_password) {
        await this.inputName.setValue(name);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputConfirmPassword.setValue(confirm_password);
    }

    async submitRegister () {
        await this.btnSubmitRegister.click();
    }
}

export default new RegisterPage()