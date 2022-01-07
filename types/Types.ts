export type CategoryType = {
    id: string
    name: string
    path: string
};

export type CountType = {
    count: number
};

export type ArticleType = {
    id: string
    title: string
    visits: number
    categoryId: string
    categoryName: string
    categoryPath: string
    image: string
    createdAt: string
    authorId: string
    authorName: string
    slug: string
    description: string
};

export type ArticleComponentType = {
    id: string
    componentId: string
    componentName: string
    articleId: string
    order: number
    image: string
    text: string
    fontWeight: "400" | "600"
    textAlign: "L" | "C"
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

export type CommentType = {
    id: string
    author: string
    createdAt: string
    body: string
};

export type UserType = {
    id: string
    username: string
    token: string
    roleId: string
    roleName: string
    password?: string
}

type DecodedTokenProperties = {
    exp: number
}

export type DecodedTokenType = UserType & DecodedTokenProperties;

type OkPacket = {
    fieldCount: number
    affectedRows: number
    insertId: number
    serverStatus: number
    warningCount: number
    message: string,
    protocol41: boolean,
    changedRows: number
};

export type SPResponse<Type> = [Type[], OkPacket];