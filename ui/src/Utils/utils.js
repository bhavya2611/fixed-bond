export const networkCheckFn = async (web3Instance, networkId) => {
  if (networkId) {
    const response = web3Instance.eth.net.getId().then((id) => {
      if (Number(id) === Number(networkId)) {
        return true;
      } else {
        return false;
      }
    });
    return await response;
  } else {
    return true;
  }
};

export function toFixed(x) {
  var e = 0;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}

export const getVariables = () => {
  return {
    NETWORK: Number(window._env_.ETH_NETWORK),
    BONDS_CONTRACT_ADDRESS: window._env_.ETH_BONDS_CONTRACT_ADDRESS,
    OWNER_ADDRESS: window._env_.ETH_OWNER_ADDRESS,
    TOKEN_ADDRESS: window._env_.ETH_TOKEN_ADDRESS,
  };
};
