import { BrowserManager } from "./browser-manager";

export class BrowserHelper {
    static async GoToUrl(url: string) {
        await BrowserManager.page.goto(url, { waitUntil: 'load' });
    }

    static async ReloadPage() {
        await BrowserManager.page.reload();
    }
}
