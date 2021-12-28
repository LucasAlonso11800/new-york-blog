import executeQuery from "../../dbConfig";

export const getMetadata = async () => {
    const query = `
        SELECT 
            metadata_id AS id,
            metadata_name AS name,
            metadata_description AS description,
            metadata_value AS value
        FROM metadata
    `;
    const metadata = await executeQuery(query, []);
    return metadata;
};