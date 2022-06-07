export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector) {
      this._name = document.querySelector(profileNameSelector);
      this._description = document.querySelector(profileInfoSelector);
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
  }
}