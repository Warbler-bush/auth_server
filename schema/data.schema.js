const schemaDataPatch = {
    body: {
      type: 'object',
      properties: {
        'data': {type: "string"}    
    },
      required: ['data']
    }
  }

const schemaDataPost = {
    body: {
      type: 'object',
      properties: {
        'key' : {type: "string"},
        'data': {type: "string"}    
    },
      required: ['key','data']
    }
  }

  module.exports = {schemaDataPost, schemaDataPatch}