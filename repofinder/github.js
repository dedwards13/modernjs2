class GitHub {
    constructor() {
        this.client_id = 'f13b0f7131fe8e1b96e';
        this.client_secret = '9070941208da5270810f94ea8b2988678a179450';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    // get user method
    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client secret =${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=$[this.repos_sort}&client_id=${this.client_id}&client secret =${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile, // same as profile: profile
            repos
        };
    }
}