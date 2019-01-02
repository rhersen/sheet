install:	rm -R dist* && yarn build && tar cf dist.tar dist && gzip dist.tar && scp dist.tar.gz rudolf@linode.hersen.name:/opt/nginx/secure/
