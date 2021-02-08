const OpenTimestamps = require('opentimestamps');

const file = Buffer.from('5468652074696d657374616d70206f6e20746869732066696c6520697320696e636f6d706c6574652c20616e642063616e2062652075706772616465642e0a','hex');
const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(new OpenTimestamps.Ops.OpSHA256(), file);
OpenTimestamps.stamp(detached).then( ()=>{
  const fileOts = detached.serializeToBytes();

  console.log("verify");
  const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(fileOts);
  let options = {};
  // options.ignoreBitcoinNode - Ignore verification with bitcoin node 
  options.ignoreBitcoinNode = true;
  // options.timeout - Adjust the request timeout (default: 1000) 
  options.timeout = 5000;
  OpenTimestamps.verify(detachedOts,detached,options).then(verifyResult => {
    // return an object containing timestamp and height for every attestation if verified, undefined otherwise.
    console.log(verifyResult);
    // prints:
    // { bitcoin: { timestamp: 1521545768, height: 514371 },
    //   litecoin: { timestamp: 1521540398, height: 1388467 } }
  
  });

});

const infoResult = OpenTimestamps.info(detached);
console.log(infoResult);