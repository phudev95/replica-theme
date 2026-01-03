# Replica [![LICENSE MIT](https://img.shields.io/badge/LICENSE-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Github style replication for hexo theme.

#### Install

```
git clone git@github.com:phudev95/replica-theme.git themes/replica
```

Update the replica inside your blog

```
git submodule update --remote themes/replica
```

#### Configure

Set `theme: replica` in `_config.yml` (the one in your root folder)

**PLEASE NOTE**
Modifying `blog_root/themes/replica/_config.yml` directly is **NOT** recommended.
It's suggested to configure your site through `blog_root/_config.yml` **(root folder).**

Here is a sample of `blog_root/_config.yml`

<details>
<summary>CLICK ME</summary>
<p>

```yml
# Hexo Configuration
## Docs: http://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: My Blog
description: My Blog Description
author: HiiTea
language: zh-CN
timezone: Asia/Shanghai
favicon: https://assets-cdn.github.com/favicon.ico

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://sabrinaluo.com/tech
root: /tech/
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :year:month:day-:title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 0
pagination_dir: page

# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: replica

# Google Analytics
ga: # GA code UA-XXXXXXXX-X

#marked setting for markdown
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true

gcs: # GOOGLE CUSTOM SEARCH
baidutongji: # BAIDU TONGJI CODE
disqus: # DISQUS ID

location: Hong Kong
email: xx@example.com

logo:
avatar: https://avatars2.githubusercontent.com/u/5300359?v=4&s=460
social:
  facebook:
  github:
  twitter:
  linkedin:

# flagcounter
flagcounter_href: # https://info.flagcounter.com/xxxx
flagcounter_img_src: # https://s01.flagcounter.com/xxxx
```
