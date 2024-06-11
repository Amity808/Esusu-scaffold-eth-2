// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view  returns (uint256);
    function balanceOf(address) external view  returns (uint256);
    function allowance(address, address) external view  returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Esusu {
   

    uint public number_of_deposits;
    uint256 public txHistoryLen;
    uint256 public savinsLen;
    // address of the child
    address payable public childAddress;
    uint256 public  currentTimeStap = block.timestamp;
    // to confirm the child is above or already 18 years with conversion of the block timestamp
    uint256 toGetPay = currentTimeStap + 18 * 365 * 24 * 60 * 60;

 



    
    struct ChildSavings {
        uint256 childAge;
        uint256 amount;
        address payable childAddress;
        address fatherAddress;
        uint256 canWithdraw;
    }

    struct TxHistory {
        uint256 savingsNonce;
        string purpose;
        uint256 amount;
        address payable owner;
        uint256 totalDeposit;
        uint256 time;

    }

    modifier onlYowner(address owner) {
        require(msg.sender == owner, "Only the owner");
        _;
    }

    mapping (address => ChildSavings) public _childSavings;
    // mapping (address => TxHistory) public _txHistory;
    mapping(uint256 => mapping(address => TxHistory)) public _txHistory;


    constructor() {
        
    //     childAddress = _child;
    //     // this function is confirm the age with the timestap
    //     childAge = currentTimeStap + (_childAge * 365 * 24 * 60 * 60);
    }


    function withdraw(address _child) external {
        require(msg.sender == _childSavings[msg.sender].childAddress, "cant withdraw fund because its not child address" );
        // require(!_childSavings[_child].childAddress, "cant withdraw fund because its not child address" );
        ChildSavings storage savings = _childSavings[msg.sender];
        require(savings.childAge >= savings.canWithdraw, "The Child must be avove 18 years of age before he or she can withdraw");
        uint256 amount = _childSavings[_child].amount;
        childAddress.transfer(amount);
    }

    function depositChildSavingsReg(uint256 _age, uint256 _amount, address _father) external payable  {
        ChildSavings storage savings = _childSavings[msg.sender];

        // uint256 currentTimeStap = block.timestamp;
        uint256 getPay = currentTimeStap + _age * 365 * 24 * 60 * 60;
        savings.childAge =_age;
        savings.amount = _amount;
        savings.childAddress = payable (msg.sender);
        savings.fatherAddress = _father;
        savings.canWithdraw = getPay;
    }

    enum SavingsStatus {
        INITIATESAVING,
        INPROGRESS,
        TARGETREACHED
    }

    struct Savings {
        address payable owner;
        uint256 savingsAmount;
        uint256 target;
        uint256 startDate;
        uint256 endDate;
        string purpose;
        bool isTime;
        bool forceWithdraw;
        bool inSaving;
        SavingsStatus savingStatus;
        uint256 nonce;
    }

    mapping  (uint256 => Savings) public  _savings;
    //1717926407

    function initialSaving(uint256 _target, string memory _purpose, uint256 _targetAmount) public {
        Savings storage save = _savings[savinsLen];
        uint256 target = (_target * 24 * 60 * 60);
        save.owner = payable (msg.sender);
        save.startDate = block.timestamp;
        save.endDate = block.timestamp + target;
        save.purpose = _purpose;
        save.isTime = false;
        save.forceWithdraw = false;
        save.inSaving = false;
        save.savingStatus = SavingsStatus.INITIATESAVING;
        save.nonce = savinsLen;
        save.target = _targetAmount;
        savinsLen++;

    }

    function depositSave(uint256 _depositAmount, uint256 _savinsLen) public {
        require(msg.sender == _savings[_savinsLen].owner, "You can't initial deposit" );
        Savings storage save = _savings[_savinsLen];
        TxHistory storage txHistory = _txHistory[txHistoryLen][save.owner];

        save.savingsAmount += _depositAmount;
        txHistory.amount += _depositAmount;
        save.savingStatus = SavingsStatus.INPROGRESS;
        txHistory.savingsNonce = _savinsLen;
        txHistory.owner = save.owner;
        txHistory.time = block.timestamp;
        txHistory.purpose = save.purpose;
        txHistoryLen++;


    }
    
    function targetReach(uint256 _savinsLen) public {
        require(msg.sender == _savings[_savinsLen].owner, "You dont have account initial withdraw" );
        Savings storage save = _savings[_savinsLen];
         require(save.target >= save.savingsAmount, "The target must reach before you can withdraw ");
        uint256 amount = save.target;
        (bool sent, ) = payable(save.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");
        save.savingStatus = SavingsStatus.TARGETREACHED;


    }
    
    function forceWithdraw() public {}
}