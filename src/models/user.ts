import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    login: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    email: String
});

export const UserModel = model('user', UserSchema);