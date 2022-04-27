Class Place{
    constructor(title, imgUri, address, location){
        this.title = title;
        this.imgUri= imgUri;
        this.address = address;
        this.location = location;   //{lat: number, long: number}
        this.id = new Date().toString() + Math.random().toString()
    }
}