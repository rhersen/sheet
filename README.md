rm -R dist* && npx parcel build --public-url '.' index.html && tar cf dist.tar dist && gzip dist.tar && scp dist.tar.gz rudolf@linode.hersen.name:/opt/nginx/secure/
