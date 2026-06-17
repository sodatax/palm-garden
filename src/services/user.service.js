import db from "../scripts/db.js";
import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

export const findUserByUsername = async (email) => {
    const [results] = await db.query(
        "SELECT userId, email, password FROM users WHERE email = ? LIMIT 1",
        [email]
    );
    return results[0];
}

export const createUser = async (email, plainPassword) => {
    if (!email) throw new Error("Email is required.");
    if (!plainPassword) throw new Error("Password is required.");

    // hash the password before insert!
    const passwordHash = await hashPassword(plainPassword);

    try {
        const [result] = await db.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, passwordHash]
        );

        return {
            userId: result.insertId,
            email,
        };
    } catch (err) {
        console.error("MYSQL ERROR:", err);
        throw err;
    }
};

export const validatePassword = async (plainPassword, storedHash) => await bcrypt.compare(plainPassword, storedHash);