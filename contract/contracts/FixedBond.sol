// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FixedBond is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    address public token;

    event RewardsAdded(uint256 _value);

    event TokensWithdrawn(address indexed _from);

    event TokensDeposited(address indexed _from, uint256 _value);

    constructor(address _token) {
        token = _token;
    }

    struct BondInfo {
        bool isActive;
        uint256 interestOneMonth;
        uint256 interestThreeMonth;
        uint256 interestSixMonth;
        uint256 interestTwelveMonth;
        uint256 minimumDeposit;
    }

    struct UserInfo {
        uint256 amountDeposited;
        uint256 depositedOn;
        uint256 lockPeriod;
    }

    uint256 public rewardsBalance = 0;

    BondInfo public bondInfo;

    // user address => tierId => tokensBought
    mapping(address => UserInfo) public userInfo;

    function setupBond(
        bool _isActive,
        uint256 _interestOneMonth,
        uint256 _interestThreeMonth,
        uint256 _interestSixMonth,
        uint256 _interestTwelveMonth,
        uint256 _minimumDeposit
    ) external onlyOwner {
        bondInfo.isActive = _isActive;
        bondInfo.interestOneMonth = _interestOneMonth;
        bondInfo.interestThreeMonth = _interestThreeMonth;
        bondInfo.interestSixMonth = _interestSixMonth;
        bondInfo.interestTwelveMonth = _interestTwelveMonth;
        bondInfo.minimumDeposit = _minimumDeposit;
    }

    function depositRewards(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount has to be greater than zero");
        rewardsBalance = rewardsBalance.add(_amount);
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        emit RewardsAdded(_amount);
    }

    function deposit(uint256 _amount, uint256 _timeInMonths) public {
        require(bondInfo.isActive, "Bond is inactive");
        require(_timeInMonths >= 1, "Minimum time one month");
        require(_timeInMonths < 13, "Maximum time twelve months");
        require(_amount > 0, "Amount has to be greater than zero");
        require(
            userInfo[msg.sender].amountDeposited == 0,
            "Deposit already active"
        );
        userInfo[msg.sender].amountDeposited = _amount;
        userInfo[msg.sender].depositedOn = block.timestamp;
        userInfo[msg.sender].lockPeriod = _timeInMonths;
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        emit TokensDeposited(msg.sender, _amount);
    }

    function calculateRewards(address _address) public view returns (uint256) {
        if (userInfo[_address].amountDeposited == 0) return 0;
        uint256 daysPassed = (block.timestamp -
            userInfo[_address].depositedOn) / 1 days;
        if (daysPassed == 0) return 0;
        uint256 lockPeriod = userInfo[_address].lockPeriod;
        if (daysPassed > lockPeriod * 30) {
            daysPassed = lockPeriod * 30;
        }
        uint256 rewards = userInfo[_address]
            .amountDeposited
            .mul(daysPassed)
            .div(30);
        if (lockPeriod == 1) {
            rewards = rewards.mul(bondInfo.interestOneMonth).div(100);
        } else if (lockPeriod == 3) {
            rewards = rewards.mul(bondInfo.interestThreeMonth).div(3).div(100);
        } else if (lockPeriod == 6) {
            rewards = rewards.mul(bondInfo.interestSixMonth).div(6).div(100);
        } else if (lockPeriod == 12) {
            rewards = rewards.mul(bondInfo.interestTwelveMonth).div(12).div(
                100
            );
        }
        return rewards;
    }

    function emergencyWithdraw() public {
        require(userInfo[msg.sender].amountDeposited > 0, "No active deposit");
        IERC20(token).transferFrom(
            address(this),
            msg.sender,
            userInfo[msg.sender].amountDeposited
        );
        delete userInfo[msg.sender];
        emit TokensWithdrawn(msg.sender);
    }

    function withdraw() public {
        require(userInfo[msg.sender].amountDeposited > 0, "No active deposit");
        uint256 daysPassed = (block.timestamp -
            userInfo[msg.sender].depositedOn) / 1 days;
        require(
            daysPassed > userInfo[msg.sender].lockPeriod * 30,
            "Cant withdraw before maturity"
        );
        uint256 rewards = calculateRewards(msg.sender);
        require(rewardsBalance >= rewards, "Not enough rewards in contract");
        uint256 totalAmount = userInfo[msg.sender].amountDeposited.add(rewards);
        IERC20(token).transfer(msg.sender, totalAmount);
        rewardsBalance = rewardsBalance.sub(rewards);
        delete userInfo[msg.sender];
        emit TokensWithdrawn(msg.sender);
    }
}
