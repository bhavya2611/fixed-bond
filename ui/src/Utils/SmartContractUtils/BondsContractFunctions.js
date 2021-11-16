import { bondsContractABI, erc20TokenAbi } from './BondsContractConfig';

export const updateBond = async (
  web3Instance,
  globalVariables,
  bondCreateObj
) => {
  try {
    const { isActive, minimumDeposit } = bondCreateObj;
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const response = await BondsContract.methods
      .updateBond(
        isActive,
        web3Instance.utils.toWei(web3Instance.utils.toBN(minimumDeposit))
      )
      .send({
        from: window.ethereum.selectedAddress,
      });
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setupBond = async (
  web3Instance,
  globalVariables,
  bondCreateObj
) => {
  try {
    const {
      isActive,
      minimumDeposit,
      interestOneMonth,
      interestSixMonth,
      interestThreeMonth,
      interestTwelveMonth,
    } = bondCreateObj;
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const response = await BondsContract.methods
      .setupBond(
        isActive,
        interestOneMonth,
        interestSixMonth,
        interestThreeMonth,
        interestTwelveMonth,
        web3Instance.utils.toWei(web3Instance.utils.toBN(minimumDeposit))
      )
      .send({
        from: window.ethereum.selectedAddress,
      });
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getBondInfo = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const bondInfo = await BondsContract.methods.bondInfo().call();
    return bondInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPendingRewards = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const pendingRewards = await BondsContract.methods
      .calculateRewards(window.ethereum.selectedAddress)
      .call();
    return pendingRewards;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getRewardsBalance = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const rewardsBalance = await BondsContract.methods.rewardsBalance().call();
    return rewardsBalance;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const depositToken = async (
  web3Instance,
  globalVariables,
  amount,
  timeInMonths
) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const amountToDeposit = web3Instance.utils.toWei(
      web3Instance.utils.toBN(amount)
    );

    const tokenAddress = globalVariables.TOKEN_ADDRESS;
    const TokenContract = new web3Instance.eth.Contract(
      erc20TokenAbi,
      tokenAddress
    );

    const currentAllowance = await TokenContract.methods
      .allowance(
        window.ethereum.selectedAddress,
        globalVariables.BONDS_CONTRACT_ADDRESS
      )
      .call();
    let approveResponse = {};

    if (currentAllowance < Number(amountToDeposit.toString())) {
      const approvalAmount = amount * 1000;
      approveResponse = await approveSpend(
        web3Instance,
        web3Instance.utils.toWei(web3Instance.utils.toBN(approvalAmount)),
        globalVariables
      );
    } else {
      approveResponse.status = true;
    }

    const depositResponse = await BondsContract.methods
      .deposit(amountToDeposit, Number(timeInMonths))
      .send({
        from: window.ethereum.selectedAddress,
      });
    return depositResponse;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const withdraw = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const withdrawResponse = await BondsContract.methods.withdraw().send({
      from: window.ethereum.selectedAddress,
    });
    return withdrawResponse;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const emergencyWithdraw = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );
    const emergencyWithdrawResponse = await BondsContract.methods
      .emergencyWithdraw()
      .send({
        from: window.ethereum.selectedAddress,
      });
    return emergencyWithdrawResponse;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const addRewards = async (web3Instance, globalVariables, amount) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const BondsContract = new web3Instance.eth.Contract(
      bondsContractABI,
      bondsContractAddress
    );

    const tokenAddress = globalVariables.TOKEN_ADDRESS;
    const TokenContract = new web3Instance.eth.Contract(
      erc20TokenAbi,
      tokenAddress
    );

    const amountToDeposit = web3Instance.utils.toWei(
      web3Instance.utils.toBN(amount)
    );

    const currentAllowance = await TokenContract.methods
      .allowance(
        window.ethereum.selectedAddress,
        globalVariables.BONDS_CONTRACT_ADDRESS
      )
      .call();
    let approveResponse = {};

    if (currentAllowance < Number(amountToDeposit.toString())) {
      const approvalAmount = amount * 1000;
      approveResponse = await approveSpend(
        web3Instance,
        web3Instance.utils.toWei(web3Instance.utils.toBN(approvalAmount)),
        globalVariables
      );
    } else {
      approveResponse.status = true;
    }

    if (approveResponse.status) {
      const addRewardsResponse = await BondsContract.methods
        .depositRewards(amountToDeposit)
        .send({
          from: window.ethereum.selectedAddress,
        });
      return addRewardsResponse;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getUserInfo = async (web3Instance, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    if (bondsContractAddress) {
      const BondsContract = new web3Instance.eth.Contract(
        bondsContractABI,
        bondsContractAddress
      );
      const userInfoResponse = await BondsContract.methods
        .userInfo(window.ethereum.selectedAddress)
        .call();
      return userInfoResponse;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const approveSpend = async (web3Instance, amount, globalVariables) => {
  try {
    const bondsContractAddress = globalVariables.BONDS_CONTRACT_ADDRESS;
    const tokenAddress = globalVariables.TOKEN_ADDRESS;
    const TokenContract = new web3Instance.eth.Contract(
      erc20TokenAbi,
      tokenAddress
    );
    const approveSpend = await TokenContract.methods
      .approve(bondsContractAddress, amount)
      .send({
        from: window.ethereum.selectedAddress,
      });
    return approveSpend;
  } catch (e) {
    console.log(e);
    return false;
  }
};
