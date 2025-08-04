# Code Citations

## License: desconocido

[Repositorio original](https://github.com/redbrick/docs-old/tree/4a534d24049a12d9e7a21bb3dc09bb1408c80ffd/docs/web/website.md)

```apache
<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-l
   RewriteRule . /index.html [L]
</IfModule>
```


## License: Apache_2_0
https://github.com/forpdi/plataforma-for/tree/c0aba6ef93edcb326eb202702419d1c637b1be11/README.md

```
.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteCond %{REQUEST_FILENAME} !-l
       RewriteRule . /index.html [L]
     </IfModule>
```

