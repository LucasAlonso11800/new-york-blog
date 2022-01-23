import { callSP } from "../../dbConfig";
// Const 
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
import { ARTICLE_LIMIT_PER_PAGE } from "../../const/Limits";
// Utils
import { formatId } from "../../utils/formatId";
// Types
import { ArticleComponentType, ArticleStatus, ArticleType, UserRoles } from "../../types/Types";

type Args = {
    articleId: string | number
    userId: string | number
    userRole: string
    authorId: string | number
    title: string
    slug: string
    categoryId: string | number
    image: string
    components: ArticleComponentType[]
};

export const addVisit = async (_: any, args: Args) => {
    const { articleId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_VISIT;
    const values: [number] = [formatId(articleId)];

    await callSP({ procedure, values });
    return 'Visit added';
};

export const addArticle = async (_: any, args: Args) => {
    const { userId, userRole, title, categoryId, components, image, slug } = args;
    try {
        const article: ArticleType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_SINGLE_ARTICLE,
            values: [slug] 
        });
        if(article[0]) throw new Error("Slug already in use");
        
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_ARTICLE;
        const values: [string, number, number, string, string, number, string, string] = [title, 0, formatId(categoryId), image, new Date().toISOString().substring(0, 10), formatId(userId), slug, userRole];

        const response: ArticleType[] = await callSP({ procedure, values });

        components.forEach(async component => {
            const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_ARTICLE_COMPONENT;
            const values: [number, number, number, string, string, string, string] = [formatId(component.componentId), formatId(response[0].id), component.order, component.image, component.text, component.fontWeight, component.textAlign]
            await callSP({ procedure, values });
        });

        const index = 1;
        const articles: ArticleType[] = await callSP({
            procedure: STORED_PROCEDURES.GET_LATEST_ARTICLES,
            values: [userRole === UserRoles.ADMIN ? ArticleStatus.ACCEPTED : ArticleStatus.STAND_BY]
        });
        return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + ARTICLE_LIMIT_PER_PAGE);
    }
    catch (err: any) {
        throw new Error(err)
    }
};

export const deleteArticle = async (_: any, args: Args) => {
    const { articleId, authorId, userId, userRole } = args;
    try {
        if (formatId(userId) === formatId(authorId) || userRole === UserRoles.ADMIN) {
            const procedure: STORED_PROCEDURES = STORED_PROCEDURES.DELETE_ARTICLE;
            const values: [number] = [formatId(articleId)]
            await callSP({ procedure, values });
            return "Deleted"
        };
        throw new Error("You are not authorized to delete this article");
    }
    catch (err: any) {
        throw new Error(err)
    }
};

export const approveArticle = async (_: any, args: Args) => {
    const { articleId, userRole } = args;
    try {
        if(userRole === UserRoles.ADMIN) {
            const procedure: STORED_PROCEDURES = STORED_PROCEDURES.APPROVE_ARTICLE;
            const values: [number] = [formatId(articleId)];
            await callSP({ procedure, values });
            return "Approved"
        };
        throw new Error("You are not authorized to delete this article");
    }
    catch (err: any) {
        throw new Error(err)
    }
};