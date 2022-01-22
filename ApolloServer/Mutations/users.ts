import { callSP } from "../../dbConfig";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Types
import { UserRoles, UserType } from "../../types/Types";
import { formatId } from "../../utils/formatId";

type Args = {
    userRole: string
    authorId: string | number
    authorRoleName: string
    username: string
    email: string
    password: string
};

function generateToken(id: string, username: string, roleId: string, roleName: string) {
    return jwt.sign({
        id,
        username,
        roleId,
        roleName
    }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' })
};

export const registerUser = async (_: any, args: Args) => {
    const { username, email, password } = args;
    if (password.length < 6) throw new Error("Password length must be 6 characters");
    if (password.length > 20) throw new Error("Password length cannot be over 20 characters");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.REGISTER_USER;
    const values: [string, string, string] = [username, email, hash];

    try {
        const newUser: UserType[] = await callSP({ procedure, values });
        const token = generateToken(newUser[0].id, newUser[0].username, newUser[0].roleId, newUser[0].roleName);

        return {
            id: newUser[0].id,
            username: newUser[0].username,
            roleId: newUser[0].roleId,
            roleName: newUser[0].roleName,
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

        const match = await bcrypt.compare(password, user[0].password as string);
        if (!match) throw new Error('Wrong username or password');

        const token = generateToken(user[0].id, user[0].username, user[0].roleId, user[0].roleName);

        return {
            id: user[0].id,
            username: user[0].username,
            roleId: user[0].roleId,
            roleName: user[0].roleName,
            token
        };
    }
    catch (err: any) {
        throw new Error(err)
    }
};

export const changeUserRole = async (_: any, args: Args) => {
    try {
        const { userRole, authorId, authorRoleName } = args;
        if(userRole === UserRoles.ADMIN){
            const procedure: STORED_PROCEDURES = STORED_PROCEDURES.CHANGE_USER_ROLE;
            const values: [number, string] = [formatId(authorId), authorRoleName];   
            await callSP({ procedure, values });
            return "Changed role"
        }
        throw new Error("You are not authorized to change a user's role'")
    }
    catch (err: any) {
        throw new Error(err)
    }
};