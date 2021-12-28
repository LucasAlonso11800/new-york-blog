export type CategoryType = {
    id: number
    name: string
    path: string
};

export type CountType = {
    count: number
};

export type ArticleType = {
    id: number
    title: string
    visits: number
    categoryId: number
    categoryName: string
    categoryPath: string
    image: string
    createdAt: string
    authorId: number
    authorName: string
    slug: string
    description: string
};

export type ArticleComponentType = {
    id: number
    componentId: number | string
    componentName: string
    articleId: number | string
    order: number
    image: string
    text: string
    fontWeight: 400 | 600
    textAlign: string
};

export type MetadataType = {
    name: string
    value: string
    description: string
}

export type LayoutProps = {
    title: string
    children: JSX.Element | JSX.Element[]
    asideArticles: ArticleType[]
    categories: CategoryType[]
    headerImage: string
    footerText: string
    aboutImage: string
    aboutTitle: string
    mostVisitedArticlesTitle: string
    headIcon: string
};