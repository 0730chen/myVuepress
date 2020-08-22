
rm -rf dist

npm run docs:build

git add .

git commit -m "$*"

git push