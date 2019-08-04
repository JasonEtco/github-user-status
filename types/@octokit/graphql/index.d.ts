declare module '@octokit/graphql' {
  export interface Variables {
    headers?: any;
    [key: string]: any;
  }

  function query(query: string, variables: Variables): Promise<any>;
  export default query;
}
