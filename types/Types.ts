export type Category = {
    name: string;
    link: string;
};

export type CountType = {
    count: number;
};

export type ArticleType = {
    id: number
    title: string
    visits: number
    categoryId: number
    categoryName: string
    image: string
    createdAt: string
    authorId: number
    authorName: string
    slug: string
};