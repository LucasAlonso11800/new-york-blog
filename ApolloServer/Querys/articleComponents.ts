import { callSP } from "../../dbConfig";
// Types
import { ArticleComponentType } from "../../types/Types";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    articleId: string | number
};

export const getComponentsList = async () => {
    try {
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_COMPONENT_LIST;
        const components = await callSP({ procedure, values: []})
        return components;
    }
    catch(err: any){
        throw new Error(err)
    }
};

export const getArticleComponents = async (_: any, args: Args) => {
    try {
        const { articleId } = args;
    
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_ARTICLE_COMPONENTS;
        const values: [number] = [formatId(articleId)];
    
        const articleComponents: ArticleComponentType[] = await callSP({ procedure, values });
        return articleComponents;
    }
    catch(err: any){
        throw new Error(err);
    }
};