import { callSP } from "../../dbConfig";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Types
import { UserType } from "../../types/Types";

type Args = {
    username: string
    email: string
    password: string
};

function generateToken(id: string, username: string) {
    return jwt.sign({
        id,
        username,
    }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' })
};

export const registerUser = async (_: any, args: Args) => {
    const { username, email, password } = args;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.REGISTER_USER;
    const values: [string, string, string] = [username, email, hash];

    try {
        const newUser: UserType[] = await callSP({ procedure, values });
        const token = generateToken(newUser[0].id, newUser[0].username);

        return {
            id: newUser[0].id,
            username: newUser[0].username,
            token
        };
    }
    catch (err: any) {
        throw new Error(err);
    }
};

export const loginUser = async (_: any, args: Args) => {
    const { email, password } = args;
    try {
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.LOGIN_USER;
        const values: [string] = [email];
        
        const user: UserType[] = await callSP({ procedure, values });
        if (!user[0].id) throw new Error('User not found');
        
        const match = await bcrypt.compare(password, user[0].password);
        if (!match) throw new Error('Wrong username or password');
        
        const token = generateToken(user[0].id, user[0].username);

        return {
            id: user[0].id,
            username: user[0].username,
            token
        };
    }
    catch (err: any) {
        throw new Error(err)
    }
};