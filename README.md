# Respoke.js distribution repo

This repo exists to support [Bower](http://bower.io) by providing a pre-built
version of Respoke.js. The full documentation and source can be see at the real
[Respoke.js repo](https://github.com/respoke/respoke).

## Usage

```sh
bower install --save respoke
```

This will provide a global variable `respoke` when included in your HTML files.

```html
<script type="text/javascript" src="/components/respoke/respoke.min.js"></script>
<script type="text/javascript">
    var client = respoke.createClient({
        appId: '<your-app-id>'
    });
</script>
```
