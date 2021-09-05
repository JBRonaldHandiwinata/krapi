class Posts{
    constructor(id, categories, title, desc, img, username, timestamp){
        this.id = id;
        this.categories = categories;
        this.title = title;
        this.desc = desc;
        this.img = img;
        this.username = username;
        this.timestamp = timestamp;
    }
}
module.exports = Posts;
