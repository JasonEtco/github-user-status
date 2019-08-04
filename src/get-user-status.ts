import graphql from '@octokit/graphql'
import { UserStatus } from './types'

const viewerQuery = `query getViewerStatus {
  viewer {
    status {
      emoji
      message
      indicatesLimitedAvailability
    }
  }
}`

const userQuery = `query getUserStatus ($user: String!) {
  user (login: $user) {
    status {
      emoji
      message
      indicatesLimitedAvailability
    }
  }
}`

export default async function getUserStatus(
  token: string,
  user?: string
): Promise<UserStatus> {
  const headers = {
    Authorization: `token ${token}`,
  }

  let returnValue: UserStatus

  if (user) {
    const response = await graphql(userQuery, { user, headers })
    returnValue = response.user.status
  } else {
    const response = await graphql(viewerQuery, { headers })
    returnValue = response.viewer.status
  }

  return returnValue
}
