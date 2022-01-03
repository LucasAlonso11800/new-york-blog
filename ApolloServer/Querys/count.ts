import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Const
import { callSP } from "../../dbConfig";
// Types 
import { CountType } from "../../types/Types";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    categoryId: string | number,
    search: string
};

export const getTotalArticleCount = async () => {
    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_TOTAL_ARTICLE_COUNT;
    const count: CountType[] = await callSP({ procedure, values: [] });
    return count[0].count;
};

export const getCategoryArticleCount = async (_: any, args: Args) => {
    const { categoryId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_CATEGORY_ARTICLE_COUNT;
    const values: [number] = [formatId(categoryId)];

    const count: CountType[] = await callSP({ procedure, values });
    return count[0].count;
};

export const getSearchedArticleCount = async (_: any, args: Args) => {
    const { search } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_SEARCHED_ARTICLE_COUNT
    const values: [string] = [search];
    
    const count: CountType[] = await callSP({ procedure, values });
    return count[0].count;
};