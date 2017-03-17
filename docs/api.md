# maf-rest 0.x API


## Rest

## `constructor ([logger], [config])`

- `logger` - Logger. Optional. logger should have trace and debug methods
- `config` - Object. Optional

### config

```js
{
    strictResourceValidation: false,
    strictMethodValidation: false
}
```

## `addMethod (http, method)`

- `http`   - String|Object|Array|Regex. valid value for [express path](http://expressjs.com/ru/4x/api.html#path-examples)
- `method` - MethodObject


## `setEndpoint (endpoint)`

add endpoint info

- `endpoint` - Object|String

if endpoint is string - endpoint path will be setted

if endpoint is object

```js
{
    title: 'short api description',
    description: 'markdown description',
    endpoint: '/api/v0'
}
```



## `init (app)`
