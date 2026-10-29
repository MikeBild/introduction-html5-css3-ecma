# Semantic HTML

## DOCTYPE

```html
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hallo World!</title>
  </head>
  <body>
    <h1>Hallo World!</h1>
  </body>
</html>
```

## Semantic Tags

### Structure Elements

```html
<section>
<content>
<article>
<nav>
<header>
<footer>
<aside>
```

### More

```html
<figure><figcaption>
<mark>
<small>
<hgroup>
<time>
<code>
<dialog>
<address>
<details>
<summary>
```

## Application Markups

## Link Relations

## Data Attributes

```html
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <title>Datenspeicher und Links um Block-Elemente</title>
  </head>
  <body>
    <a href="#">
      <h1>Lorem Ipsum</h1>
      <p>
        Lorem ipsum dolor sit amet.
      </p>
    </a>
    <a id="track" href="#" data-length="2:02" data-band="Beatsteaks">
      Hello Joe
    </a>
    <script type="javascript">

    function getDataset(element) {
      var dataset = {};
      var attributes = elements.attributes;
      var attr;
      for(attr in attributes) {
        if(typeof attributes[attr] !== 'function') {
          var attribute = attributes[attr];
          var key;
          for(key in attribute) {
            if(key == 'name') {
              var matches = /^data-([a-z0-9]+)$/.exec(attribute[key]);
              if(matches && matches.length > 1) {
                dataset[matches[1]] = attribute['value'];
              }
            }
          }
        }
      }
      return dataset;
    }

    function setDataset(dataset, element) {
      var key;
      for(key in dataset) {
        element.setAttribute('data-'+key,dataset[key]);
      }
    }

    alert(getDataset(document.getElementById('track'));

    </script>
  </body>
</html>
```


## New Elements, e.g. for Forms
