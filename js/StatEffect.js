function StatEffect(ownerTemp,nameTemp,ligthTemp,forceTemp,constTemp,tailleTemp,dexTemp,lifeTemp,launchTemp,lrmTemp,turnLengthTemp,permanentLifeTemp,burnTemp)
{
	this.owner=ownerTemp;
	this.name=nameTemp;
	this.light=ligthTemp;
	this.force=forceTemp;
	this.constitution=constTemp;
	this.taille=tailleTemp;
	this.dexterite=dexTemp;
	this.life=lifeTemp;
	this.launch=launchTemp;
	this.lrm=lrmTemp;
	this.endTurn=-1;
	this.turnLength=turnLengthTemp;
	this.burn=burnTemp;
	if(permanentLifeTemp != undefined)
		this.permanentLife=permanentLifeTemp;
	else
		this.permanentLife=0;
		
	
	if(this.owner != undefined)
		this.apply();
}


/**
 * Returns the statEffect's name
 */
StatEffect.prototype.getName=function()
{
	return this.name;
}

/**
 * Sets the effect owner
 */
StatEffect.prototype.changeOwner=function(ownerTemp)
{
	this.owner=ownerTemp;
}

/**
 * Add the effect's stats changes to the owner's stats
 */
StatEffect.prototype.apply=function()
{
		owner=this.owner;
		owner.light+=this.light;
		owner.force+=this.force;
		owner.life+=this.life;
		owner.taille+=this.taille;
		
		value=owner.getLrm();
		value=value+this.lrm;
		owner.setLrm(value);

		value=owner.getLaunch();
		value=value+this.launch;
		owner.setLaunch(value);
		
		value=owner.getConst();
		value=value+this.constitution;
		owner.setConst(value);
		
		value=owner.getDex();
		value=value+this.dexterite;
		owner.setDex(value);
		
		value=owner.life;
		value=value+this.permanentLife;
		owner.setLife(value);
		
		this.endTurn=Client.turn+this.turnLength;
		
		if(this.burn)
			owner.setFire();
}

/**
 * Checks if the counter is down or not
 */
StatEffect.prototype.update=function()
{

	if(Client.turn>=this.endTurn)
	{
		this.end();
		return null;
	}
	else
		return this;
}

/**
 * Removes the effect's stats changes of the owner's stats
 */
StatEffect.prototype.end=function()
{
		owner=this.owner;
		owner.light-=this.light;
		owner.force-=this.force;
		owner.life-=this.life;
		owner.taille-=this.taille;
		
		value=owner.getLrm();
		value=value-this.lrm;
		owner.setLrm(value);

		value=owner.getLaunch();
		value=value-this.launch;
		owner.setLaunch(value);
		
		value=owner.getConst();
		value=value-this.constitution;
		owner.setConst(value);
		
		value=owner.getDex();
		value=value-this.dexterite;
		owner.setDex(value);	
		
		if(this.name != "sick" && this.name !="grouped" && this.name !="leader")
			owner.sendMessage("Les effets de "+this.name+" s'estompent...");
}
