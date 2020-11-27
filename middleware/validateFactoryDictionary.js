

const googleVerifier= require('../VerifierFactory/VerifyGoogleToken')
const facebookVerifier= require('../VerifierFactory/VerifyFacebookToken')

const factory ={
    'google':googleVerifier,
    'facebook':facebookVerifier
}

const validateFactoryDictionary= async (providerName, credentials)=>{
  
    return await factory[providerName](credentials);
}

module.exports=validateFactoryDictionary
