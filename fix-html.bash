#!/bin/bash

# TODO pass name of html file and output the fixed file as index.html
INPUT_FILENAME=$1

# navigation links
sed -E 's/(http:\/\/localhost:([0-9]+))\S+#/#/g' $INPUT_FILENAME >> $PWD/index-temp.html

# local file links
sed -E 's/http:\/\/localhost:([0-9]+)/./g' $PWD/index-temp.html >> $PWD/index-temp2.html

# append document declaration in first line
sed -i '' '1s/^/<!DOCTYPE <html>\'$'\n/' $PWD/index-temp2.html

sed -i '' 's/.\/PWA%20Wiki.html//g' $PWD/index-temp2.html

sed -i '' 's/PWA Wiki_files/pwa-wiki_files/g' $PWD/index-temp2.html

mv $PWD/index-temp2.html $PWD/src/index.html

rm $PWD/index-temp.html-E $PWD/index-temp.html $PWD/index-temp2.html



# sed -i -E 's/(http:\/\/localhost:[0-9]*).+(?=(?:#))//g' index.html
