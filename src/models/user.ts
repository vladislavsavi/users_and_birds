import { Schema, model, Document } from 'mongoose';
import { hash as getHash, compare as getCompare } from 'bcrypt';

interface UserModel extends Document {
    login: string;
    password: string;
    email: string;
}

const UserSchema = new Schema<UserModel, any>({
    password: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
});

UserSchema.pre('save', async function (next) {
    const hash = await getHash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await getCompare(password, user.password);
  
    return compare;
  }

export const UserModel = model('user', UserSchema);