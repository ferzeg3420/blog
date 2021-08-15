#!/bin/sh

recreate_index() {
    date="$(date "+%Y-%m-%d")"
    printf "%s\ntitle: All Posts So Far\n---\n\n---\ndate: ${date}\n---\n\n" \
        "---" > ./source/index.md
    for i in ./source/*.md
    do
        if test "${i}" = "./source/index.md" || \
           test "${i}" = "./source/template.md"
        then
            continue
        fi
        title="$(grep "^title:.*" "${i}"      \
                  | head -1                   \
                  | sed "s/title://"          \
                  | sed "s/^[[:space:]]*//"   \
                  | sed "s/[[:space:]]*$//")"  

        filename="$(basename "$i" .md)"
        link="./${filename}.html"
        echo "1. [${title}](${link})" >> ./source/index.md
    done
}

build_from_sources() {
    for i in ./source/*.md
    do
        if test "${i}" = "./source/template.md"
        then
            continue
        fi
        filename="$(basename "$i" .md)"
        pandoc -s "$i" -o "blog/${filename}.html" --template \
            ./public/blogTemplate.html
    done
}

recreate_index
build_from_sources
