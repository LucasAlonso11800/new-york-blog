import executeQuery from "../../dbConfig";
import { CategoryType } from "../../types/Types";

export const getCategories = async (_: any, args: any) => {
    const query: string = `
        SELECT 
            category_id AS id,
            category_name AS name,
            category_path AS path
        FROM categories
        WHERE category_name NOT IN(?, ?)
    `;

    const values: [string, string] = ["Dev", "About"]
    const categories: CategoryType[] = await executeQuery(query, values);
    return categories;
};