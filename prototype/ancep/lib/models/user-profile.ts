import { ObjectId } from "mongodb";

export type UserProfile = {
    email: string;
    badges: UserBadge[];
}

export type UserBadge = {
    number: number;
}