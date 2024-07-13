const base = require('@playwright/test');
import { BrowserManager } from '../browser/browser-manager';

export const test = base.test.extend({
    browserFixture: [async ({ browser, context, page }, use) => {
        BrowserManager.initializeBrowser(browser, context, page);
        await use();
    }, { scope: 'test', auto: true }],
});

export const expect = base.expect;
