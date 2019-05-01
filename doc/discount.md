# Generate Discount Code

## POST /discount/code

| Header | Value |
| - | - |
| Content-Type | application/json |

```
{
    "store": "paragon",
    "amount": 100
}
```

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 201 |
| Header.Content-Type | *should exist* |
| Data.code | *should exist* |

# Submit Discount Code

## GET /discount/abc123

| Header | Value |
| - | - |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImV4cCI6MTU1Njg5MDA0OCwiaWF0IjoxNTU2NzE3MjQ4fQ.OVK8Wy5aPZEfo_Fcibub3xu1p18u0z7BzPA0CkL6hKg |

## Expectation

Should be 401 because token was expire

| Assert | Expected |
| - | - |
| StatusCode | 401 |

# List Discount

## GET /discount

| Header | Value |
| - | - |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImV4cCI6MTU1Njg5MDA0OCwiaWF0IjoxNTU2NzE3MjQ4fQ.OVK8Wy5aPZEfo_Fcibub3xu1p18u0z7BzPA0CkL6hKg |

## Expectation

Should be 401 because token was expire

| Assert | Expected |
| - | - |
| StatusCode | 401 |