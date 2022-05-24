import { createSlice } from '@reduxjs/toolkit';
import { Animations, PlayerJumpCooldown, PlayerJumpSpeed, PlayerMovePrecision, PlayerSpeed } from '../../common/constant';

export const PlayerSlice = createSlice({
    name: 'player',
    initialState: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        model: '',
        id: '',
        currentAnimation: Animations.Idle,
        speed: PlayerSpeed,
        jumpSpeed: PlayerJumpSpeed,
        jumpCoolDown: PlayerJumpCooldown,
        sprinting: false,
        jumping: false,
        timeToJump: 0,
    },
    reducers: {
        initPlayer: (state, action) => {
            state.id = action.payload.id;
            if (action.payload.position) state.position = action.payload.position;
            if (action.payload.rotation) state.rotation = action.payload.rotation;
            if (action.payload.model) state.model = action.payload.model;
        },
        setPlayerPosition: (state, action) => {
            if (
                Math.round(action.payload.position.x * PlayerMovePrecision) / PlayerMovePrecision !==
                    Math.round(state.position.x * PlayerMovePrecision) / PlayerMovePrecision ||
                Math.round(action.payload.position.y * PlayerMovePrecision) / PlayerMovePrecision !==
                    Math.round(state.position.y * PlayerMovePrecision) / PlayerMovePrecision ||
                Math.round(action.payload.position.z * PlayerMovePrecision) / PlayerMovePrecision !==
                    Math.round(state.position.z * PlayerMovePrecision) / PlayerMovePrecision
            ) {
                state.position.x = action.payload.position.x;
                state.position.y = action.payload.position.y;
                state.position.z = action.payload.position.z;
            }
        },
        setPlayerRotation: (state, action) => {
            if (
                action.payload.rotation.x !== state.rotation.x ||
                action.payload.rotation.y !== state.rotation.y ||
                action.payload.rotation.z !== state.rotation.z
            ) {
                state.rotation.x = action.payload.rotation.x;
                state.rotation.y = action.payload.rotation.y;
                state.rotation.z = action.payload.rotation.z;
            }
        },
        setPlayerModel: (state, action) => {
            state.model = action.payload;
        },
        setPlayerCurrentAnimation: (state, action) => {
            if (action.payload !== state.currentAnimation) state.currentAnimation = action.payload;
        },
        setPlayerSprinting: (state, action) => {
            state.sprinting = action.payload;
        },
        setPlayerSpeed: (state, action) => {
            state.speed = action.payload;
        },
        setPlayerJumping: (state, action) => {
            state.jumping = action.payload;
        },
        playerJump: (state, action) => {
            state.timeToJump = action.payload + state.jumpCoolDown;
            state.jumping = true;
        },
    },
});

export const {
    initPlayer,
    setPlayerPosition,
    setPlayerRotation,
    setPlayerModel,
    setPlayerCurrentAnimation,
    setPlayerSprinting,
    setPlayerJumping,
    setPlayerSpeed,
    playerJump,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
