import { Constants } from "../constants/constants";
import { BrowserHelper } from "../core/browser/browser-helper";
import { test } from "../fixtures/page-fixture";
import { Utilities } from "../utilities/utilities";

test.beforeEach(async ({ loginPage }) => {
  // Go to Login page
  await BrowserHelper.GoToUrl(Constants.login_url);

  // Login with valid account
  await loginPage.login(Constants.account_email, Constants.account_password);
});

test('Update username in the Profile page', async ({ homePage, myProfilePage, editProfilePage }) => {
  // Navigate to the profile edit page
  await homePage.goToMyProfilePage();
  await myProfilePage.goToEditProfilePage();

  // Get current first and last names
  const currentFirstName = await editProfilePage.getCurrentFirstName();
  const currentLastName = await editProfilePage.getCurrentLastName();

  // Generate a new random username based on the current first and last names
  const newUsername = await Utilities.generateRandomUsername(currentFirstName, currentLastName);

  // Edit the username and save the changes
  await editProfilePage.editUsernameAndSave(newUsername);

  // Get the current full name for verifying later
  const currentFullName = await editProfilePage.getCurrentFullName();

  // Verify the username update by navigating to the new profile URL
  await BrowserHelper.GoToUrl(`${Constants.base_url}${newUsername}`);

  // Check if the full name is displayed correctly
  await myProfilePage.checkFullNameDisplayed(currentFullName);
});