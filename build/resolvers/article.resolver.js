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
exports.resolversArticle = void 0;
const article_model_1 = require("../models/article.model");
const category_model_1 = __importDefault(require("../models/category.model"));
exports.resolversArticle = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue, keyword } = args;
            const find = {
                deleted: false
            };
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const skip = (currentPage - 1) * limitItems;
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            if (keyword) {
                const keywordRegex = new RegExp(keyword, "i");
                find["title"] = keywordRegex;
            }
            const articles = yield article_model_1.Article
                .find(find)
                .sort(sort)
                .limit(limitItems)
                .skip(skip);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.Article(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.Article.updateOne({
                _id: id,
                deleted: false
            }, {
                deleted: true
            });
            return {
                code: "success",
                message: "Xóa thành công!"
            };
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.Article.updateOne({
                _id: id,
                deleted: false
            }, article);
            const record = yield article_model_1.Article.findOne({
                _id: id,
                deleted: false
            });
            return record;
        })
    },
    Article: {
        category: (record) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = record.categoryId;
            const category = yield category_model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        })
    }
};
