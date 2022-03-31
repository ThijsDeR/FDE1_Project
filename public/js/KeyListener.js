/**
 * This class handles the keyboard events. It knows the last known state of its
 * keys
 *
 * Some parts of this class are pretty complex, but the class itself is fairly
 * easy to use. You just instantiate one object in your game and us the method
 * `isKeyDown()` to check if a specific key is currently pressed down by the
 * user.
 *
 * NOTE: It is known that the MouseEvent.keyCode property is deprecated, which
 * means that there will be a moment that this class will not work anymore.
 *
 * @author BugSlayer
 */
export default class KeyListener {
    /**
     * Constructs a new KeyListener.
     */
    constructor() {
        /**
         * Array that holds a boolean for each keycode. The keycode is the index of
         * the array and the boolean is the state of that key (`true` means that
         * the key is down).
         */
        this.keyCodeStates = new Array();
        // Register the arrow methods as listeners to keyevents
        // There is a third event ('keypress'), but we do not need to use it
        window.addEventListener('keydown', (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener('keyup', (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    /**
     * Returns `true` if and only if the last known state of the keyboard
     * reflects that the specified key is currently pressed.
     *
     * @param keyCode the keyCode to check
     * @returns `true` when the specified key is currently down
     */
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
// Some convenient key codes already defined here. If you need a specific
// keycode, see:https://keycode.info/
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
