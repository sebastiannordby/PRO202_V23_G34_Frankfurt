"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseAsync = void 0;
const mongodb_1 = require("mongodb");
console.log('env: ', process.env.MONGODB_URI_SOCKET);
if (!process.env.MONGODB_URI_SOCKET) {
    throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI_SOCKET;
const options = {};
if (!process.env.MONGODB_URI_SOCKET) {
    throw new Error('Please add your Mongo URI to .env.local');
}
// In production mode, it's best to not use a global variable.
function getDatabaseAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri, options);
        const mongoClient = yield client.connect();
        return mongoClient;
    });
}
exports.getDatabaseAsync = getDatabaseAsync;
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
