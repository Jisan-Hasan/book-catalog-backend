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
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId: userId,
            orderedBooks: payload.orderedBooks,
        },
    });
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    if (user.role === client_1.Role.admin) {
        const result = yield prisma_1.default.order.findMany({});
        return result;
    }
    else if (user.role === client_1.Role.customer) {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
            },
        });
        return result;
    }
    throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
});
const getOrderById = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    //   check if user is admin
    if (user.role === client_1.Role.admin) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return result;
    }
    //   check if user is customer
    if (user.role === client_1.Role.customer) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) !== user.userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden for this order');
        }
        return result;
    }
    throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
});
exports.OrderService = {
    insertIntoDB,
    getAllOrders,
    getOrderById,
};
