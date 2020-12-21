# Gendiff

**Gendiff** is a program that determines the difference between two data structures.

Utility capabilities:

- support for different input formats: *yaml*, *json*;
- generating a report in *plain* text, *stylish* and *json*.
 
![Node CI](https://github.com/almax-21/gendiff-cli/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/dec3679a488b13a5f93c/maintainability)](https://codeclimate.com/github/almax-21/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dec3679a488b13a5f93c/test_coverage)](https://codeclimate.com/github/almax-21/frontend-project-lvl2/test_coverage)

### Requirements
Node.js v13.2.0 and more

### Installation
```sh
$ make install
$ sudo* npm link

* - optional
```

### Usage
```sh
$ gendiff [format] path1 path2
```

For more information use:
```sh
$ gendiff -h
```

### Usage example
```sh
# plain format
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### Stylish formatter asciinema
[![asciicast](https://asciinema.org/a/curveTNlAazevfUDe98E9MsNI.svg)](https://asciinema.org/a/curveTNlAazevfUDe98E9MsNI)

### Plain formatter asciinema
[![asciicast](https://asciinema.org/a/LO8XwUJouj2FDefVJkjXS3vXV.svg)](https://asciinema.org/a/LO8XwUJouj2FDefVJkjXS3vXV)

### Json formatter asciinema
[![asciicast](https://asciinema.org/a/brVLDKLI8b4LKz45gkGwtDnNf.svg)](https://asciinema.org/a/brVLDKLI8b4LKz45gkGwtDnNf)