export const ENVIRONMENT_2 = {
  production: false,
  environmentName: "Oasis Emerald Testnet",
  identifier: "Oasis",
  jsonRpcUrl: "https://testnet.emerald.oasis.dev",
  webSocketUrl: "wss://testnet.emerald.oasis.dev/ws",
  config: {
    contracts: {
      ChainlinkPriceConsumer: "",
      CheddaMarketExplorer: "",
      CheddaBaseTokenVault: "0xB0A47be6707E3122F1CF4C2259897E6e97380E1A",
      PriceFeed: "0xEDFa988f9498165fE79f09dA9e39f9dC829507D7",
      Chedda: "0x89658069fc4b3e528F651405c9d71583eB9D2344",
      xChedda: "0x434fDe54E416d7c56c644E9b2AbCAff943D5163A",
      veChedda: "0xc0B3a48DBe196ECfb14A65a2FA6aD5DaD07C866f",
      USDC: "0x8457106E861a67B989a2ea398DF3A045331E5115",
      mUSDC: "0xe88AF62fe2117565cB6B2c206e820Cb8d4Bce91a",
      DAI: "0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE",
      FRAX: "0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918",
      UXD: "",
      WrappedNative: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
      Faucet: "0x5b3AaF77dd6E086241a101A47E8cDA34A1059ee6",
      GaugeController: "0xb1bE9510691DfAa3D73C3A6C17E494EEC9899E4F",
      NFT: "",
    },
    pools: [
      {
        name: "USDC/ROSE Pool",
        address: "0xe88AF62fe2117565cB6B2c206e820Cb8d4Bce91a",
        asset: {
          name: "USD Coin",
          symbol: "USCD.c",
          address: "0x8457106E861a67B989a2ea398DF3A045331E5115",
          logo: "/assets/logos/usdc-logo.png",
        },
        collateral: [
          {
            name: "Wrapped ROSE",
            symbol: "WROSE.c",
            address: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
            logo: "/assets/logos/wrose-logo.png",
          },
        ],
        stats: {},
      },
      {
        name: "DAI/ROSE Pool",
        address: "0x67CcB23977336be1eA1E65B8e85Dda525ebC8EaA",
        asset: {
          name: "Dai StableCoin",
          symbol: "DAI.c",
          address: "0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE",
          logo: "/assets/logos/dai-logo.png",
        },
        collateral: [
          {
            name: "Wrapped ROSE",
            symbol: "WROSE.c",
            address: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
            logo: "/assets/logos/wrose-logo.png",
          },
        ],
        stats: {},
      },
      {
        name: "FRAX/ROSE Pool",
        address: "0xB8af6CD1B8cb85c871B92108A120f2E9BE48E826",
        asset: {
          name: "Frax",
          symbol: "FRAX",
          address: "0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918",
          logo: "/assets/logos/frax-logo.png",
        },
        collateral: [
          {
            name: "Wrapped ROSE",
            symbol: "WROSE.c",
            address: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
            logo: "/assets/logos/wrose-logo.png",
          },
        ],
        stats: {},
      },
      {
        name: "ROSE/Stable Pool",
        address: "0xCD89dE2ED157ddaC4a67E233e0cAdB03Bb3106f6",
        asset: {
          name: "Wrapped ROSE",
          symbol: "WROSE.c",
          address: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
          logo: "/assets/logos/wrose-logo.png",
        },
        collateral: [
          {
            name: "USD Coin",
            symbol: "USCD.c",
            address: "0x8457106E861a67B989a2ea398DF3A045331E5115",
            logo: "/assets/logos/usdc-logo.png",
          },
          {
            name: "UXD Coin",
            symbol: "UXD",
            address: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3",
            logo: "/assets/logos/uxd-logo.png",
          },
          {
            name: "Dai StableCoin",
            symbol: "DAI.c",
            address: "0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE",
            logo: "/assets/logos/dai-logo.png",
          },
          {
            name: "Frax",
            symbol: "FRAX",
            address: "0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918",
            logo: "/assets/logos/frax-logo.png",
          },
        ],
        stats: {},
      },
      {
        name: "ROSE/Degen Pool",
        address: "0xD992662A5E886336Ba42A1925AB584a30e4BeB7C",
        asset: {
          name: "Wrapped ROSE",
          symbol: "WROSE.c",
          address: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
          logo: "/assets/logos/wrose-logo.png",
        },
        collateral: [
          {
            name: "Chedda",
            symbol: "CHEDDA",
            address: "0x89658069fc4b3e528F651405c9d71583eB9D2344",
            logo: "/assets/logos/chedda-3d-logo.png",
          },
          {
            name: "Valley Swap",
            symbol: "VS",
            address: "0xB0A47be6707E3122F1CF4C2259897E6e97380E1A",
            logo: "/assets/logos/swap-logo.png",
          },
          {
            name: "YUZUSwap",
            symbol: "YUZU",
            address: "0xA2cfE619cDd3bc1F051890Cea945CC145a45770B",
            logo: "/assets/logos/yuzu-logo.png",
          },
          {
            name: "Fountain Protocol",
            symbol: "FTP",
            address: "0x4c12c9C5E754360fb8e8Ed986300C60d588C9e72",
            logo: "/assets/logos/fountain-logo.png",
          },
        ],
        stats: {},
      },
    ],
    faucets: [
      {
        name: "Rose Testnet Faucet",
        logo: "",
        url: "",
      },
    ],
    ui: {
      chainName: "Oasis",
      logo: "/assets/logos/wrose-logo.png",
      txUrlPrefix: "https://testnet.explorer.emerald.oasis.dev/tx/",
    },
  },
};

