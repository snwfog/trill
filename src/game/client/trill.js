module.exports  = {

  State:{
    InGame: require('state/inGameState.js'),
    Boot: require('state/bootState.js'),
    Menu: require('state/menuState.js'),
    Create : require('state/create.js')
  },
  WebApi: require('webapi.js')
};
