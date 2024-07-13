import { Element } from "../core/element/element";
import { BasePage } from "./base-page"

export class LoginPage extends BasePage {

    private _btnLogin: Element = new Element("//button[text()='Login']");
    private _txtEmail: Element = new Element("//input[@type='email']");
    private _txtPassword: Element = new Element("//input[@type='password']");

    async login(email: string, password: string): Promise<void> {
        await this._txtEmail.enter(email);
        await this._txtPassword.enter(password);
        await this._btnLogin.click();
    }
}