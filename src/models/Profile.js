export class Profile {
    constructor(data) {
        this.id = data.id || data._id
        this.bio = data.bio
        this.class = data.class
        this.coverImg = data.coverImg
        this.createdAt = data.createdAt
        this.email = data.email
        this.github = data.github
        this.graduated = data.graduated
        this.linkedin = data.linkedin
        this.name = data.name
        this.picture = data.picture
        this.resume = data.resume

    }

}