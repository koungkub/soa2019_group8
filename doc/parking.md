# Entrance to Parking

## GET /parking/entrance/1990

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 201 |
| Header.Authorization | *should exist* |

# Get Time 

## GET /parking

| Header | Value |
| - | - |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImV4cCI6MTU1Njg5MDA0OCwiaWF0IjoxNTU2NzE3MjQ4fQ.OVK8Wy5aPZEfo_Fcibub3xu1p18u0z7BzPA0CkL6hKg |

## Expectation

Shout be 401 because token was expire

| Assert | Expected |
| - | - |
| StatusCode | 401 |

# Exit from Parking

## GET /parking/exit

| Header | Value |
| - | - |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImV4cCI6MTU1Njg5MDA0OCwiaWF0IjoxNTU2NzE3MjQ4fQ.OVK8Wy5aPZEfo_Fcibub3xu1p18u0z7BzPA0CkL6hKg |

## Expectation

Should be 401 because token was expire

| Assert | Expected |
| - | - |
| StatusCode | 401 |