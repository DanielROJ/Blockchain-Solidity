pragma solidity ^0.5.1;


contract Trace{
    
    struct Tru{
        bool consumed;
        bool used;
        bool created;
        uint id;
        uint producedBy;
        uint consumedBy;
    }
    
    struct PrimitiveActivity{
        bool created;
        string name;
        uint id;
        uint inputTruId;
        uint outputTruId;
    }
    
    mapping(uint => Tru) truLookup;
    mapping(uint => PrimitiveActivity) activityLookup;
    
    uint msgOrder;
    
    constructor () public{
        msgOrder = 0;
    }
    
    //... remaining listings 2-8
    
    
    //listing 2
    modifier nonZero(uint num) {
        if(num == 0){
            revert('Error el numero es zero');
        }
        _;
    }
    
    modifier truDoesNotExist(uint id){
        if(truLookup[id].created){
            revert('El tru ya existe');
        }
        _;
    }
    
    modifier truExists(uint id){
        if(truLookup[id].created != true){
            revert('El tru no existe');
        }
        _;
    }
    
    modifier primitiveActivityDoesNotExist(uint id){
        if(activityLookup[id].created){
            revert();
        }
        _;
    }
    
    modifier primitiveActivityExists(uint id){
        if(activityLookup[id].created != true){
            revert();
        }
        _;
    }
    
    modifier truAvailable(uint id){
        if(truLookup[id].consumed || truLookup[id].used){
            revert();
        }
        _;
    }
    
    //listing 3
    event TraceExists(uint msgOrder, uint from_tru, uint to_tru);
    event TraceDoesNotExist(uint msgOrder, uint from_tru, uint to_tru);
    event ActivityCreated(uint msgOrder, uint activityId, string description, uint consumedTruId, uint producedTruId);
    event TruCreated(uint msgOrder, uint truId);
    event TruConsumed(uint msgOrder, uint truId, uint activityId, string activityName);
    event TruProducedBy(uint msgOrder, uint currTru, uint currActivity, string activityName);
    event ActivityConsumes(uint msgOrder, uint currActivity, string activityName, uint currTru);
    
    //listing 4
    function newTru(uint id) private
    truDoesNotExist(id)
    nonZero(id)
    {
        truLookup[id].created = true;
        truLookup[id].id = id;
        truLookup[id].consumed = false;
        truLookup[id].used = false;
        truLookup[id].producedBy = 0;
        truLookup[id].consumedBy = 0;
        emit TruCreated(msgOrder++, id);
    }
    
    //listing 5
    function newTru(uint id, uint activityId) private
    truDoesNotExist(id)
    nonZero(id)
    primitiveActivityExists(activityId)
    {
        newTru(id);
        truLookup[id].producedBy = activityId;
    }
    
    //listing 6
    function consumeTru(uint truId, uint activityId) private
    truExists(truId)
    truAvailable(truId)
    primitiveActivityExists(activityId)
    {
        truLookup[truId].consumed = true;
        truLookup[truId].consumedBy = activityId;
        emit TruConsumed(msgOrder++, truId, activityId, activityLookup[activityId].name);
        
    }
    
    //listing 7
    function newPrimitiveActivity(string memory name, uint id, uint inputTruId, uint outputTruId)
    truAvailable(inputTruId)
    truDoesNotExist(outputTruId)
    primitiveActivityDoesNotExist(id)
    nonZero(id)
    public {
        activityLookup[id].name = name;
        activityLookup[id].id = id;
        activityLookup[id].created = true;
        
        if(truLookup[inputTruId].created != true){
            newTru(inputTruId);
        }
        emit ActivityCreated(msgOrder++, id, name, inputTruId, outputTruId);
        consumeTru(inputTruId, id);
        activityLookup[id].inputTruId = inputTruId;
        newTru(outputTruId, id);
        activityLookup[id].outputTruId = outputTruId;
    }
    
    //listing 8
    function primitiveTrace(uint tru_begin, uint tru_end)
    truExists(tru_begin)
    truExists(tru_end)
    public  {
        uint currTru = tru_begin;
        while(currTru != tru_end && truLookup[currTru].producedBy != 0){
            uint currActivity = truLookup[currTru].producedBy;
            string memory activityName = activityLookup[currActivity].name;
            emit TruProducedBy(msgOrder++, currTru, currActivity, activityName);
            currTru = activityLookup[currActivity].inputTruId;
            activityName = activityLookup[currActivity].name;
            emit ActivityConsumes(msgOrder++, currActivity, activityName, currTru);
        }
        if(currTru == tru_end){
           emit TraceExists(msgOrder++, tru_begin, tru_end);
        }
        else
        {
           emit   TraceDoesNotExist(msgOrder++,tru_begin, tru_end);
        }
    }
    
    
    
}
