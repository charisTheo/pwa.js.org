#!/bin/bash

# ? pass name of html file and output the fixed file as index.html
INPUT_FILENAME=$1

# ? navigation links
sed -E 's/(http:\/\/localhost:([0-9]+))\S+#/#/g' $INPUT_FILENAME >> $PWD/index-temp.html

# ? local file links
sed -E 's/http:\/\/localhost:([0-9]+)/./g' $PWD/index-temp.html >> $PWD/index-temp2.html

# ? append document declaration in first line
sed -i '' '1s/^/<!DOCTYPE <html>\'$'\n/' $PWD/index-temp2.html

sed -i '' 's/.\/PWA%20Wiki.html//g' $PWD/index-temp2.html

# ? Fix files urls
sed -i '' 's/PWA Wiki_files/pwa-wiki_files/g' $PWD/index-temp2.html

# ? override files into workspace
if [ -d ~/Desktop/pwa-wiki_files/ ]; then 
    rm -f $PWD/src/pwa-wiki_files/*
    cp ~/Desktop/pwa-wiki_files/* $PWD/src/pwa-wiki_files/
else
    echo -e "⚠️ ~/Desktop/pwa-wiki_files/ directory was not found!\n❗️ If needed to update dependency files, manually copy files into 👉 $PWD/src/pwa-wiki_files/\n"
fi

mv $PWD/index-temp2.html $PWD/src/index.html

if [ -f $PWD/index-temp.html-E ]; then
    rm $PWD/index-temp.html-E
fi

rm $PWD/index-temp.html

echo "All done! 👍"
