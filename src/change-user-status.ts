import graphql from '@octokit/graphql'
import { UserStatus } from '.'

const query = `mutation changeUserStatus ($input: ChangeUserStatusInput!) {
  changeUserStatus (input: $input) {
    status {
      emoji
      message
      indicatesLimitedAvailability
    }
  }
}`

interface Input {
  emoji?: string
  message: string
  expiresAt?: string
  limitedAvailability?: boolean
}

export default async function changeUserStatus(
  input: Input,
  token: string
): Promise<UserStatus> {
  return graphql(query, {
    input,
    headers: {
      Authorization: `token ${token}`,
    },
  })
}
