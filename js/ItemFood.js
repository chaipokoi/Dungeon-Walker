function ItemFood(nameTemp,poundTemp,valueTemp,cookResultTemp,descTemp,priceTemp)
{
	Item.call(this, nameTemp,poundTemp,descTemp,priceTemp,"food");
	this.value=valueTemp;
	this.cookResult=cookResultTemp;	
}

/**
 * Legacy
 */
ItemFood.prototype=new Item();

/**
 * Allow to eat the item
 */
ItemFood.prototype.use=function(owner)
{
	faim=owner.getHungry();
	faim=faim+this.value;
	owner.setHungry(faim);
	owner.sendMessage("Vous manger attivement le "+this.name+".");
	return undefined;
}

/**
 * Allow to cook the item.
 */
ItemFood.prototype.cook=function(owner)
{
		owner.sendMessage("Quelques minutes plus tard vous retirez un delicieux morceau de "+this.cookResult.getName()+" des flammes.");
		return this.cookResult;
}


