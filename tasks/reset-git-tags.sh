echo 'Removing all tags at origin...'
git fetch; git push origin --delete $(git tag -l);

echo 'Removing all tags locally...'
git tag -d $(git tag -l);

echo 'Adding tags locally (from second commit)...'
n=-1;
git rev-list --reverse HEAD | while read commit;
do ((n++));
  if [ $n -gt 0 ];
    then git tag -a "v-misja-$((n-1))" -m "Tagging commit $commit" $commit;
  fi;
done

echo 'Pushing tags...'
git push --tags
