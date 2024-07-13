import { BrowserManager } from '../browser/browser-manager';

export class Element {
    private locator: string;

    constructor(locator: string) {
        this.locator = locator;
    }

    async click(): Promise<void> {
        const element = await this.waitForElementToBeVisible();
        await element.click();
    }

    async enter(value: string): Promise<void> {
        const element = await this.waitForElementToBeVisible();
        await element.fill(value);
    }
    async clear(): Promise<void> {
        const element = await this.waitForElementToBeVisible();
        await element.clear();
    }

    async select(value: string): Promise<void> {
        await this.waitForElement({ state: 'visible', timeout: 10000 });
        await BrowserManager.page.selectOption(this.locator, value)
    }

    async getText(): Promise<string> {
        const element = await this.waitForElementToBeVisible();
        const text = await element.textContent()
        return text ? text.trim() : '';
    }

    async hover(): Promise<void> {
        await this.waitForElement({ state: 'visible', timeout: 10000 });
        await BrowserManager.page.hover(this.locator);
    }

    async scrollIntoView(): Promise<void> {
        const element = await this.waitForElementToBeVisible();
        await element.scrollIntoViewIfNeeded();
    }

    async getCurrentValue(): Promise<string> {
        const element = await this.waitForElementToBeVisible();
        const value = await element.inputValue();
        return await value.trim();
    }

    async getAttribute(attribute: string): Promise<string> {
        const element = await this.waitForElementToBeVisible();
        const value = await element.getAttribute(attribute);
        return value ? value.trim() : '';
    }

    async isVisible(): Promise<boolean> {
        const element = await this.waitForElementToBeVisible();
        return await element.isVisible();
    }

    async waitForElement(options): Promise<void> {
        await BrowserManager.page.locator(this.locator).waitFor(options);
    }

    async waitForElementToBeVisible() {
        await this.waitForElement({ state: 'visible', timeout: 10000, strict: false });
        return BrowserManager.page.locator(this.locator)
    }

    async waitForElementToBeHidden(): Promise<void> {
        await this.waitForElement({ state: 'hidden' });
    }
}
