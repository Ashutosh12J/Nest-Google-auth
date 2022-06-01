import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: 'enter your client id',
            clientSecret: 'enter the client secret',
            callbackURL: 'http://localhost:3000/user/profile',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            "Email": emails[0].value,
            "FullName" : name.givenName + " " + name.familyName,
        }
        done(null, user);
    }
}