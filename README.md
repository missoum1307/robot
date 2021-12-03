# control program for a robot. 

The robot is located in a two-dimensional room, and moves around by parsing a string of commands using the following syntax:

- `L` - Turn left
- `R` - Turn right
- `F` - Move forward

_Example string: `LFFRFRFRFF`_

for the robot to run, you first need to specify the size of the room, set the commands, set the start position (coordinates) and the direction it is facing when it start.
the little robot will run and report what square it's located at the end position (coordinates) and what direction it's facing.
test the robot with the following commands, or any other commands to ensure it correctly computes coordinates:

| Size  | Instructions | Start Position | End Position |
| ----- | ------------ | -------------- | ------------ |
| `5x5` | `RFRFFRFRF`  | `(1, 2, N)`    | `(1, 1, N)`  |
| `5x5` | `FFLFLFFFRF` | `(0, 2, S)`    | `(2, 3, E)`  |
| `7x7` | `FFLFFRFFLF` | `(6, 5, W)`    | `(2, 2, S)`  |
