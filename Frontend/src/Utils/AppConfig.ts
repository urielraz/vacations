class AppConfig {
    public port = 3001;
    public registerUrl = `http://localhost:${this.port}/api/auth/register/`;
    public loginUrl = `http://localhost:${this.port}/api/auth/login/`;
    public vacationsUrl = `http://localhost:${this.port}/api/vacations/`;
    public followUrl = `http://localhost:${this.port}/api/followers/`;
    // public followersByUser = this.followUrl + ''
    public forumUrl = `http://localhost:${this.port}/api/forum/`;
    public usersUrl = `http://localhost:${this.port}/api/users/`;
}

const appConfig = new AppConfig();

export default appConfig;
