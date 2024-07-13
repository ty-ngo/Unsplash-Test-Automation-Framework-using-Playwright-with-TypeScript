import { Element } from "../core/element/element";
import { BasePage } from "./base-page"

export class HomePage extends BasePage {
    private _imgNthPhoto(n: number) { return new Element(`//figure[@data-masonryposition='${n.toString()}']//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`); }
    // private _imgNthPhoto(n: number) { return new Element(`//figure[@data-masonryposition='${n.toString()}' and not(.//*[name()='desc' and contains(text(),'Plus sign')])]//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`); }
    private _btnLikeNthPhoto(n: number) { return new Element(`//figure[@data-masonryposition='${n.toString()}']//button[@title='Like this image']`); }

    async goToNthPhoto(n: number): Promise<void> {
        await this._imgNthPhoto(n).scrollIntoView();
        await this._imgNthPhoto(n).click();
    }

    async likeNthPhoto(n: number): Promise<void> {
        await (await this._imgNthPhoto(n)).scrollIntoView();
        await (await this._imgNthPhoto(n)).hover();
        await (await this._btnLikeNthPhoto(n)).click();
    }

    async getTitleOfNthPhoto(n: number): Promise<string> {
        const image = await this._imgNthPhoto(n);
        return await image.getAttribute("alt");
    }
}