import { Constants } from "../constants/constants";
import { BrowserHelper } from "../core/browser/browser-helper";
import { test } from "../fixtures/page-fixture";

test.beforeEach('Before test', async ({ loginPage }) => {
  // Navigate to the login page
  await BrowserHelper.GoToUrl(Constants.login_url);

  // Log in with predefined account credentials
  await loginPage.login(Constants.account_email, Constants.account_password);
});

test('Follow the photographer of the second image', async ({ homePage, photoDetailPage, photographerProfilePage }) => {
  // Go to the second photo on the homepage
  await homePage.goToNthPhoto(2);

  // Navigate to the photographer's profile from the photo detail page
  await photoDetailPage.goToPhotographerProfile();

  // Follow the photographer
  await photographerProfilePage.followPhotographer();

  // Check if the follow action was successful
  await photographerProfilePage.checkFollowed();
});

test.afterEach('After test', async ({ photographerProfilePage }) => {
  // Unfollow the photographer to clean up after the test
  await photographerProfilePage.unfollowPhotographer();
});
