import { Constants } from "../constants/constants";
import { BrowserHelper } from "../core/browser/browser-helper";
import { expect, test } from "../fixtures/page-fixture";
import { Utilities } from "../utilities/utilities";

test.beforeEach(async ({ loginPage, homePage, myProfilePage }) => {
  // Navigate to the login page
  await BrowserHelper.GoToUrl(Constants.login_url);

  // Log in with predefined account credentials
  await loginPage.login(Constants.account_email, Constants.account_password);

  // Navigate to the profile page
  await homePage.goToMyProfilePage();

  // Unlike all photos to start with a clean state
  await myProfilePage.unlikeAllPhotos();
});

test('List of liked photos', async ({ homePage, myProfilePage }) => {
  await BrowserHelper.GoToUrl(Constants.base_url);

  // Define the number of photos to like and get unique random numbers
  const numberOfPhotos = 3;
  const randomNumbers = await Utilities.getUniqueRandomNumbers(1, 20, numberOfPhotos);

  const titleList: string[] = [];
  for (const number of randomNumbers) {
    // Get the title of the nth photo and like it
    const title = await homePage.getTitleOfNthPhoto(number);
    await titleList.push(title);
    await homePage.likeNthPhoto(number);
  }

  // Go to the profile page and navigate to the likes tab
  await homePage.goToMyProfilePage();
  await myProfilePage.goToTab("likes");
  await BrowserHelper.ReloadPage();

  // Assert the number of liked photos
  const numberOfLikedPhotos = await myProfilePage.getNumberOfItemInTab("likes");
  await expect(numberOfLikedPhotos).toBe(numberOfPhotos);

  // Check if each liked photo exists in the likes tab
  for (const title of titleList) {
    await myProfilePage.checkPhotoExistInTab(title, "likes");
  }
});
