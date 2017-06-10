# API Documentations

## Object: `nejMocha`

```javascript
const nejMocha = require('nej-mocha');
```

### Method: 

```typescript
run(options: {
  config: string | ConfigurationObject
}, callback: (err: Error) => void);
```

#### Arguments: 

| Parameter Name | Type            | Description                                      | Required |
|:--------------:|-----------------|--------------------------------------------------|----------|
| options.config | String / Object | The path to the config file or the config object | **true** |
| callback | Function | The callback to run after the tests are done. You must explicitly exit the node process here. | **true** |

