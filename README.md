## ORM Pagination Helper Plugin [![](https://badge.fury.io/js/orm-paging.png)](https://npmjs.org/package/orm-paging)

This plugin adds a pagination helper function for [ORM](http://dresende.github.io/node-orm2).

This fork only returns promises. No callback support. Only ES6+

## Dependencies

Of course you need `orm` to use it. Other than that, no more dependencies.

## Install

```sh
npm install orm-paging
```

## DBMS Support

Any driver supported by ORM is supported by this plugin.

## Usage

```js
Model.pages([conditions, ])   // total pages
Model.page([conditions, ],page)  // get page
```

## Example

```js
var orm = require("orm");
var paging = require("orm-paging");

orm.connect("mysql://username:password@host/database", async function (err, db) {
	if (err) throw err;

	db.use(paging);

	let Person = db.define("person", {
		name      : String,
		surname   : String,
		age       : Number
	});
	Person.settings.set("pagination.perpage", 10); // default is 20

	let pages = await Person.pages();
	console.log("Total pages: %d", pages);
    
    let people = await Person.page(3);
	
    let pagesWithCondition = await Person.pages({age: orm.gt(3)});
	console.log("Total pages: %d", pagesWithCondition);
	let people = await Person.page({age: orm.gt(3)},3);
	
});
```

