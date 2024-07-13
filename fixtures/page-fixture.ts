import { test as baseTest, expect as baseExpect } from '../core/fixture/base-fixture';
import { EditProfilePage } from '../pages/edit-profile-page';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { MyProfilePage } from '../pages/my-profile-page';
import { PhotoDetailPage } from '../pages/photo-detail-page';
import { PhotographerProfilePage } from '../pages/photographer-profile-page';

// type PageFixture = {
//     loginPage: LoginPage;
//     profilePage: ProfilePage;
// };

export const test = baseTest.extend/*<PageFixture>*/({
    loginPage: async ({ }, use) => {
        await use(new LoginPage());
    },
    homePage: async ({ }, use) => {
        await use(new HomePage());
    },
    photoDetailPage: async ({ }, use) => {
        await use(new PhotoDetailPage());
    },
    photographerProfilePage: async ({ }, use) => {
        await use(new PhotographerProfilePage());
    },
    myProfilePage: async ({ }, use) => {
        await use(new MyProfilePage());
    },
    editProfilePage: async ({ }, use) => {
        await use(new EditProfilePage());
    },
});

export const expect = baseExpect;

