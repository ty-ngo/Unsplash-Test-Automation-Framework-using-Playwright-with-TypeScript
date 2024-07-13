import {Page, Browser, BrowserContext} from "@playwright/test";

export class BrowserManager{
    static browser: Browser;
    static browserContext: BrowserContext;
    static page: Page;

    static initializeBrowser(browser, browserContext, page){
        BrowserManager.browser = browser;
        BrowserManager.browserContext = browserContext;
        BrowserManager.page = page;
    }

    static setCurrentContext(browserContext)
    {
        BrowserManager.browserContext = browserContext;
    }

    static setCurrentPage(page){
        BrowserManager.page = page;
    }
}
