---
title: Configure Git
subtitle: Install and Configure Git
description: Use Git version control to deploy code to your Drupal or WordPress site's development environment.
categories: [develop]
tags: [code, git, local, webops, workflow]
layout: guide
showtoc: true
permalink: docs/guides/git/git-config
anchorid: git-config
---

This section provides steps for installing and configuring Git to work with your Pantheon account.

## Before You Begin

Confirm that you have:

- [Created a site](/guides/legacy-dashboard/create-sites) on Pantheon
- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account

## Install Git

Download and install Git for your operating system:

- [macOS](https://git-scm.com/download/mac)
- [Windows](https://git-scm.com/download/win)
- [Linux](https://git-scm.com/download/linux)

## Configure Git

Provide a name and email with which your commits will be associated before you can commit your code in Git.

1. Run the following command to enter your own name and email.

    ```bash{promptUser: user}
    git config --global user.name "Anita Pantheon"
    git config --global user.email anita@pantheon.io
    ```

    - The `--global` option sets these values for all projects you manage with Git.

1. Run the command below to set a default editor for commit messages. Replace `nano` with your preferred text editor or IDE. For example, `atom` or `code` (for [Visual Studio Code](/visual-studio-code)).

    ```bash{promptUser: user}
    git config --global core.editor nano
    ```

## Clone Your Site Codebase

You must create a local copy of your [codebase](/code#pantheon-git-repository "About your site's code repository on Pantheon") using the `git clone` command. Follow the steps below to ensure that you create the clone correctly.

1. Navigate to the Terminal directory where you keep your projects.

1. Log in to Pantheon and load the Site Dashboard for the site you want to work on.

1. Click the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab > set the **Development Mode** to **Git** > click **Clone with Git**. 

  ![Copy Git Clone Command](../../../images/dashboard/git-string.png)

1. Copy the `git clone` command and paste it into Terminal. Git will create a directory as part of the clone, so you don't need to create one:

  ```bash{promptUser: user}
  git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
  ```

  You should see Git fetching the data:

  ```git
  Cloning into 'anita-wordpress'...
  The authenticity of host '[codeserver.dev.....drush.in]:2222 ([173.255.119.72]:2222)' can't be established.
  RSA key fingerprint is SHA256:yPEkh1Amd9WFBSP5syXD5rhUByTjaKBxQnlb5CahZZE.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  Warning: Permanently added '[codeserver.dev.....drush.in]:2222,[173.255.119.72]:2222' (RSA) to the list of known hosts.
  remote: Counting objects: 20503, done.
  remote: Compressing objects: 100% (8184/8184), done.
  remote: Total 20503 (delta 12802), reused 19671 (delta 11982)
  Receiving objects: 100% (20503/20503), 46.65 MiB | 15.16 MiB/s, done.
  Resolving deltas: 100% (12802/12802), done.
  ```

- Check your [SSH key](/ssh-keys) setup if you run into permission problems.
  
- Confirm that you have a current version of Git if the clone starts but can't complete.

## Make Changes

You can now edit your site code using your [preferred](https://xkcd.com/378/ "XKCD comic about text editors") text editor or IDE.

1. Run the command below to add a new file to your codebase and have Git track the file.

  ```bash{promptUser: user}
  git add path/to/file.txt
  ```

1. Run the command below to find files in your local clone that Git is not tracking.

    ```bash{promptUser: user}
    git status
    ```

    - Pending changes and files to be added will be listed like this:

    ```git
    On branch master
    Your branch is up to date with 'origin/master'.

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

          modified:   index.php
          modified:   wp-admin/admin-ajax.php

    Untracked files:
      (use "git add <file>..." to include in what will be committed)

          superdev.php

    no changes added to commit (use "git add" and/or "git commit -a")
    ```

1. Cut and paste the paths to these files when using `git add`. This **stages** the files for the next commit.

## Push Changes to Pantheon

Sending code to Pantheon is a two-step process with Git. First, you need to commit the files locally. Then you need to "push" them to the Pantheon cloud.

1. Commit changed files to let Git know that they are ready to be pushed to the remote.

    - Every commit includes a brief message so you can later remember why the change was made. It is worthwhile to take a moment and create an accurate commit message to help others understand your changes:

    ```bash{promptUser: user}
    git commit -am "Add a great new plugin to increase awesomesauce level of my WordPress site."
    ```

    This command uses a combination of options `-am`: `-a` to include *all* files changed, and `-m` to include a commit *message*:

    <Alert type="info" title="Note">

    Any _new_ (untracked) files not staged with `git add` will not be included by the `-a` flag. Be sure to review what is and isn't staged with `git status` before you commit your work.

    </Alert>

    If you don't specify a message through the command line, Git will open your default text editor and prompt you to create one. If you exit without providing a commit message, Git will end the commit. You will see something similar to the example below if the commit worked:

    ```git
    [master d2fce4ea] Add a great new plugin to increase awesomesauce level of my WordPress site.
    2 files changed, 3 insertions(+)
    ```

1. Run the `push` command to send the changes of the committed files from the local to Pantheon.

  ```bash{promptUser: user}
  git push origin master
  ```

  This executes a push to the origin location, (which is Pantheon since that's where you cloned the code from), on the branch "master", which is what your Dev environment tracks.

  If you have a passphrase on your SSH key, you may need to enter it to authorize the push. If everything worked, you will see something like this:

  ```git
  Enumerating objects: 9, done.
  Counting objects: 100% (9/9), done.
  Delta compression using up to 8 threads
  Compressing objects: 100% (5/5), done.
  Writing objects: 100% (5/5), 466 bytes | 466.00 KiB/s, done.
  Total 5 (delta 4), reused 0 (delta 0)
  To ssh://codeserver.dev.....drush.in:2222/~/repository.git
    27bf0fca..d2fce4ea  master -> master
  ```

There is a handy list of Git commands (along with a lot of other documentation) [on GitHub](https://github.com/AlexZeitler/gitcheatsheet/blob/master/gitcheatsheet.pdf "Alex Zeitler's Git cheat sheet PDF").

### View the Changes on Pantheon

Pantheon instantly deploys the changes to your development server when the push command completes.

![Image of the Dev tab syncing with a recently pushed git commit](../../../images/dashboard/sync-code.png)

1. Navigate to your site's dashboard > click the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab.

1. Click **Visit Development Site** to see the changes made by your new code.

## Troubleshooting

<Partial file="host-keys.md" />

### Checking Out Code using GUI Clients

Git GUI clients generally prompt for a Source URL using HTTP or HTTPS to the repository to check out the site code. Pantheon does not provide Git repository access over HTTP(s), and instead provides a "Git over SSH" command. For example: 

```bash
git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
```

However, some Git GUI clients, including SourceTree, also support the use of
 `ssh://` URLs to clone the code base. Follow the steps below to configure the URL.

1. Navigate to your Pantheon **Dev** environment > click  **Connection Info** > copy the **SSH clone URL**.

1. Navigate to SourceTree > click **Clone a repository**.

1. Paste the URL into the **Source URL** field.

   1. Remove `git clone` from the beginning of the URL. 

   1. Remove the trailing space and `my-site` name from the end of the URL provided in the **Connection Info** section of your Pantheon Dashboard.

      Your Source URL should look like this:

      ```
      ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git
      ```

1. Enter the local path where you want to clone the repository in the **Destination Path** field. 

1. Enter your site name in the the **Name** field.

![SourceTree git Configuration](../../../images/sourcetree-config.png)

Alternatively, you can simply clone the repository using `git clone` and then use the "Add Existing Local Repository" option in SourceTree to point to the checked out directory.

### Blocked Port

You'll see an error like the one below when attempting to run `git clone`, `git push`, or `git pull` if your local network is blocking port 2222.

```none
ssh: connect to host codeserver.dev.xxx.drush.in port 2222: Operation timed out
fatal: Could not read from remote repository.
```

To clear this up, you may need to work with your network administrators to unblock this port. If this isn't an option, you may need to try a [Port 2222 Blocked Workaround](/port-2222).

## More Resources

We recommend the following resources for further learning:

- [Git Documentation](https://git-scm.com/documentation)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [First Aid Git](https://github.com/magalhini/firstaidgit)
- [Git Reference](http://gitref.org/)
- [Git Cheatsheet](https://ndpsoftware.com/git-cheatsheet.html)
- [Git Immersion](http://gitimmersion.com/)
- [Code School - Try Git](https://try.github.io/levels/1/challenges/1)
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [SourceTree - Git GUI Client](https://www.sourcetreeapp.com/)
- [GitKraken - Git GUI Client](https://www.gitkraken.com/)
- [GitHub Desktop - Git GUI Client](https://desktop.github.com/)
- [Repository mirroring](https://docs.gitlab.com/ee/workflow/repository_mirroring.html)

For Pantheon-specific Git questions, see the following:

- [Git FAQs](/guides/git/faq-git)

- [Undo Git Commits](/guides/git/undo-commits)

- [Useful Git Commands](/guides/git/useful-commands)

