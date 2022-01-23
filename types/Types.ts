export enum ModalActions {
    ADD_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    EDIT_METADATA
};

export enum MetadataNames {
    HEADER_IMAGE = 'header_image',
    FOOTER_TEXT = 'footer_text',
    ABOUT_TITLE = 'about_title',
    MOST_VISITED_ARTICLES_TITLE = 'most_visited_articles_title',
    ABOUT_IMAGE = 'about_image',
    HEAD_ICON = 'head_icon'
};

export enum ArticleComponentNames {
    ARTICLE_QUOTE = 'Quote',
    ARTICLE_SUBTITLE = 'Subtitle',
    ARTICLE_TEXT = 'Text',
    ARTICLE_TITLE = 'Title',
    IMAGE = 'Image'
};

export enum UserRoles {
    ADMIN = 'Admin',
    WRITER = 'Writer',
    BLOCKED = 'Blocked'
};

export enum ArticleStatus {
    ACCEPTED = 'Accepted',
    STAND_BY = 'Stand By'
}

export type ModalInfoType = {
    action: ModalActions | null
    open: boolean
    title: string
};

export type ToastInfoType = {
    open: boolean
    message: string
    type: 'success' | 'error'
}

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

export type ComponentType = {
    id: string
    name: ArticleComponentNames
}

export type ArticleComponentType = {
    id: string
    componentId: string
    componentName: ArticleComponentNames
    articleId: string
    order: number
    image: string
    text: string
    fontWeight: "400" | "600"
    textAlign: "L" | "C"
};

export type MetadataType = {
    id: string
    name: string
    value: string
    description: string
}

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
    roleName: UserRoles
    password?: string
    articles?: number
    visits?: number
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