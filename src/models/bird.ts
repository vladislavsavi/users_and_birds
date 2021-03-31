import { Schema, model, Document } from 'mongoose';

interface BirdModel extends Document {
    name: string;
    description : string;
}

const BirdSchema = new Schema<BirdModel, any>({
    name: String,
    description: String,
});

export const BirdModel = model('bird', BirdSchema);