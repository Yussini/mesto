export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector, profileAvatarSelector) {
      this._name = document.querySelector(profileNameSelector);
      this._description = document.querySelector(profileInfoSelector);
      this._avatar = document.querySelector(profileAvatarSelector);
  };
  getUserInfo() {
    const userInfo = {
          name: this._name.textContent,
          about: this._description.textContent,
      }
      return userInfo
  };
  setUserInfo(data) {
      this._name.textContent = data.name;
      this._description.textContent = data.about;
      this._id = data._id;
      this._avatar.src = data.avatar;
  }
}