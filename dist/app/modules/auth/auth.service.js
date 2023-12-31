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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data: payload,
    });
    return result;
});
const signin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const isUserExists = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    //   throw error if user does not exist
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // check if password is correct
    const isPasswordCorrect = isUserExists.password === payload.password;
    //   throw error if password is incorrect
    if (!isPasswordCorrect) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    }
    // generate token
    const token = jwtHelpers_1.jwtHelpers.createToken({ userId: isUserExists.id, role: isUserExists.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // return token
    return token;
});
exports.AuthService = {
    createUser,
    signin,
};
