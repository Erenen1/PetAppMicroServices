import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId;

export const isValidMongoId = (id: string) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) {
            return true
        }
    }
    return false;
}