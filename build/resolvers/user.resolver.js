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
exports.resolversUser = void 0;
const generate_helper_1 = require("../helpers/generate.helper");
const user_model_1 = require("../models/user.model");
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.req.verifyUser) {
                const existUser = context.req.verifyUser;
                return {
                    code: "success",
                    message: "Thành công!",
                    id: existUser.id,
                    email: existUser.email,
                    fullName: existUser.fullName,
                    token: existUser.token
                };
            }
            else {
                return {
                    code: "error",
                    message: "Token không hợp lệ"
                };
            }
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existUser = yield user_model_1.User.findOne({
                email: user.email,
                deleted: false
            });
            if (existUser) {
                return {
                    code: "error",
                    message: "Email đã tồn tại trong hệ thống!"
                };
            }
            const dataUser = {
                fullName: user.fullName,
                email: user.email,
                password: (0, md5_1.default)(user.password),
                token: (0, generate_helper_1.generateRandomString)(30)
            };
            const newUser = new user_model_1.User(dataUser);
            yield newUser.save();
            return Object.assign({ code: "success", message: "Đăng ký thành công", id: newUser.id }, dataUser);
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const existUser = yield user_model_1.User.findOne({
                email: email,
                deleted: false
            });
            if (!existUser) {
                return {
                    code: "error",
                    message: "Email không tồn tại trong hệ thống!"
                };
            }
            if ((0, md5_1.default)(password) != existUser.password) {
                return {
                    code: "error",
                    message: "Sai mật khẩu!"
                };
            }
            return {
                code: "success",
                message: "Đăng nhập thành công!",
                id: existUser.id,
                email: existUser.email,
                fullName: existUser.fullName,
                token: existUser.token
            };
        })
    }
};
