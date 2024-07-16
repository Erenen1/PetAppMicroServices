export default class CustomError extends Error {
    statusCode: number;
    description: string
    constructor(statusCode: number, message: string, description: string) {
        super(message)
        this.statusCode = statusCode;
        this.description = description;
        Object.setPrototypeOf(this, new.target.prototype);
    }

}