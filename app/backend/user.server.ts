import { User as PrismaUser } from "@prisma/client";
export type SocialLink = 'twitter' | 'github';

export class User {
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
    links: { [key in SocialLink]: string|undefined };

    constructor(user: PrismaUser) {
        this.name = user.name;
        this.username = user.username;
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
}