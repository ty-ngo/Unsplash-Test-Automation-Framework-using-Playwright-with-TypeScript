import { expect } from "@playwright/test";
import { Element } from "../core/element/element";
import { BasePage } from "./base-page"

export class MyProfilePage extends BasePage {

    private _btnEditProfile = new Element("//a[text()='Edit profile']");
    private _lblFullName(fullName: string): Element { return new Element(`//div[text()='${fullName}']`); }
    private _btnTab(tabName: string): Element { return new Element(`//a[@data-test='user-nav-link-${tabName.toLowerCase()}']/..`); }
    private _lblNumberOfItemInTab(tabName: string): Element { return new Element(`//a[@data-test='user-nav-link-${tabName.toLowerCase()}']/span/span`); }
    private _btnUnlikeNthPhoto(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//*[name()='desc' and text()='A heart']/../..`); }
    private _imgNthPhoto(n: number): Element { return new Element(`//figure[@data-masonryposition='${n.toString()}']//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`); }

    async goToEditProfilePage(): Promise<void> {
        await this._btnEditProfile.click();
    }

    async checkFullNameDisplayed(fullName: string): Promise<void> {
        await expect(await this._lblFullName(fullName).waitForElementToBeVisible()).toBeVisible();
    }

    async goToTab(tabName: string): Promise<void> {
        await this._btnTab(tabName).click();
    }

    async unlikeAllPhotos(): Promise<void> {
        await this.goToTab("likes");
        const itemCount = await Number(await (await this._lblNumberOfItemInTab("likes")).getText());
        if (itemCount !== 0) {
            for (let i = 0; i < itemCount; i++) {
                await this._imgNthPhoto(i + 1).scrollIntoView();
                await this._imgNthPhoto(i + 1).hover();
                await this._btnUnlikeNthPhoto(i + 1).click();
            }
        }
    }

    async getNumberOfItemInTab(tabName: string): Promise<number> {
        const itemCountElement = await this._lblNumberOfItemInTab(tabName);
        const itemCountText = await itemCountElement.getText();
        return Number(itemCountText);
    }

    async getTitleOfNthPhoto(n: number): Promise<string> {
        const image = await this._imgNthPhoto(n);
        return await image.getAttribute("alt");
    }

    async checkPhotoExistInTab(imageTitle: string, tabName: string): Promise<void> {
        const itemCount = await this.getNumberOfItemInTab(tabName);
        const actualTitleList: string[] = [];

        for (let i = 0; i < itemCount; i++) {
            const altText = await this.getTitleOfNthPhoto(i + 1);
            await actualTitleList.push(altText !== null ? altText : "");
        }

        await expect(actualTitleList).toContain(imageTitle);
    }
}