export const ENVIRONMENT = {
  production: false,
  environmentName: "Polygon Mumbai Testnet",
  identifier: "Polygon",
  jsonRpcUrl:
    "https://polygon-mumbai.infura.io/v3/d674ad7889a4404c960e18610cf74a3a",
  webSocketUrl:
    "wss://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs",
  config: {
    contracts: {
      CheddaBaseTokenVault: "0x801CA2D77CC8e550883E1e649f8f4D6b94D090b5",
      ChainlinkPriceConsumer: "",
      CheddaMarketExplorer: "",
      PriceFeed: "0x0d47B32366012F06D125C2cC2cC98396D81d3786",
      Chedda: "0x36c52Ded7fdC1cAc86C6997Cc1371997A7560dF6",
      xChedda: "0xBca02EaD15f58c66B4bA772BaFdC5b0Fc124309D",
      veChedda: "0xa8b8b2E444f843AEa0C0e25B72c2c1479190Bb36",
      USDC: "0xA485898266c91BcBBeF40F5d838423a751bb906d",
      DAI: "0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94",
      FRAX: "0x58913d4AB4bF61B97086708d55d167c4004CdcEb",
      UXD: "0x4F40FFC513FcCf60A354020Dbc1aE857f84797F2",
      NFT: "0xc863a31cFB3F02c486e63971cb7D9Fb5aB302C86",
      mUSDC: "",
      WrappedNative: "0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21",
      Faucet: "0xD83401901b49270b5f669922Df210a349a531E58",
      GaugeController: "0x7Eb31481723D355d8026A24332CD410A14cCe700",
    },
    networkParams: {
      chainId: "0x13881",
      chainName: "Polygon Mumbai Testnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
        image: "",
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
    pools: [
      {
        name: "USDC/WMATIC Pool",
        address: "0x16f2D05961cC81555b1f1320fF6289BAd5796616",
        asset: {
          name: "USD Coin",
          symbol: "USCD.c",
          address: "0xA485898266c91BcBBeF40F5d838423a751bb906d",
          logo: "/assets/logos/usdc-logo.png",
        },
        collateral: [
          {
            name: "Wrapped MATIC",
            symbol: "WMATIC.c",
            address: "0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313",
            logo: "/assets/logos/matic-logo.png",
          },
        ],
      },
      {
        name: "DAI/WMATIC Pool",
        address: "0xB61cAe70a7f31e8A9EE61e15B472019bE2dC7A81",
        asset: {
          name: "Dai Stalbcoin",
          symbol: "DAI",
          address: "0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94",
          logo: "/assets/logos/dai-logo.png",
        },
        collateral: [
          {
            name: "Wrapped MATIC",
            symbol: "WMATIC.c",
            address: "0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313",
            logo: "/assets/logos/matic-logo.png",
          },
        ],
      },
      {
        name: "UXD/WMATIC Pool",
        address: "0xDd58aD73b067fd6151802cEF41F823ecA7C7d111",
        asset: {
          name: "UXD",
          symbol: "UXD",
          address: "0x4F40FFC513FcCf60A354020Dbc1aE857f84797F2",
          logo: "/assets/logos/uxd-logo.png",
        },
        collateral: [
          {
            name: "Wrapped MATIC",
            symbol: "WMATIC.c",
            address: "0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313",
            logo: "/assets/logos/matic-logo.png",
          },
        ],
      },
      {
        name: "Native Asset Pool",
        address: "0x0FE9d9C463d377e8741F02FCaD6DaCd1D6A67B41",
        asset: {
          name: "Wrapped MATIC",
          symbol: "WMATIC.c",
          address: "0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313",
          logo: "/assets/logos/matic-logo.png",
        },
        collateral: [
          {
            name: "USD Coin",
            symbol: "USCD.c",
            address: "0xA485898266c91BcBBeF40F5d838423a751bb906d",
            logo: "/assets/logos/usdc-logo.png",
          },
          {
            name: "Dai Stalbcoin",
            symbol: "DAI",
            address: "0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94",
            logo: "/assets/logos/dai-logo.png",
          },
          {
            name: "Frax",
            symbol: "FRAX",
            address: "0x58913d4AB4bF61B97086708d55d167c4004CdcEb",
            logo: "/assets/logos/frax-logo.png",
          },
        ],
      },
      {
        name: "USDC/WMATIC/WGK Pool",
        address: "0x704F620FA72299F4e3B7c9f848BDD136a9Ac8209",
        asset: {
          name: "USD Coin",
          symbol: "USCD.c",
          address: "0xA485898266c91BcBBeF40F5d838423a751bb906d",
          logo: "/assets/logos/usdc-logo.png",
        },
        collateral: [
          {
            name: "Quickswap",
            symbol: "QUICK",
            address: "0x997904432Be92B8f37b986a16E90aB31e4D54891",
            logo: "/assets/logos/quickswap-logo.png",
          },
          {
            name: "GALA Games",
            symbol: "GALA",
            address: "0x76DA732A6fAF51ffd7877aA645BDD456Da686144",
            logo: "/assets/logos/gala-logo.png",
          },
          {
            name: "MM Finance",
            symbol: "MMF",
            address: "0x28518998DB48BEC4a1d6dFe2Dc2a288ad28CC862",
            logo: "/assets/logos/mmfinance-logo.png",
          },
          {
            name: "Weird geek",
            symbol: "WGK",
            address: "0xc863a31cFB3F02c486e63971cb7D9Fb5aB302C86",
            logo: "/assets/logos/wgk-logo.png",
            isNFT: true,
          },
        ],
        stats: {},
      },
    ],
    faucets: [
      {
        name: "Polygon Mumbai Faucet",
        logo: "",
        url: "https://faucet.polygon.technology/",
      },
    ],
    ui: {
      chainName: "Polygon",
      logo: "/assets/logos/matic-logo.png",
      txUrlPrefix: "https://mumbai.polygonscan.com/tx/",
    },
  },
};
