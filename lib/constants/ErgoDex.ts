export const ErgoDexContractTemplates: Map<string, string> = new Map([
  // N2T
  [
    "d802d601b2a4730000d6027301eb027302d195ed92b1a4730393b1db630872017304d80bd603db63087201d604b2a5730500d605b27203730600d6067e9973078c72050206d6077ec1720106d6089d9c7e72020672067207d609b27203730800d60a7e8c72090206d60b9d9c7e7309067206720ad60cdb63087204d60db2720c730a00ededededed938cb27203730b0001730c93c27204730d95ed8f7208720b93b1720c730ed801d60eb2720c730f00eded92c1720499c1a77310938c720e018c720901927e8c720e02069d9c99720b7208720a720695927208720b927ec1720406997ec1a706997e7202069d9c997208720b720772067311938c720d018c720501927e8c720d0206a17208720b90b0ada5d9010e639593c2720e7312c1720e73137314d9010e599a8c720e018c720e0273157316",
    "N2T Deposit V3",
  ],
  [
    "d803d6017300d602b2a4730100d6037302eb027201d195ed92b1a4730393b1db630872027304d80bd604db63087202d605b2a5730500d606b27204730600d6077e9973078c72060206d6087ec1720206d6099d9c7e72030672077208d60ab27204730800d60b7e8c720a0206d60c9d9c7e8cb2db6308a773090002067207720bd60ddb63087205d60eb2720d730a00ededededed938cb27204730b0001730c93c27205d0720195ed8f7209720c93b1720d730dd801d60fb2720d730e00eded92c172059999c1a7730f7310938c720f018c720a01927e8c720f02069d9c99720c7209720b720795927209720c927ec1720506997e99c1a7731106997e7203069d9c997209720c720872077312938c720e018c720601927e8c720e0206a17209720c90b0ada5d9010f639593c2720f7313c1720f73147315d9010f599a8c720f018c720f0273167317",
    "N2T Deposit V1",
  ],
  [
    "d803d6017300d602b2a4730100d6037302eb027201d195ed93b1a4730393b1db630872027304d80bd604db63087202d605b2a5730500d606b27204730600d6077e9973078c72060206d6087ec1720206d6099d9c7e72030672077208d60ab27204730800d60b7e8c720a0206d60c9d9c7e8cb2db6308a773090002067207720bd60ddb63087205d60eb2720d730a00edededed938cb27204730b0001730c93c27205d0720195ed8f7209720c93b1720d730dd801d60fb2720d730e00eded92c172059999c1a7730f7310938c720f018c720a01927e8c720f02069d9c99720c7209720b720795927209720c927ec1720506997e99c1a7731106997e7203069d9c997209720c720872077312938c720e018c720601927e8c720e0206a17209720c7313",
    "N2T Deposit V1 (legacy)",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed93b1a4730293b1db630872027303d805d603db63087202d604b2a5730400d605b2db63087204730500d606b27203730600d6077e9973078c72060206edededed938cb2720373080001730993c27204d0720192c172049999c1a7730a730b938c7205018c720601927e8c72050206a19d9c7e730c0672077ec17202069d9c7e8cb2db6308a7730d00020672077e8cb27203730e000206730f",
    "N2T Deposit V0 (legacy)",
  ],
  [
    "d801d601b2a4730000eb027301d195ed92b1a4730293b1db630872017303d806d602db63087201d603b2a5730400d604b2db63087203730500d605b27202730600d6067e8cb2db6308a77307000206d6077e9973088cb272027309000206ededededed938cb27202730a0001730b93c27203730c938c7204018c720501927e99c17203c1a7069d9c72067ec17201067207927e8c720402069d9c72067e8c72050206720790b0ada5d90108639593c27208730dc17208730e730fd90108599a8c7208018c72080273107311",
    "N2T Redeem V3",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed92b1a4730293b1db630872027303d806d603db63087202d604b2a5730400d605b2db63087204730500d606b27203730600d6077e8cb2db6308a77307000206d6087e9973088cb272037309000206ededededed938cb27203730a0001730b93c27204d07201938c7205018c720601927e9a99c17204c1a7730c069d9c72077ec17202067208927e8c720502069d9c72077e8c72060206720890b0ada5d90109639593c27209730dc17209730e730fd90109599a8c7209018c72090273107311",
    "N2T Redeem V1",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed93b1a4730293b1db630872027303d806d603db63087202d604b2a5730400d605b2db63087204730500d606b27203730600d6077e8cb2db6308a77307000206d6087e9973088cb272037309000206edededed938cb27203730a0001730b93c27204d07201938c7205018c720601927e9a99c17204c1a7730c069d9c72077ec17202067208927e8c720502069d9c72077e8c720602067208730d",
    "N2T Redeem V0 (legacy)",
  ],
  [
    "d804d601b2a4730000d6027301d6037302d6049c73037e730405eb027305d195ed92b1a4730693b1db630872017307d806d605db63087201d606b2a5730800d607db63087206d608b27207730900d6098c720802d60a95730a9d9c7e997209730b067e7202067e7203067e720906edededededed938cb27205730c0001730d93c27206730e938c720801730f92720a7e7310069573117312d801d60b997e7313069d9c720a7e7203067e72020695ed91720b731492b172077315d801d60cb27207731600ed938c720c017317927e8c720c0206720b7318909c7e8cb2720573190002067e7204069c9a720a731a9a9c7ec17201067e731b067e72040690b0ada5d9010b639593c2720b731cc1720b731d731ed9010b599a8c720b018c720b02731f7320",
    "N2T Swap Sell V3",
  ],
  [
    "d803d6017300d602b2a4730100d6037302eb027201d195ed92b1a4730393b1db630872027304d804d604db63087202d605b2a5730500d606b2db63087205730600d6077e8c72060206edededededed938cb2720473070001730893c27205d07201938c72060173099272077e730a06927ec172050699997ec1a7069d9c72077e730b067e730c067e720306909c9c7e8cb27204730d0002067e7203067e730e069c9a7207730f9a9c7ec17202067e7310067e9c73117e7312050690b0ada5d90108639593c272087313c1720873147315d90108599a8c7208018c72080273167317",
    "N2T Swap Sell V1",
  ],
  [
    "d802d601b2a4730000d6029c73017e730205eb027303d195ed92b1a4730493b1db630872017305d804d603db63087201d604b2a5730600d60599c17204c1a7d606997e7307069d9c7e7205067e7308067e730906ededededed938cb27203730a0001730b93c27204730c927205730d95917206730ed801d607b2db63087204730f00ed938c7207017310927e8c7207020672067311909c7ec17201067e7202069c7e9a72057312069a9c7e8cb2720373130002067e7314067e72020690b0ada5d90107639593c272077315c1720773167317d90107599a8c7207018c72070273187319",
    "N2T Swap Buy V3",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed92b1a4730293b1db630872027303d804d603db63087202d604b2a5730400d6059d9c7e99c17204c1a7067e7305067e730606d6068cb2db6308a773070002edededed938cb2720373080001730993c27204d072019272057e730a06909c9c7ec17202067e7206067e730b069c9a7205730c9a9c7e8cb27203730d0002067e730e067e9c72067e730f050690b0ada5d90107639593c272077310c1720773117312d90107599a8c7207018c72070273137314",
    "N2T Swap Buy V1",
  ],
  [
    "d802d601b2a4730000d6027301d1ec730295ed93b1a4730393b1db630872017304d804d603db63087201d604b2a5730500d605b2db63087204730600d6067e8c72050206edededededed938cb2720373070001730893c272047309938c720501730a9272067e730b06927ec172040699997ec1a7069d9c72067e730c067e730d067202909c9c7e8cb27203730e00020672027e730f069c9a720673109a9c7ec17201067e7311067e9c73127e7313050690b0ada5d90107639593c272077314c1720773157316d90107599a8c7207018c72070273177318",
    "N2T Swap Sell Multiaddress V2",
  ],
  [
    "d801d601b2a4730000d1ec730195ed93b1a4730293b1db630872017303d804d602db63087201d603b2a5730400d6049d9c7e99c17203c1a7067e7305067e730606d6058cb2db6308a773070002edededed938cb2720273080001730993c27203730a9272047e730b06909c9c7ec17201067e7205067e730c069c9a7204730d9a9c7e8cb27202730e0002067e730f067e9c72057e7310050690b0ada5d90106639593c272067311c1720673127313d90106599a8c7206018c72060273147315",
    "N2T Swap Buy MultiAddress V2",
  ],
  [
    "d803d6017300d602b2a4730100d6037302eb027201d195ed93b1a4730393b1db630872027304d804d604db63087202d605b2a5730500d606b2db63087205730600d6077e8c72060206ededededed938cb2720473070001730893c27205d07201938c72060173099272077e730a06927ec172050699997ec1a7069d9c72077e730b067e730c067e720306909c9c7e8cb27204730d0002067e7203067e730e069c9a7207730f9a9c7ec17202067e7310067e9c73117e731205067313",
    "N2T Swap Sell V0 (legacy)",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed93b1a4730293b1db630872027303d804d603db63087202d604b2a5730400d6059d9c7e99c17204c1a7067e7305067e730606d6068cb2db6308a773070002ededed938cb2720373080001730993c27204d072019272057e730a06909c9c7ec17202067e7206067e730b069c9a7205730c9a9c7e8cb27203730d0002067e730e067e9c72067e730f05067310",
    "N2T Swap Buy V0 (legacy)",
  ],
  // T2T
  [
    "d801d601b2a4730000eb027301d195ed92b1a4730293b1db630872017303d80cd602db63087201d603b2a5730400d604b27202730500d6057e9973068c72040206d606b27202730700d6077e8c72060206d6089d9c7e73080672057207d609b27202730900d60a7e8c72090206d60b9d9c7e730a067205720ad60cdb63087203d60db2720c730b00edededededed938cb27202730c0001730d93c27203730e92c17203c1a795ed8f7208720b93b1720c730fd801d60eb2720c731000ed938c720e018c720901927e8c720e02069d9c99720b7208720a720595ed917208720b93b1720c7311d801d60eb2720c731200ed938c720e018c720601927e8c720e02069d9c997208720b7207720595937208720b73137314938c720d018c720401927e8c720d0206a17208720b90b0ada5d9010e639593c2720e7315c1720e73167317d9010e599a8c720e018c720e0273187319",
    "T2T Deposit V3",
  ],
  [
    "d803d6017300d602b2a4730100d603db6308a7eb027201d195ed92b1a4730293b1db630872027303d80cd604db63087202d605b2a5730400d606b27204730500d6077e9973068c72060206d608b27204730700d6097e8c72080206d60a9d9c7e8cb27203730800020672077209d60bb27204730900d60c7e8c720b0206d60d9d9c7e8cb27203730a0002067207720cd60edb63087205d60fb2720e730b00edededededed93b27204730c008602730d730e93c27205d0720192c1720599c1a7730f95ed8f720a720d93b1720e7310d801d610b2720e731100ed938c7210018c720b01927e8c721002069d9c99720d720a720c720795ed91720a720d93b1720e7312d801d610b2720e731300ed938c7210018c720801927e8c721002069d9c99720a720d720972079593720a720d73147315938c720f018c720601927e8c720f0206a1720a720d90b0ada5d90110639593c272107316c1721073177318d90110599a8c7210018c7210027319731a",
    "T2T Deposit V1",
  ],
  [
    "d803d6017300d602b2a4730100d603db6308a7eb027201d195ed93b1a4730293b1db630872027303d80cd604db63087202d605b2a5730400d606b27204730500d6077e9973068c72060206d608b27204730700d6097e8c72080206d60a9d9c7e8cb27203730800020672077209d60bb27204730900d60c7e8c720b0206d60d9d9c7e8cb27203730a0002067207720cd60edb63087205d60fb2720e730b00ededededed93b27204730c008602730d730e93c27205d0720192c1720599c1a7730f95ed8f720a720d93b1720e7310d801d610b2720e731100ed938c7210018c720b01927e8c721002069d9c99720d720a720c720795ed91720a720d93b1720e7312d801d610b2720e731300ed938c7210018c720801927e8c721002069d9c99720a720d720972079593720a720d73147315938c720f018c720601927e8c720f0206a1720a720d7316",
    "T2T Deposit V1 (legacy)",
  ],
  [
    "d803d6017300d602b2a4730100d603db6308a7eb027201d195ed93b1a4730293b1db630872027303d805d604db63087202d605b2a5730400d606b2db63087205730500d607b27204730600d6087e9973078c72070206edededed93b2720473080086027309730a93c27205d0720192c1720599c1a7730b938c7206018c720701927e8c72060206a19d9c7e8cb27203730c00020672087e8cb27204730d0002069d9c7e8cb27203730e00020672087e8cb27204730f0002067310",
    "T2T Deposit V0 (legacy)",
  ],
  [
    "d801d601b2a4730000eb027301d195ed92b1a4730293b1db630872017303d809d602db63087201d603b2a5730400d604db63087203d605b27204730500d606b27202730600d607b27204730700d608b27202730800d6097e8cb2db6308a77309000206d60a7e99730a8cb27202730b000206edededededed938cb27202730c0001730d93c27203730e938c7205018c720601938c7207018c720801927e8c720502069d9c72097e8c72060206720a927e8c720702069d9c72097e8c72080206720a90b0ada5d9010b639593c2720b730fc1720b73107311d9010b599a8c720b018c720b0273127313",
    "T2T Redeem V3",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed92b1a4730293b1db630872027303d809d603db63087202d604b2a5730400d605db63087204d606b27205730500d607b27203730600d608b27205730700d609b27203730800d60a7e8cb2db6308a77309000206d60b7e99730a8cb27203730b000206ededededededed93b27203730c008602730d730e93c27204d0720192c1720499c1a7730f938c7206018c720701938c7208018c720901927e8c720602069d9c720a7e8c72070206720b927e8c720802069d9c720a7e8c72090206720b90b0ada5d9010c639593c2720c7310c1720c73117312d9010c599a8c720c018c720c0273137314",
    "T2T Redeem V1",
  ],
  [
    "d802d6017300d602b2a4730100eb027201d195ed93b1a4730293b1db630872027303d809d603db63087202d604b2a5730400d605db63087204d606b27205730500d607b27203730600d608b27205730700d609b27203730800d60a7e8cb2db6308a77309000206d60b7e99730a8cb27203730b000206edededededed93b27203730c008602730d730e93c27204d0720192c1720499c1a7730f938c7206018c720701938c7208018c720901927e8c720602069d9c720a7e8c72070206720b927e8c720802069d9c720a7e8c72090206720b7310",
    "T2T Redeem V0 (legacy)",
  ],
  [
    "d805d601b2a4730000d6027301d6037302d6049c73037e730405d6057305eb027306d195ed92b1a4730793b1db630872017308d80ad606db63087201d607b2a5730900d608db63087207d609b27208730a00d60a8c720902d60b95730b9d9c7e99720a730c067e7203067e730d067e720a06d60cb27206730e00d60d7e8c720c0206d60e7e8cb27206730f000206d60f9a720b7310ededededededed938cb2720673110001731293c272077313938c720901720292720a731492c17207c1a79573157316d801d610997e7317069d9c720b7e7318067e72030695ed917210731992b17208731ad801d611b27208731b00ed938c721101731c927e8c721102067210731d95938c720c017202909c720d7e7204069c720f9a9c720e7e7205067e720406909c720e7e7204069c720f9a9c720d7e7205067e72040690b0ada5d90110639593c27210731ec17210731f7320d90110599a8c7210018c72100273217322",
    "T2T Swap V3",
  ],
  [
    "d805d6017300d602b2a4730100d6037302d6047303d6057304eb027201d195ed92b1a4730593b1db630872027306d80ad606db63087202d607b2a5730700d608b2db63087207730800d6098c720802d60a7e720906d60bb27206730900d60c7e8c720b0206d60d7e8cb2db6308a7730a000206d60e7e8cb27206730b000206d60f9a720a730cedededededed938cb27206730d0001730e93c27207d07201938c7208017203927209730f927ec1720706997ec1a7069d9c720a7e7310067e73110695938c720b017203909c9c720c720d7e7204069c720f9a9c720e7e7205069c720d7e720406909c9c720e720d7e7204069c720f9a9c720c7e7205069c720d7e72040690b0ada5d90110639593c272107312c1721073137314d90110599a8c7210018c72100273157316",
    "T2T Swap V1",
  ],
  [
    "d804d601b2a4730000d6027301d6037302d6047303d1ec730495ed93b1a4730593b1db630872017306d80ad605db63087201d606b2a5730700d607b2db63087206730800d6088c720702d6097e720806d60ab27205730900d60b7e8c720a0206d60c7e8cb2db6308a7730a000206d60d7e8cb27205730b000206d60e9a7209730cedededededed938cb27205730d0001730e93c27206730f938c72070172029272087310927ec1720606997ec1a7069d9c72097e7311067e73120695938c720a017202909c9c720b720c7e7203069c720e9a9c720d7e7204069c720c7e720306909c9c720d720c7e7203069c720e9a9c720b7e7204069c720c7e72030690b0ada5d9010f639593c2720f7313c1720f73147315d9010f599a8c720f018c720f0273167317",
    "T2T Swap V2",
  ],
  [
    "d805d6017300d602b2a4730100d6037302d6047303d6057304eb027201d195ed93b1a4730593b1db630872027306d80ad606db63087202d607b2a5730700d608b2db63087207730800d6098c720802d60a7e720906d60bb27206730900d60c7e8c720b0206d60d7e8cb2db6308a7730a000206d60e7e8cb27206730b000206d60f9a720a730cededededed938cb27206730d0001730e93c27207d07201938c7208017203927209730f927ec1720706997ec1a7069d9c720a7e7310067e73110695938c720b017203909c9c720c720d7e7204069c720f9a9c720e7e7205069c720d7e720406909c9c720e720d7e7204069c720f9a9c720c7e7205069c720d7e7204067312",
    "T2T Swap V0 (legacy)",
  ],
]);

