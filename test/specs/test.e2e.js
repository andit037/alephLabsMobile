import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import RegisterPage from '../pageobjects/register.page.js'

describe('My register application', () => {
    it('should register with valid credentials', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.registerData('tomsmith', `test4${Date.now()}@gmail.com`, '13fRe$', '13fRe$')
        await RegisterPage.submitRegister()
        await expect(RegisterPage.flashMessage).toBeExisting();
        await expect(RegisterPage.flashMessage).toHaveText('Registration Successful');
    })

    it('unsuccessfull register with all field is empty', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.submitRegister()
        await expect(RegisterPage.errorMessage).toBeExisting();
        await expect(RegisterPage.errorMessage).toHaveText('Enter Full Name');
    })

    it('unsuccessfull register with email field is empty', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.registerData('tomsmith', ' ', '13fRe$', '13fRe$')
        await RegisterPage.submitRegister()
        await expect(RegisterPage.errorMessage).toBeExisting();
        await expect(RegisterPage.errorMessage).toHaveText('Enter Valid Email');
    })

    it('unsuccessfull register with password field is empty', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.registerData('tomsmith', `test4${Date.now()}@gmail.com`, '', '13fRe$')
        await RegisterPage.submitRegister()
        await expect(RegisterPage.errorMessage).toBeExisting();
        await expect(RegisterPage.errorMessage).toHaveText('Enter Password');
    })

    it('unsuccessfull register with password doesn\'t match', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.registerData('tomsmith', `test4${Date.now()}@gmail.com`, '14fRe', '13fRe$')
        await RegisterPage.submitRegister()
        await expect(RegisterPage.errorMessage).toBeExisting();
        await expect(RegisterPage.errorMessage).toHaveText('Password Does Not Matches');
    })
})

describe('My login application', () => {
    const ms = Date.now()
    it('should login with valid credentials', async () => {
        await RegisterPage.registerPage()
        await RegisterPage.registerData('tomsmith', `test4${ms}@gmail.com`, '12fRe$', '12fRe$')
        await RegisterPage.submitRegister()
        await expect(RegisterPage.flashMessage).toBeExisting();
        await expect(RegisterPage.flashMessage).toHaveText('Registration Successful');
        await LoginPage.redirect2Login()
        await LoginPage.login(`test4${ms}@gmail.com`, `12fRe$`)
        await LoginPage.loginSubmit()
        await expect(LoginPage.viewEmail).toHaveText(`test4${ms}@gmail.com`);

    })

    it('unsuccessfull login with all field is empty', async () => {
        await LoginPage.loginOK()
        await LoginPage.loginSubmit()
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(LoginPage.errorMessage).toHaveText('Enter Valid Email');
    })

    it('unsuccessfull login with empty password', async () => {
        await LoginPage.loginOK()
        await LoginPage.login(`test4${ms}@gmail.com`, '')
        await LoginPage.loginSubmit()
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(LoginPage.errorMessage).toHaveText('Enter Valid Email');
    })

    it('unsuccessfull login with email field is empty', async () => {
        await LoginPage.loginOK()
        await LoginPage.login('', '12345')
        await LoginPage.loginSubmit()
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(LoginPage.errorMessage).toHaveText('Enter Valid Email');
    })

    it('unsuccessfull login with wrong email', async () => {
        await LoginPage.loginOK()
        await LoginPage.login(`test4${Date.now()}@gmail.com`, '12fRe$')
        await LoginPage.loginSubmit()
        await expect(LoginPage.flashMessage).toBeExisting();
        await expect(LoginPage.flashMessage).toHaveText('Wrong Email or Password');
    })

    it('unsuccessfull login with wrong password', async () => {
        await LoginPage.loginOK()
        await LoginPage.login(`test4${ms}@gmail.com`, '12fRe#')
        await LoginPage.loginSubmit()
        await expect(LoginPage.flashMessage).toBeExisting();
        await expect(LoginPage.flashMessage).toHaveText('Wrong Email or Password');
    })
})
