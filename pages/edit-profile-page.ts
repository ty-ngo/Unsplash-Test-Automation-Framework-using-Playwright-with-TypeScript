import { faker } from "@faker-js/faker";
import { Element } from "../core/element/element";
import { BasePage } from "./base-page"

export class EditProfilePage extends BasePage {

    private _txtFirstName: Element = new Element("#user_first_name");
    private _txtLastName: Element = new Element("#user_last_name");
    private _txtUsername: Element = new Element("#user_username");
    private _btnUpdateAccount: Element = new Element("//input[@value='Update account']");

    async getCurrentFirstName(): Promise<string> {
        return await this._txtFirstName.getCurrentValue();
    }

    async getCurrentLastName(): Promise<string> {
        return await this._txtLastName.getCurrentValue();
    }

    async getCurrentFullName(): Promise<string> {
        const firstName = await this.getCurrentFirstName();
        const lastName = await this.getCurrentLastName();
        return `${firstName} ${lastName}`;
    }

    async editUsernameAndSave(value: string): Promise<void> {
        await this._txtUsername.clear();
        await this._txtUsername.enter(value);
        await this._btnUpdateAccount.click();
    }
}