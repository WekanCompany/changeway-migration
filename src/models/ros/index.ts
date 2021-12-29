import { File } from './common/File';



import { Notifications } from "./global/notifications";
import { GlobalUser } from "./global/users";


import { AccessToken } from './user/AccessToken';
import { Company } from './user/Company';
import { LicenseKey } from './user/LicenseKey';
import { Profile } from './user/Profile';
import { Setting } from './user/Settings';
import { Workshop } from './user/Workshop';

export const GlobalUserAndNotification = [GlobalUser, Notifications];

export const UserSchema = [File, AccessToken, Company, LicenseKey, Profile, Setting, Workshop]