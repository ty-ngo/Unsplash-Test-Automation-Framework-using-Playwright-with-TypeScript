import { Element } from "../core/element/element";
import { expect } from "../fixtures/page-fixture";
import { BasePage } from "./base-page"

export class PhotographerProfilePage extends BasePage {

    private _btnMoreActions: Element = new Element("//button[@title='More Actions']");
    private _btnFollowPhotographer: Element = new Element("//button[contains(text(),'Follow')]");
    private _btnUnfollowPhotographer: Element = new Element("//button[contains(text(),'Unfollow')]");

    async openMoreActions(): Promise<void> {
        while (await this._btnMoreActions.getAttribute("aria-expanded") === "false") {
            await this._btnMoreActions.hover();
            await this._btnMoreActions.click();
        }
    }

    async followPhotographer(): Promise<void> {
        await this.openMoreActions();
        await this._btnFollowPhotographer.click();
    }

    async unfollowPhotographer(): Promise<void> {
        await this.openMoreActions();
        await this._btnUnfollowPhotographer.click();
    }

    async checkFollowed(): Promise<void> {
        await expect(await this._btnUnfollowPhotographer.waitForElementToBeVisible()).toBeVisible();
    }
}