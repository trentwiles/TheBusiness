# The Business

### Current Bugs

* Double logout issue: failed logout message is produced after a successful logout, leading to a total of two messages
* Ensure that less than 5 orders are displayed on the `OrderGrid` page, if more, use a button to "expand"
* Dasher Queue page: user is `undefined` on first render, yet on second render it is defined!