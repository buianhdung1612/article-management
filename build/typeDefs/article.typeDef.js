"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
    type Article {
        id: String,
        title: String,
        avatar: String, 
        description: String,
        categoryId: String,
        category: Category
    }

    type ResponseCode {
        code: String,
        message: String
    }

    type Query {
        getListArticle(
            sortKey: String,
            sortValue: String = "asc",
            currentPage: Int = 1,
            limitItems: Int = 10,
            filterKey: String,
            filterValue: String,
            keyword: String
        ): [Article],
        getArticle(id: String): Article
    }

    input ArticleInput {
        title: String,
        avatar: String,
        description: String,
        categoryId: String
    }

    type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: String): ResponseCode,
        updateArticle(id: String, article: ArticleInput): Article
    }
`;
