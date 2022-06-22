import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
export default class CyclingPathFriendOncoming extends Situation {
    constructor(canvas, userData, playerData, upgrades) {
        super(canvas, userData, playerData, upgrades);
        // Situation background properties
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/Polderweg.png');
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getWidth() * 1.15;
        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getWidth() * 1.277;
        // Create player
        this.player = this.createPlayer();
        // Create possible scenarios
        // Friend
        const friendPossibilities = [];
        Game.randomInteger(0, 1) === 0
            ? friendPossibilities.push(
            // Letting you get behind them by speeding up
            {
                // Default driving speed
                // Starting position
                xPos1: (this.background.getWidth() * 1.23),
                yPos1: (this.background.getYPos() / 10 + (this.background.getHeight() / 10)),
                // Target position
                xPos2: (this.background.getWidth() * 1.23),
                yPos2: (this.background.getYPos() / 2 + (this.background.getHeight() / 10)),
                // Velocities between start and target position
                xVel: 0,
                yVel: -Player.MAX_SPEED / 4
            }, {
                // Speeding up to about 1.5x player length
                // Starting position
                xPos1: (this.background.getWidth() * 1.23),
                yPos1: (this.background.getYPos() / 2 + (this.background.getHeight() / 10)),
                // Target position
                xPos2: (this.background.getWidth() * 1.23),
                yPos2: (this.background.getYPos() + (this.background.getHeight() / 10)),
                // Velocities between start and target position
                xVel: 0,
                yVel: -Player.MAX_SPEED / 2
            }, {
                // Resuming normal speed once distance is acquired
                // Starting position
                xPos1: (this.background.getWidth() * 1.23),
                yPos1: (this.background.getYPos() + (this.background.getHeight() / 10)),
                // Target position
                xPos2: (this.background.getWidth() * 1.23),
                yPos2: (this.background.getYPos() * 1.5 + (this.background.getHeight() / 10)),
                // Velocities between start and target position
                xVel: 0,
                yVel: -Player.MAX_SPEED / 4
            }, {
                // Going off canvas once situation is over
                // Starting position
                xPos1: (this.background.getWidth() * 1.23),
                yPos1: (this.background.getYPos() * 1.5 + (this.background.getHeight() / 10)),
                // Target position
                xPos2: (this.background.getWidth() * 1.23),
                yPos2: (this.background.getYPos() * 20 + (this.background.getHeight() / 10)),
                // Velocities between start and target position
                xVel: 0,
                yVel: -Player.MAX_SPEED * 1.5
            }) : friendPossibilities.push(
        // Letting you get in front by slowing down
        {
            // Default driving speed
            // Starting position
            xPos1: (this.background.getWidth() * 1.23),
            yPos1: (this.background.getYPos() / 10 + (this.background.getHeight() / 10)),
            // Target position
            xPos2: (this.background.getWidth() * 1.23),
            yPos2: (this.background.getYPos() / 2 + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: 0,
            yVel: -Player.MAX_SPEED / 4
        }, {
            // Slowing down for the player
            // Starting position
            xPos1: (this.background.getWidth() * 1.23),
            yPos1: (this.background.getYPos() / 2 + (this.background.getHeight() / 10)),
            // Target position
            xPos2: (this.background.getWidth() * 1.23),
            yPos2: (this.background.getYPos() + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: 0,
            yVel: -Player.MAX_SPEED / 60
        }
        // No additional movement changes are needed, as friend goes off-screen here
        );
        // Oncoming cyclist (The one in your lane)
        const oncomingDynamicPossibilities = [];
        Game.randomInteger(0, 1) === 0
            ? oncomingDynamicPossibilities.push(
            // Not moving from their position
            {
                // Spawn location
                xPos1: (this.background.getWidth() * 1.117),
                yPos1: (this.background.getYPos() * 1.7 + (this.background.getHeight() / 10)),
                // Target location
                xPos2: (this.background.getWidth() * 1.117),
                yPos2: (this.background.getYPos() / 20 + (this.background.getHeight() / 10)),
                // Velocities between start and target position
                xVel: 0,
                yVel: Player.MAX_SPEED / 4
            }
            // No additional movement changes, as they do not move
            ) : oncomingDynamicPossibilities.push(
        // Moving behind partner to give you space
        {
            // Moving alongside partner
            // Spawn location
            xPos1: (this.background.getWidth() * 1.117),
            yPos1: (this.background.getYPos() * 1.7 + (this.background.getHeight() / 10)),
            // Target location
            xPos2: (this.background.getWidth() * 1.117),
            yPos2: (this.background.getYPos() / 0.8 + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: 0,
            yVel: Player.MAX_SPEED / 4
        }, {
            // Creating distance to pull behind
            // Starting location
            xPos1: (this.background.getWidth() * 1.117),
            yPos1: (this.background.getYPos() / 0.8 + (this.background.getHeight() / 10)),
            // Target location
            xPos2: (this.background.getWidth() * 1.117),
            yPos2: (this.background.getYPos() / 0.82 + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: 0,
            yVel: Player.MAX_SPEED / 30
        }, {
            // Continuing behind static cyclist
            // Starting location
            xPos1: (this.background.getWidth() * 1.117),
            yPos1: (this.background.getYPos() / 0.82 + (this.background.getHeight() / 10)),
            // Target location
            xPos2: (this.background.getWidth() * 1.005),
            yPos2: (this.background.getYPos() / 0.82 + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: -0.1,
            yVel: Player.MAX_SPEED / 4
        });
        // Static cyclist on the far left
        const oncomingStatic = [];
        oncomingStatic.push({
            // Spawn location
            xPos1: (this.background.getWidth() * 1.005),
            yPos1: (this.background.getYPos() * 1.7 + (this.background.getHeight() / 10)),
            // Target location
            xPos2: (this.background.getWidth() * 1.005),
            yPos2: (this.background.getYPos() / 20 + (this.background.getHeight() / 10)),
            // Velocities between start and target position
            xVel: 0,
            yVel: Player.MAX_SPEED / 4
        });
        // Create props in situation
        this.props = [
            // Create cyclists
            // Friend
            new TrackProp(friendPossibilities, this.background.getWidth() / 20, this.background.getHeight() / 8, './assets/img/players/fiets1.png'),
            // Oncoming static
            new TrackProp(oncomingStatic, this.background.getWidth() / 20, this.background.getHeight() / 8, './assets/img/players/fiets1.png'),
            // Oncoming dynamic
            new TrackProp(oncomingDynamicPossibilities, this.background.getWidth() / 20, this.background.getHeight() / 8, './assets/img/players/fiets1.png'),
            // Create stamina boost
            new Frikandelbroodje(this.background.getWidth() * 1.13, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
    }
}
