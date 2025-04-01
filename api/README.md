# API Documentation

### getOrderTrackingStatus

There are four types of order statuses, as defined in the React component: `Preparing`, `Collecting`, `Awaiting`, and `Completed`.

| Status       | Verbose Fields Given                                                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Preparing`  | `placed_time` => Timestamp of when the order was submitted to the system by the customer.                                                                                                           |
| `Collecting` | `assignment_time` => Timestamp of when the order was submitted to a dasher, `accepted_by` String representation of the first name/nickname of the assigned dasher. (+ all fields previously listed) |
| `Awaiting`   | `fufillment_time` => Timestamp of when the order was completed by the dasher. (+ all fields previously listed)                                                                                      |
| `Completed`  | `pickup_time` => Timestamp of when the handoff between the dasher and the customer was completed. (+ all fields previously listed)                                                                  |
