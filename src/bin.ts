#!/usr/bin/env node

import program from 'commander'
import getUserStatus from './get-user-status'
import changeUserStatus from './change-user-status'
import emojis from 'node-emoji'

interface MainOptions {
  token?: string
  emoji?: string
  username?: string
  message?: string
}

async function main({ emoji, username, message, token }: MainOptions) {
  if (!token) {
    throw new Error('Missing environment variable `GITHUB_TOKEN`.')
  }

  if (message) {
    const input = { emoji, message }
    return changeUserStatus(input, token)
  }

  return getUserStatus(token, username)
}

program
  .version(require('../package.json').version)
  .option('-u, --username [username]', 'The user to get the status of')
  .option('-m, --message [message]', 'The message to set your status with')
  .option('-e, --emoji [emoji]', 'The emoji to use for your status')
  .option(
    '-t, --token [token]',
    'GitHub personal access token',
    process.env.GITHUB_TOKEN
  )
  .parse(process.argv)

main(program as MainOptions)
  .then(status => {
    console.log(emojis.emojify(`${status.emoji}: ${status.message}`, n => n))
  })
  .catch(err => {
    const insufficientScope =
      err.errors &&
      err.errors.find((e: any) => e.type === 'INSUFFICIENT_SCOPES')
    if (insufficientScope) {
      console.error(insufficientScope.message)
    } else {
      console.error(err)
    }
    process.exit(1)
  })
