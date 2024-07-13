import { Element } from "../core/element/element";

export class BasePage {
    private _btnMenuProfile: Element = new Element("//button[@title='Your personal menu button']");
    private _btnViewProfile: Element = new Element("//a[text()='View profile']");

    async openProfileMenu(): Promise<void> {
        while (await this._btnMenuProfile.getAttribute("aria-expanded") === "false") {
            await this._btnMenuProfile.hover();
            await this._btnMenuProfile.click();
        }
    }

    async goToMyProfilePage(): Promise<void> {
        await this.openProfileMenu();
        await this._btnViewProfile.click();
    }
}