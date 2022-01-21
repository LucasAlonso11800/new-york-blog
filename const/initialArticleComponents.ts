import { ArticleComponentNames } from "../types/Types";

export const initialText = {
    image: null, 
    componentName: ArticleComponentNames.ARTICLE_TEXT, 
    text: "Your new paragraph", 
    fontWeight: null, 
    textAlign: null
};

export const initialQuote = {
    image: null,
    componentName: ArticleComponentNames.ARTICLE_QUOTE,
    text: "Your new quote",
    fontWeight: null,
    textAlign: null
};

export const initialImage = {
    image: "/NewArticleImagePlaceholder.jpg",
    componentName: ArticleComponentNames.IMAGE,
    text: null,
    fontWeight: null,
    textAlign: null
};

export const initialSubtitle = {
    image: null,
    componentName: ArticleComponentNames.ARTICLE_SUBTITLE,
    text: "Your new subtitle"
};