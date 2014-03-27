var LOCAL_USER = 'user';
var INIT_STATUS = 'init_status';

var kumulosRef = null;

// Get a reference to the Kumulos API
// var k = getKumulos();	
// k.call('createUser', {age: age, weight: weight, height: height, gender: gender, pointSystem: point_system, activityLevel: activity_level}, onCreateUser);	

// Do a 1 time initialization of the Kumulos backend.  Then return a reference to the Kumulos API
function getKumulos()
{
	if (kumulosRef == null) kumulosRef = Kumulos.initWithAPIKeyAndSecretKey('c2hjg6y35s37nzhpm02fw0svh2sy929g', 't76ck9k8'); 
	return kumulosRef;
}


function UnitsObject(unit_system, calculator_precision)
{
	this.unitSystem = unit_system;
	this.calcPrecision = calculator_precision;
}


function WeightGoalObject(weight_goal, goal_date)
{
	this.weightGoal = weight_goal;
	this.goalDate = goal_date;
}


function DailyPointsAllowanceObject(pointSystem, useFixed, fixedPoints, dob, weight, height, gender, activityLevel)
{
	this.pointSystem = parseInt(pointSystem);
	this.fixedPointsEnabled = useFixed;
	this.FixedPointsCount = fixedPoints;
	this.dob = dob;
	this.weight = parseInt(weight);
	this.height = parseInt(height);
	this.gender = parseInt(gender);
	this.activityLevel = parseInt(activityLevel);
		
	//this.userID = userID;
	//this.timeCreated = timeCreated;
	//this.timeUpdated = timeUpdated;
}

function WeelyPointsSettingsObject(enabled, allowance, rollover_day)
{
	this.enabled = enabled;

	this.allowance = null;
	if (allowance !== undefined) this.allowance = allowance;

	this.rolloverDay = null;
	if (rollover_day !== undefined) this.rolloverDay = rollover_day;
	
}

function ActivityObject(frequency, precision, calculate_by)
{
	this.accFreq = frequency;
	this.precision = precision;
	this.calculateBy = calculate_by;
}

function UserObject(unitsObj, weightGoalObj, dpaObject, wpaObj, activityObj)
{
	this.units = unitsObj;
	this.weightGoal = weightGoalObj;
	this.DPA = dpaObject;
	this.WPA = wpaObj;
	this.activity = activityObj;
}

function SaveUser(userObj)
{
	// Put the object into local storage
	localStorage[LOCAL_USER] = JSON.stringify(userObj);
}

function GetLocalUser()
{
	if (localStorage[LOCAL_USER] != null) return JSON.parse(localStorage[LOCAL_USER]);
	else return false;
}

function appInitialized()
{
	if (localStorage[INIT_STATUS] != null) return JSON.parse(localStorage[INIT_STATUS]);
	else return false;
}

function setInitFlag(flag)
{
	localStorage[INIT_STATUS] = JSON.stringify(flag);
}

	