export const ErgoDexAddresses: Map<string, string> = new Map([
  [
    "2JowFgqdee4yFVaXNsYuiAh1ge7HGxNSaDLiXQRKhtCYYRKgwMCeqMPi54qxpovt5TtjRVNNRabtZ7awzrcnqnmALG2Hjkwe2okjFn9odM7M3uhA9RQ2uBkkVsrY1P3FW8bUTx6qRjy4yHdtdS8YUzFCvmGZVHLteknL6RN9dueHbpLYRkyV2e5mYEzptufdxy81DwNpJphyJa9Y21ELHo75vk2t24kZS5Lgt5GDByQHRu3G4GTnPb4vMvew4wUFJh8xAwM1ffoEG946YZaWkSu48UUV4tw6Y5a4uDxZPEEiSDM36wookGfTixFeWVfM9YApPytQm8y1L1bsbcocQ9JTvBjixevx1BRagnvaJrwduuDbKYr3wwpo9PfK85xXprxrFgHBVwEof9gQs5TQFJ3ddKf1pftx6SJrHyNygX6CS4Vm3TG9dU32bs8inxSn4eVdwfRdhNiECZavPBBrzgfa9ismVpkwrcNbFZrAdNSFUpoKfiuFcsP6Be5tsE4ZsPD9sWEArhbGPqya88U8TftP9DqoD3xVPUmhMsB6pb6GfwQ1QxsenMhynSMBZ4fc6eyjdZWvzWeBKKs6AbVMX6EsSoptPvsbvpd664kBq99DsZ5Br6rQGjPDM1zPYsCpGUSW849qigHzHyNmYUCoVkDgfQA26TYKwFPLi7rxsJbSfAEhwQj5czRmfg11HafTYMcuSgryKP8ZzxTfTj5LxZFsXVjY9JWScT1tA5ZFjXZHxGENBporNPMbqWzusqMKvmyzTkZDwwyJV6nzcAFRDEjHd4MjzzsHbztt9XoYtWcYyKCYyMiAxsEqvc7VvuKXvTMEyzHnR1dSpqoP6bKpCwNKKZvrYX35GdxNdEKzQS6ccbNe98zvFQPrgQPa7BjYs1hgCWv6LLLWmqhhy9J6ca332st262t1BYjVLhYLEHSvLbsmM36hDtDjyoniTuW3zVmN51nV7bkZU1L1PQobFqp7uLvdieFt234Pz2RBgezeVTqkKqJLv7D2xKveVTUGJqsM8P7BghcLTyzEY9CZ3dXZRQVh2sXbhQEFqHdKpXL92eZTLZbg1AQYRpfL2p8AVVrbeWEuha3gmA5mv95zkmi5MPbDtxEekDaTLc9KXoWtSEPSy8zRMyhiws5",
    "Yield Farm",
  ],
  [
    "3gb1RZucekcRdda82TSNS4FZSREhGLoi1FxGDmMZdVeLtYYixPRviEdYireoM9RqC6Jf4kx85Y1jmUg5XzGgqdjpkhHm7kJZdgUR3VBwuLZuyHVqdSNv3eanqpknYsXtUwvUA16HFwNa3HgVRAnGC8zj8U7kksrfjycAM1yb19BB4TYR2BKWN7mpvoeoTuAKcAFH26cM46CEYsDRDn832wVNTLAmzz4Q6FqE29H9euwYzKiebgxQbWUxtupvfSbKaHpQcZAo5Dhyc6PFPyGVFZVRGZZ4Kftgi1NMRnGwKG7NTtXsFMsJP6A7yvLy8UZaMPe69BUAkpbSJdcWem3WpPUE7UpXv4itDkS5KVVaFtVyfx8PQxzi2eotP2uXtfairHuKinbpSFTSFKW3GxmXaw7vQs1JuVd8NhNShX6hxSqCP6sxojrqBxA48T2KcxNrmE3uFk7Pt4vPPdMAS4PW6UU82UD9rfhe3SMytK6DkjCocuRwuNqFoy4k25TXbGauTNgKuPKY3CxgkTpw9WfWsmtei178tLefhUEGJueueXSZo7negPYtmcYpoMhCuv4G1JZc283Q7f3mNXS",
    "T2T Swap",
  ],
  [
    "5vSUZRZbdVbnk4sJWjg2uhL94VZWRg4iatK9VgMChufzUgdihgvhR8yWSUEJKszzV7Vmi6K8hCyKTNhUaiP8p5ko6YEU9yfHpjVuXdQ4i5p4cRCzch6ZiqWrNukYjv7Vs5jvBwqg5hcEJ8u1eerr537YLWUoxxi1M4vQxuaCihzPKMt8NDXP4WcbN6mfNxxLZeGBvsHVvVmina5THaECosCWozKJFBnscjhpr3AJsdaL8evXAvPfEjGhVMoTKXAb2ZGGRmR8g1eZshaHmgTg2imSiaoXU5eiF3HvBnDuawaCtt674ikZ3oZdekqswcVPGMwqqUKVsGY4QuFeQoGwRkMqEYTdV2UDMMsfrjrBYQYKUBFMwsQGMNBL1VoY78aotXzdeqJCBVKbQdD3ZZWvukhSe4xrz8tcF3PoxpysDLt89boMqZJtGEHTV9UBTBEac6sDyQP693qT3nKaErN8TCXrJBUmHPqKozAg9bwxTqMYkpmb9iVKLSoJxG7MjAj72SRbcqQfNCVTztSwN3cRxSrVtz4p87jNFbVtFzhPg7UqDwNFTaasySCqM",
    "N2T Swap",
  ],
  ["9erSt7duDopSLqdcPoM4kGJwUpqvPeBJfTPxrFGwy58rCAEPZHg", "Treasury"],
  ["9faxhU566XMP5GABewc5Yka9RisPcYiR3qyou57sbZFojLrd5sX", "SPF Fee"],
  ["9fdmUutc4DhcqXAAyQeBTsw49PjEM4vuW9riQCHtXAoGEw3R11d", "Fee"],
]);
