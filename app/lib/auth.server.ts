import { Authenticator, AuthorizationError } from "remix-auth";
import { Login } from "~/models/user.server";
import { sessionStorage } from "./session.server";
import { FormStrategy } from 'remix-auth-form'

export interface AuthUser {
    userId: String,
    token: String
}


const authenticator = new Authenticator<AuthUser | Error | null>(sessionStorage, {
    sessionKey: "sessionKey",
    sessionErrorKey: "sessionErrorKey"
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
      let email = form.get('email') as string;
      let password = form.get('password') as string;
  
      let user = null;
  
      if (!email || email?.length === 0) throw new AuthorizationError('Bad Credentials: Username is required')
      if (typeof email !== 'string')
        throw new AuthorizationError('Bad Credentials: Username must be a string')
  
      if (!password || password?.length === 0) throw new AuthorizationError('Bad Credentials: Password is required')
      if (typeof password !== 'string')
        throw new AuthorizationError('Bad Credentials: Password must be a string')
  
      
      user = await Login({
        email: email, password: password
      })

      
      if (user != null) {
        user = {
          userId: user.id,
          token: `${password}-${new Date().getTime()}`,
        };
  
        return await Promise.resolve({ ...user });
  
      } else {
        throw new AuthorizationError("Bad Credentials")
      }
  
    }),
  );
  
  export default authenticator