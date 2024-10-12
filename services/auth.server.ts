import { Authenticator } from 'remix-auth'
import { sessionStorage } from './session.server'
import { GitHubStrategy } from 'remix-auth-github'

// TODO: add generic of a type that the authenticator will return
export const authenticator = new Authenticator(sessionStorage)

const githubStrategy = new GitHubStrategy(
	{
		clientId: process.env.GITHUB_CLIENT_ID!,
		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		redirectURI: process.env.GITHUB_REDIRECT_URL!
	},
	async ({ profile, tokens, request, context }) => {
		//return user data from database using profile

		return {
			profile
		}
	}
)

authenticator.use(githubStrategy, 'github')
