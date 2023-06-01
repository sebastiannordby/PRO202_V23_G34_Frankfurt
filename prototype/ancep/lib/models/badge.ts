import { ObjectId } from "mongodb";

export type Badge = {
    _id: ObjectId;
    type: string;
    name: string;
    image_url: string;
};