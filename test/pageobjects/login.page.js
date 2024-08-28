class LoginPage{
    /**
     * define selectors using getter methods
     */
    get okButton () {
        return $('//*[contains(@resource-id, "android:id/button1")]');
    }

    get inputEmail () {
        return $('//*[contains(@resource-id, "com.loginmodule.learning:id/textInputEditTextEmail")]');
    }

    get inputPassword () {
        return $('//*[contains(@resource-id, "com.loginmodule.learning:id/textInputEditTextPassword")]');
    }

    get btnSubmit () {
        return $('//*[contains(@resource-id, "appCompatButtonLogin")]');
    }

    get btnRedirect2Login () {
        return $('//*[contains(@resource-id, "appCompatTextViewLoginLink")]');
    }

    get errorMessage () {
        return $('(//*[contains(@class, "android.widget.TextView")])[2]');
    }

    get viewEmail () {
        return $('(//*[contains(@resource-id, "com.loginmodule.learning:id/textViewName")])[1]');
    }

    get flashMessage () {
        return $('//*[contains(@resource-id, "snackbar_text")]');
    }

    async loginOK () {
        let isExisting = await this.okButton.isExisting();
        if(isExisting){
            await this.okButton.click();
        };
    }

    async login (username,password) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async loginSubmit () {
        await this.btnSubmit.click();
    }

    async redirect2Login () {
        await this.scrollUntilTextVisible("Login");
        await this.btnRedirect2Login.click();
    }

    // JavaScript example to perform swipe-up using WebdriverIO

    async scrollUntilTextVisible(text) {
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`;
        await $(selector);
      }  
}

export default new LoginPage()