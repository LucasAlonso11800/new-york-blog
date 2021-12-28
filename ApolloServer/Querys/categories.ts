import executeQuery from "../../dbConfig";
import { CategoryType } from "../../types/Types";

export const getCategories = async (_: any, args: any) => {
    const query: string = `
        SELECT 
            category_id AS id,
            category_name AS name,
            category_path AS path
        FROM categories
    `;

    const categories: CategoryType[] = await executeQuery(query, []);
    return categories;
};