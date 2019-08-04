<h3 align="center">[WIP] GitHub User Status CLI</h3>
<p align="center">A CLI for setting your GitHub user status<p>
<p align="center"><a href="https://npmjs.com/package/github-user-status"><img src="https://badgen.net/npm/v/github-user-status" alt="NPM"></a> <a href="https://travis-ci.org/JasonEtco/github-user-status"><img src="https://badgen.now.sh/travis/JasonEtco/github-user-status" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/github-user-status/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/github-user-status" alt="Codecov"></a></p>

## Usage

You'll need to [set a GitHub personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line), with the `user` scope if you want to change your own status.

### Get the status of a user

If no argument is passed, this will return your own status.

```sh
$ npx github-user-status [user]
```

### Change your status

```sh
$ npx github-user-status set <message>
```
