class TokenService {
  //TODO - move to core api file
  getCaretakerAccessToken() {
    //   return JSON.parse(localStorage.getItem("caretaker") || "");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(localStorage.getItem("caretaker"));
  }
  //TODO - move to core api file
  setCaretakerAccessToken(caretaker) {
    localStorage.setItem("caretaker", JSON.stringify(caretaker));
  }

  setUserToken(user) {
    localStorage.setItem("token", JSON.stringify(user));
  }

  saveToken = (token: string): void => {
    window.localStorage.setItem("token", token);
  };

  saveUserId = (id: string): void => {
    window.localStorage.setItem("userid", id);
  };
  getUserId() {
    return window.localStorage.getItem("userid");
  }
}

export default new TokenService();
