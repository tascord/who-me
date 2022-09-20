import { User as PrismaUser } from "@prisma/client";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { db } from "./db.server";
import signerServer from "./signer.server";
export type SocialLink = 'twitter' | 'github';
export type VisibleUser = {
    id: string;
    name: string;
    username: string;
    banner?: string;
    avatar: string;
    bio?: string;
    location?: string;
    color: string;
    ring?: { id: string, rotation: number, };
    pronouns: string[];
    flags: string[];
    links: { [key in SocialLink]: string | undefined };
}

export class User {
    id: VisibleUser['id'] 
    name: VisibleUser['name'] 
    username: VisibleUser['username'] 
    password: string; 
    banner?: VisibleUser['banner'] 
    avatar: VisibleUser['avatar'] 
    bio?: VisibleUser['bio'] 
    location?: VisibleUser['location'] 
    color: VisibleUser['color']
    ring?: VisibleUser['ring'] 
    pronouns: VisibleUser['pronouns']
    flags: VisibleUser['flags'] 
    links: VisibleUser['links'] 

    constructor(user: PrismaUser) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.password = user.password;
        this.banner = user.banner || undefined;
        this.avatar = user.avatar;
        this.bio = user.bio || undefined;
        this.location = user.location || undefined;
        this.color = user.color;
        this.ring = user.ring_id ? { id: user.ring_id, rotation: user.ring_rotation } : undefined;
        this.pronouns = user.pronouns?.split(",") ?? [];
        this.flags = user.flags?.split(",") ?? [];

        this.links = {
            twitter: user.link_twitter || undefined,
            github: user.link_github || undefined,
        };
    }

    public static async get(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            db.user.findUnique({ where: { username } }).then(user => {
                if (user) return resolve(new User(user));
                return reject('invalid user id')
            })
                .catch(e => {
                    console.log(e);
                    throw 'unable to look through database'
                });
        })
    }

    public static async create(username: string, password: string): Promise<User> {

        username = username.toLowerCase();

        const existing = db.user.findUnique({ where: { username } });
        if (existing !== null) throw 'someone already has that name';

        if (password.length < 5) throw 'password has to be least 5 characters long';
        if (password.length > 180) throw 'really? try keep it under 180 characters please';
        if (username.length > 20) throw 'username too long, aim for sub 20';

        if (/[^a-z0-9_.]/g.test(username)) throw 'username should be alphanumeric plus some other bits';
        if (!/[A-Z]/.test(password)) throw 'password should have at least one uppercase letter';
        if (!/[a-z]/.test(password)) throw 'password should have at least one lowercase letter';
        if (!/[^A-z0-9]/.test(password)) throw 'password should have at least one special character';

        const [salt, hash] = this.hash(password);
        const secure_password = `${salt}:${hash}`;

        const user = await db.user.create({
            data: {
                name: username,
                username,
                password: secure_password,
                avatar: "",
                color: "#ff006a",
                ring_rotation: 0,
            }
        });

        return new User(user);
    }

    public static async login(username: string, password: string): Promise<User> {
        const user = await db.user.findUnique({ where: { username } });
        if (!user) throw 'invalid username';

        const [salt, hash] = user.password.split(':');
        const hashed_buffer = scryptSync(password, salt, 64);
        const key_buffer = Buffer.from(hash, 'hex');

        if (!timingSafeEqual(hashed_buffer, key_buffer)) throw 'not quite right';
        return new User(user);
    }

    private static hash(key: string) {
        const salt = randomBytes(16).toString('hex');
        const hash = scryptSync(key, salt, 64).toString('hex');
        return [salt, hash];
    }

    public token() {
        return signerServer.sign({
            id: this.id,
            password: this.password
        })
    }

    public static async fromToken(token: string): Promise<User> {
        if (!signerServer.verify(token)) throw 'invalid token validity';

        const data = signerServer.decode(token);
        if (!data || typeof data.payload === 'string') throw 'invalid token data';
        if (data.payload.id === undefined || data.payload.password === undefined) throw 'invalid token layout';

        const prisma_user = await db.user.findUnique({ where: { id: data.payload.id } });
        if (!prisma_user) throw 'invalid token user';

        return new User(prisma_user);

    }
}