import { Element } from "../core/element/element";

export class PhotoDetailPage {

    private _imgPhotographerAvatar: Element = new Element("//div[@data-test='photos-route']//header//img");
    private _btnViewProfile: Element = new Element("//a[text()='View profile']");

    async goToPhotographerProfile(): Promise<void> {
        await this._imgPhotographerAvatar.hover();
        await this._btnViewProfile.click();
    }
}